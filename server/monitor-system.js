#!/usr/bin/env node

/**
 * System Monitoring Script for Lekki Stays
 * Monitors system health, performance, and database status
 */

const axios = require('axios');
const { performance } = require('perf_hooks');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'http://localhost:3000';
const MONITOR_INTERVAL = 5000; // 5 seconds
const LOG_FILE = path.join(__dirname, 'monitoring.log');

let monitoring = false;
let monitoringStats = {
  startTime: null,
  totalChecks: 0,
  healthyChecks: 0,
  unhealthyChecks: 0,
  averageResponseTime: 0,
  responseTimes: []
};

/**
 * Log message to console and file
 */
function log(message, level = 'INFO') {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] [${level}] ${message}`;
  
  console.log(logMessage);
  
  // Append to log file
  fs.appendFileSync(LOG_FILE, logMessage + '\n');
}

/**
 * Check server health
 */
async function checkServerHealth() {
  const startTime = performance.now();
  
  try {
    // Check basic health endpoint
    const healthResponse = await axios.get(`${BASE_URL}/api/health`, { timeout: 5000 });
    
    // Check performance health
    const perfResponse = await axios.get(`${BASE_URL}/api/health/performance`, { timeout: 5000 });
    
    const endTime = performance.now();
    const responseTime = endTime - startTime;
    
    // Update stats
    monitoringStats.totalChecks++;
    monitoringStats.responseTimes.push(responseTime);
    
    // Keep only last 100 response times
    if (monitoringStats.responseTimes.length > 100) {
      monitoringStats.responseTimes.shift();
    }
    
    // Calculate average response time
    monitoringStats.averageResponseTime = 
      monitoringStats.responseTimes.reduce((a, b) => a + b, 0) / monitoringStats.responseTimes.length;
    
    const healthStatus = perfResponse.data.health.status;
    const metrics = perfResponse.data.health.metrics;
    
    if (healthStatus === 'healthy') {
      monitoringStats.healthyChecks++;
      log(`✅ System healthy - Response: ${responseTime.toFixed(2)}ms, Avg: ${metrics.averageResponseTime.toFixed(2)}ms, RPS: ${metrics.requestsLastMinute}/min`);
    } else if (healthStatus === 'degraded') {
      log(`⚠️  System degraded - ${perfResponse.data.health.issues.join(', ')} - Response: ${responseTime.toFixed(2)}ms`, 'WARN');
    } else {
      monitoringStats.unhealthyChecks++;
      log(`❌ System unhealthy - ${perfResponse.data.health.issues.join(', ')} - Response: ${responseTime.toFixed(2)}ms`, 'ERROR');
    }
    
    return {
      healthy: healthStatus === 'healthy',
      status: healthStatus,
      responseTime: responseTime,
      metrics: metrics,
      issues: perfResponse.data.health.issues || []
    };
    
  } catch (error) {
    const endTime = performance.now();
    const responseTime = endTime - startTime;
    
    monitoringStats.totalChecks++;
    monitoringStats.unhealthyChecks++;
    
    log(`💥 Server check failed - ${error.message} - Response: ${responseTime.toFixed(2)}ms`, 'ERROR');
    
    return {
      healthy: false,
      status: 'error',
      responseTime: responseTime,
      error: error.message
    };
  }
}

/**
 * Check database status
 */
async function checkDatabaseStatus() {
  try {
    // Try to fetch apartments (tests database connectivity)
    const response = await axios.get(`${BASE_URL}/api/apartments`, { timeout: 3000 });
    
    if (response.status === 200 && Array.isArray(response.data)) {
      log(`📊 Database healthy - ${response.data.length} apartments available`);
      return { healthy: true, apartmentCount: response.data.length };
    } else {
      log(`⚠️  Database response unexpected - Status: ${response.status}`, 'WARN');
      return { healthy: false, error: 'Unexpected response format' };
    }
    
  } catch (error) {
    log(`💾 Database check failed - ${error.message}`, 'ERROR');
    return { healthy: false, error: error.message };
  }
}

/**
 * Test critical endpoints
 */
async function testCriticalEndpoints() {
  const endpoints = [
    { name: 'Apartments List', url: '/api/apartments', method: 'GET' },
    { name: 'Apartment Detail', url: '/api/apartments/1', method: 'GET' },
    { name: 'Availability Check', url: '/api/availability', method: 'POST', data: {
      apartmentId: 1,
      checkIn: '2024-12-25',
      checkOut: '2024-12-27'
    }}
  ];
  
  const results = [];
  
  for (const endpoint of endpoints) {
    const startTime = performance.now();
    
    try {
      let response;
      if (endpoint.method === 'GET') {
        response = await axios.get(`${BASE_URL}${endpoint.url}`, { timeout: 3000 });
      } else {
        response = await axios.post(`${BASE_URL}${endpoint.url}`, endpoint.data, { timeout: 3000 });
      }
      
      const endTime = performance.now();
      const responseTime = endTime - startTime;
      
      results.push({
        name: endpoint.name,
        healthy: true,
        responseTime: responseTime,
        status: response.status
      });
      
    } catch (error) {
      const endTime = performance.now();
      const responseTime = endTime - startTime;
      
      results.push({
        name: endpoint.name,
        healthy: false,
        responseTime: responseTime,
        error: error.message,
        status: error.response?.status
      });
      
      log(`🔴 ${endpoint.name} failed - ${error.message}`, 'ERROR');
    }
  }
  
  const healthyEndpoints = results.filter(r => r.healthy).length;
  log(`🎯 Endpoint check: ${healthyEndpoints}/${results.length} healthy`);
  
  return results;
}

/**
 * Generate monitoring report
 */
function generateReport() {
  const uptime = Date.now() - monitoringStats.startTime;
  const uptimeMinutes = Math.floor(uptime / 60000);
  const healthRate = (monitoringStats.healthyChecks / monitoringStats.totalChecks) * 100;
  
  console.log('\n📈 Monitoring Report');
  console.log('===================');
  console.log(`Monitoring Duration: ${uptimeMinutes} minutes`);
  console.log(`Total Health Checks: ${monitoringStats.totalChecks}`);
  console.log(`Healthy Checks: ${monitoringStats.healthyChecks}`);
  console.log(`Unhealthy Checks: ${monitoringStats.unhealthyChecks}`);
  console.log(`Health Rate: ${healthRate.toFixed(2)}%`);
  console.log(`Average Response Time: ${monitoringStats.averageResponseTime.toFixed(2)}ms`);
  
  if (monitoringStats.responseTimes.length > 0) {
    const minResponse = Math.min(...monitoringStats.responseTimes);
    const maxResponse = Math.max(...monitoringStats.responseTimes);
    console.log(`Min Response Time: ${minResponse.toFixed(2)}ms`);
    console.log(`Max Response Time: ${maxResponse.toFixed(2)}ms`);
  }
}

/**
 * Start monitoring
 */
async function startMonitoring() {
  if (monitoring) {
    console.log('Monitoring is already running');
    return;
  }
  
  monitoring = true;
  monitoringStats.startTime = Date.now();
  
  log('🚀 Starting system monitoring...', 'INFO');
  
  // Initial checks
  try {
    await checkServerHealth();
    await checkDatabaseStatus();
    await testCriticalEndpoints();
  } catch (error) {
    log(`Initial checks failed: ${error.message}`, 'ERROR');
  }
  
  // Set up periodic monitoring
  const monitorInterval = setInterval(async () => {
    if (!monitoring) {
      clearInterval(monitorInterval);
      return;
    }
    
    try {
      await checkServerHealth();
      
      // Run database and endpoint checks every 3rd iteration (15 seconds)
      if (monitoringStats.totalChecks % 3 === 0) {
        await checkDatabaseStatus();
        await testCriticalEndpoints();
      }
      
    } catch (error) {
      log(`Monitoring error: ${error.message}`, 'ERROR');
    }
  }, MONITOR_INTERVAL);
  
  // Handle graceful shutdown
  process.on('SIGINT', () => {
    log('🛑 Stopping monitoring...', 'INFO');
    monitoring = false;
    clearInterval(monitorInterval);
    generateReport();
    process.exit(0);
  });
  
  console.log('Press Ctrl+C to stop monitoring\n');
}

/**
 * Run a single health check
 */
async function runSingleCheck() {
  console.log('🔍 Running single system check...\n');
  
  try {
    const serverHealth = await checkServerHealth();
    const dbHealth = await checkDatabaseStatus();
    const endpointResults = await testCriticalEndpoints();
    
    console.log('\n📋 Check Summary:');
    console.log(`Server Health: ${serverHealth.healthy ? '✅ Healthy' : '❌ Unhealthy'}`);
    console.log(`Database Health: ${dbHealth.healthy ? '✅ Healthy' : '❌ Unhealthy'}`);
    
    const healthyEndpoints = endpointResults.filter(r => r.healthy).length;
    console.log(`Endpoints: ${healthyEndpoints}/${endpointResults.length} healthy`);
    
    if (serverHealth.healthy && dbHealth.healthy && healthyEndpoints === endpointResults.length) {
      console.log('\n🎉 All systems operational!');
    } else {
      console.log('\n⚠️  Some issues detected. Check logs for details.');
    }
    
  } catch (error) {
    console.error('❌ Health check failed:', error.message);
  }
}

// Main execution
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.includes('--help') || args.includes('-h')) {
    console.log('Usage: node monitor-system.js [options]');
    console.log('Options:');
    console.log('  --monitor, -m    Start continuous monitoring');
    console.log('  --check, -c      Run single health check');
    console.log('  --help, -h       Show this help message');
    process.exit(0);
  }
  
  if (args.includes('--monitor') || args.includes('-m')) {
    startMonitoring().catch(console.error);
  } else if (args.includes('--check') || args.includes('-c')) {
    runSingleCheck().catch(console.error);
  } else {
    // Default to single check
    runSingleCheck().catch(console.error);
  }
}

module.exports = {
  startMonitoring,
  runSingleCheck,
  checkServerHealth,
  checkDatabaseStatus,
  testCriticalEndpoints
};