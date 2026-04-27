#!/usr/bin/env node

/**
 * Simple Load Testing Script for Lekki Stays
 * Tests system performance under load
 */

const axios = require('axios');
const { performance } = require('perf_hooks');

const BASE_URL = 'http://localhost:3000';

/**
 * Generate random test data
 */
function generateTestBooking(id) {
  const checkInDate = new Date();
  checkInDate.setDate(checkInDate.getDate() + Math.floor(Math.random() * 30) + 1);
  
  const checkOutDate = new Date(checkInDate);
  checkOutDate.setDate(checkOutDate.getDate() + Math.floor(Math.random() * 7) + 1);
  
  return {
    apartmentId: Math.floor(Math.random() * 8) + 1,
    guestName: `Load Test Guest ${id}`,
    guestPhone: `+234801234${String(id).padStart(4, '0')}`,
    guestEmail: `loadtest${id}@example.com`,
    checkIn: checkInDate.toISOString().split('T')[0],
    checkOut: checkOutDate.toISOString().split('T')[0],
    numGuests: Math.floor(Math.random() * 4) + 1,
    totalPrice: (Math.floor(Math.random() * 200) + 50) * 1000
  };
}

/**
 * Run load test
 */
async function runLoadTest(options = {}) {
  const {
    duration = 30, // seconds
    requestsPerSecond = 5,
    endpoint = '/api/apartments'
  } = options;
  
  console.log(`🚀 Starting load test:`);
  console.log(`   Duration: ${duration} seconds`);
  console.log(`   Target RPS: ${requestsPerSecond}`);
  console.log(`   Endpoint: ${endpoint}`);
  console.log('');
  
  const results = {
    totalRequests: 0,
    successfulRequests: 0,
    failedRequests: 0,
    responseTimes: [],
    errors: []
  };
  
  const startTime = performance.now();
  const endTime = startTime + (duration * 1000);
  const interval = 1000 / requestsPerSecond;
  
  let requestId = 1;
  
  // Function to make a single request
  const makeRequest = async () => {
    const reqStartTime = performance.now();
    
    try {
      let response;
      
      if (endpoint === '/api/bookings') {
        const bookingData = generateTestBooking(requestId);
        response = await axios.post(`${BASE_URL}${endpoint}`, bookingData, { timeout: 5000 });
      } else {
        response = await axios.get(`${BASE_URL}${endpoint}`, { timeout: 5000 });
      }
      
      const reqEndTime = performance.now();
      const responseTime = reqEndTime - reqStartTime;
      
      results.totalRequests++;
      results.successfulRequests++;
      results.responseTimes.push(responseTime);
      
      process.stdout.write('.');
      
    } catch (error) {
      const reqEndTime = performance.now();
      const responseTime = reqEndTime - reqStartTime;
      
      results.totalRequests++;
      results.failedRequests++;
      results.responseTimes.push(responseTime);
      results.errors.push({
        message: error.message,
        status: error.response?.status,
        responseTime
      });
      
      process.stdout.write('x');
    }
    
    requestId++;
  };
  
  // Schedule requests
  const scheduleRequest = () => {
    if (performance.now() < endTime) {
      makeRequest();
      setTimeout(scheduleRequest, interval);
    }
  };
  
  // Start the load test
  scheduleRequest();
  
  // Wait for test duration
  await new Promise(resolve => setTimeout(resolve, duration * 1000));
  
  // Wait a bit more for pending requests
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  console.log('\n');
  
  // Calculate statistics
  const avgResponseTime = results.responseTimes.length > 0 
    ? results.responseTimes.reduce((a, b) => a + b, 0) / results.responseTimes.length 
    : 0;
  
  const minResponseTime = results.responseTimes.length > 0 
    ? Math.min(...results.responseTimes) 
    : 0;
  
  const maxResponseTime = results.responseTimes.length > 0 
    ? Math.max(...results.responseTimes) 
    : 0;
  
  const actualRPS = results.totalRequests / duration;
  const successRate = (results.successfulRequests / results.totalRequests) * 100;
  
  // Print results
  console.log('📊 Load Test Results:');
  console.log('====================');
  console.log(`Total Requests: ${results.totalRequests}`);
  console.log(`Successful: ${results.successfulRequests}`);
  console.log(`Failed: ${results.failedRequests}`);
  console.log(`Success Rate: ${successRate.toFixed(2)}%`);
  console.log(`Actual RPS: ${actualRPS.toFixed(2)}`);
  console.log(`Avg Response Time: ${avgResponseTime.toFixed(2)}ms`);
  console.log(`Min Response Time: ${minResponseTime.toFixed(2)}ms`);
  console.log(`Max Response Time: ${maxResponseTime.toFixed(2)}ms`);
  
  if (results.errors.length > 0) {
    console.log('\n❌ Error Summary:');
    const errorCounts = {};
    results.errors.forEach(error => {
      const key = error.status || 'Network Error';
      errorCounts[key] = (errorCounts[key] || 0) + 1;
    });
    
    Object.entries(errorCounts).forEach(([error, count]) => {
      console.log(`   ${error}: ${count} occurrences`);
    });
  }
  
  return results;
}

