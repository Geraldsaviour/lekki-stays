#!/usr/bin/env node

/**
 * Performance Testing Script for Lekki Stays Booking Platform
 * Tests concurrent booking scenarios and system performance
 */

const axios = require('axios');
const { performance } = require('perf_hooks');

const BASE_URL = 'http://localhost:3000';
const CONCURRENT_REQUESTS = 10;
const TEST_APARTMENT_ID = 1;

// Test data
const testBookingData = {
  apartmentId: TEST_APARTMENT_ID,
  guestName: 'Test Guest',
  guestPhone: '+2348012345678',
  guestEmail: 'test@example.com',
  checkIn: '2024-12-01',
  checkOut: '2024-12-03',
  numGuests: 2,
  totalPrice: 150000
};

// Performance metrics
const metrics = {
  totalRequests: 0,
  successfulRequests: 0,
  failedRequests: 0,
  averageResponseTime: 0,
  minResponseTime: Infinity,
  maxResponseTime: 0,
  responseTimes: []
};

/**
 * Make a single booking request and measure performance
 */
async function makeBookingRequest(requestId) {
  const startTime = performance.now();
  
  try {
    // Create unique booking data for each request
    const bookingData = {
      ...testBookingData,
      guestName: `Test Guest ${requestId}`,
      guestEmail: `test${requestId}@example.com`,
      checkIn: `2024-12-${String(requestId + 1).padStart(2, '0')}`,
      checkOut: `2024-12-${String(requestId + 3).padStart(2, '0')}`
    };
    
    const response = await axios.post(`${BASE_URL}/api/bookings`, bookingData, {
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    const endTime = performance.now();
    const responseTime = endTime - startTime;
    
    metrics.totalRequests++;
    metrics.responseTimes.push(responseTime);
    
    if (response.status === 201) {
      metrics.successfulRequests++;
      console.log(`✅ Request ${requestId}: Success (${responseTime.toFixed(2)}ms)`);
    } else {
      metrics.failedRequests++;
      console.log(`⚠️  Request ${requestId}: Unexpected status ${response.status} (${responseTime.toFixed(2)}ms)`);
    }
    
    return {
      success: true,
      responseTime,
      status: response.status,
      data: response.data
    };
    
  } catch (error) {
    const endTime = performance.now();
    const responseTime = endTime - startTime;
    
    metrics.totalRequests++;
    metrics.failedRequests++;
    metrics.responseTimes.push(responseTime);
    
    console.log(`❌ Request ${requestId}: Failed - ${error.message} (${responseTime.toFixed(2)}ms)`);
    
    return {
      success: false,
      responseTime,
      error: error.message
    };
  }
}

/**
 * Test concurrent booking requests
 */
async function testConcurrentBookings() {
  console.log(`🚀 Starting concurrent booking test with ${CONCURRENT_REQUESTS} requests...`);
  
  const startTime = performance.now();
  
  // Create array of promises for concurrent requests
  const promises = Array.from({ length: CONCURRENT_REQUESTS }, (_, i) => 
    makeBookingRequest(i + 1)
  );
  
  // Wait for all requests to complete
  const results = await Promise.all(promises);
  
  const endTime = performance.now();
  const totalTime = endTime - startTime;
  
  // Calculate metrics
  if (metrics.responseTimes.length > 0) {
    metrics.averageResponseTime = metrics.responseTimes.reduce((a, b) => a + b, 0) / metrics.responseTimes.length;
    metrics.minResponseTime = Math.min(...metrics.responseTimes);
    metrics.maxResponseTime = Math.max(...metrics.responseTimes);
  }
  
  // Print results
  console.log('\n📊 Performance Test Results:');
  console.log('================================');
  console.log(`Total Requests: ${metrics.totalRequests}`);
  console.log(`Successful: ${metrics.successfulRequests}`);
  console.log(`Failed: ${metrics.failedRequests}`);
  console.log(`Success Rate: ${((metrics.successfulRequests / metrics.totalRequests) * 100).toFixed(2)}%`);
  console.log(`Total Test Time: ${totalTime.toFixed(2)}ms`);
  console.log(`Average Response Time: ${metrics.averageResponseTime.toFixed(2)}ms`);
  console.log(`Min Response Time: ${metrics.minResponseTime.toFixed(2)}ms`);
  console.log(`Max Response Time: ${metrics.maxResponseTime.toFixed(2)}ms`);
  console.log(`Requests per Second: ${(metrics.totalRequests / (totalTime / 1000)).toFixed(2)}`);
  
  return results;
}

/**
 * Test API endpoint performance
 */
async function testAPIPerformance() {
  console.log('\n🔍 Testing API endpoint performance...');
  
  const endpoints = [
    { name: 'Get Apartments', url: '/api/apartments', method: 'GET' },
    { name: 'Get Apartment Details', url: '/api/apartments/1', method: 'GET' },
    { name: 'Check Availability', url: '/api/availability', method: 'POST', data: {
      apartmentId: 1,
      checkIn: '2024-12-15',
      checkOut: '2024-12-17'
    }}
  ];
  
  for (const endpoint of endpoints) {
    const startTime = performance.now();
    
    try {
      let response;
      if (endpoint.method === 'GET') {
        response = await axios.get(`${BASE_URL}${endpoint.url}`);
      } else {
        response = await axios.post(`${BASE_URL}${endpoint.url}`, endpoint.data);
      }
      
      const endTime = performance.now();
      const responseTime = endTime - startTime;
      
      console.log(`✅ ${endpoint.name}: ${responseTime.toFixed(2)}ms (Status: ${response.status})`);
      
    } catch (error) {
      const endTime = performance.now();
      const responseTime = endTime - startTime;
      
      console.log(`❌ ${endpoint.name}: ${responseTime.toFixed(2)}ms (Error: ${error.message})`);
    }
  }
}

/**
 * Test race condition scenarios
 */
async function testRaceConditions() {
  console.log('\n🏁 Testing race condition protection...');
  
  // Create multiple requests for the same dates
  const sameBookingData = {
    ...testBookingData,
    checkIn: '2024-12-20',
    checkOut: '2024-12-22'
  };
  
  const raceRequests = Array.from({ length: 5 }, (_, i) => ({
    ...sameBookingData,
    guestName: `Race Test Guest ${i + 1}`,
    guestEmail: `race${i + 1}@example.com`
  }));
  
  const startTime = performance.now();
  
  const racePromises = raceRequests.map((data, i) => 
    axios.post(`${BASE_URL}/api/bookings`, data).catch(error => ({
      error: true,
      status: error.response?.status,
      message: error.response?.data?.error || error.message
    }))
  );
  
  const raceResults = await Promise.all(racePromises);
  
  const endTime = performance.now();
  const raceTime = endTime - startTime;
  
  const successfulRaces = raceResults.filter(r => !r.error && r.status === 201).length;
  const conflictRaces = raceResults.filter(r => r.error && r.status === 409).length;
  
  console.log(`Race condition test completed in ${raceTime.toFixed(2)}ms`);
  console.log(`Successful bookings: ${successfulRaces} (should be 1)`);
  console.log(`Conflict responses: ${conflictRaces} (should be 4)`);
  
  if (successfulRaces === 1 && conflictRaces === 4) {
    console.log('✅ Race condition protection working correctly!');
  } else {
    console.log('⚠️  Race condition protection may have issues');
  }
}

/**
 * Main test function
 */
async function runPerformanceTests() {
  console.log('🏨 Lekki Stays Performance Testing Suite');
  console.log('========================================\n');
  
  try {
    // Check if server is running
    await axios.get(`${BASE_URL}/api/health`);
    console.log('✅ Server is running and accessible\n');
    
    // Run tests
    await testAPIPerformance();
    await testConcurrentBookings();
    await testRaceConditions();
    
    console.log('\n🎉 Performance testing completed!');
    
  } catch (error) {
    console.error('❌ Failed to connect to server:', error.message);
    console.log('Make sure the server is running on http://localhost:3000');
    process.exit(1);
  }
}

// Run tests if this script is executed directly
if (require.main === module) {
  runPerformanceTests().catch(console.error);
}

module.exports = {
  runPerformanceTests,
  testConcurrentBookings,
  testAPIPerformance,
  testRaceConditions
};