/**
 * Run multiple load test scenarios
 */
async function runLoadTestSuite() {
  console.log('🏨 Lekki Stays Load Testing Suite');
  console.log('=================================\n');
  
  try {
    // Check server health
    await axios.get(`${BASE_URL}/api/health`);
    console.log('✅ Server is running\n');
    
    // Test scenarios
    const scenarios = [
      {
        name: 'Light Load - Get Apartments',
        options: { duration: 15, requestsPerSecond: 2, endpoint: '/api/apartments' }
      },
      {
        name: 'Medium Load - Get Apartments',
        options: { duration: 20, requestsPerSecond: 5, endpoint: '/api/apartments' }
      },
      {
        name: 'Heavy Load - Get Apartments',
        options: { duration: 15, requestsPerSecond: 10, endpoint: '/api/apartments' }
      },
      {
        name: 'Booking Load Test',
        options: { duration: 20, requestsPerSecond: 3, endpoint: '/api/bookings' }
      }
    ];
    
    for (const scenario of scenarios) {
      console.log(`\n🎯 Running: ${scenario.name}`);
      console.log('-'.repeat(50));
      
      await runLoadTest(scenario.options);
      
      // Wait between tests
      console.log('\n⏳ Waiting 5 seconds before next test...\n');
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
    
    console.log('\n🎉 Load testing completed!');
    
    // Get final performance metrics
    try {
      const metricsResponse = await axios.get(`${BASE_URL}/api/metrics`);
      console.log('\n📈 Final Server Metrics:');
      console.log(`Total Requests Processed: ${metricsResponse.data.metrics.totalRequests}`);
      console.log(`Average Response Time: ${metricsResponse.data.metrics.averageResponseTime.toFixed(2)}ms`);
      console.log(`Slow Requests: ${metricsResponse.data.metrics.slowRequestsCount}`);
      console.log(`Error Requests: ${metricsResponse.data.metrics.errorRequestsCount}`);
    } catch (error) {
      console.log('Could not fetch server metrics');
    }
    
  } catch (error) {
    console.error('❌ Failed to connect to server:', error.message);
    console.log('Make sure the server is running on http://localhost:3000');
    process.exit(1);
  }
}

// Run load test if this script is executed directly
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.includes('--help') || args.includes('-h')) {
    console.log('Usage: node load-test.js [options]');
    console.log('Options:');
    console.log('  --duration <seconds>    Test duration (default: 30)');
    console.log('  --rps <number>         Requests per second (default: 5)');
    console.log('  --endpoint <path>      API endpoint to test (default: /api/apartments)');
    console.log('  --suite               Run full test suite');
    process.exit(0);
  }
  
  if (args.includes('--suite')) {
    runLoadTestSuite().catch(console.error);
  } else {
    // Parse command line arguments
    const duration = parseInt(args[args.indexOf('--duration') + 1]) || 30;
    const rps = parseInt(args[args.indexOf('--rps') + 1]) || 5;
    const endpoint = args[args.indexOf('--endpoint') + 1] || '/api/apartments';
    
    runLoadTest({ duration, requestsPerSecond: rps, endpoint }).catch(console.error);
  }
}

module.exports = { runLoadTest, runLoadTestSuite };