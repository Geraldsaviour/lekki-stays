# Performance Testing & Monitoring

This document describes the performance testing and monitoring capabilities of the Lekki Stays booking platform.

## Overview

The platform includes comprehensive performance testing and monitoring tools to ensure optimal performance under various load conditions and to detect issues early.

## Performance Features

### 1. Performance Monitoring Middleware
- Real-time request tracking
- Response time measurement
- Error rate monitoring
- Slow request detection (>1000ms)
- Automatic metrics collection

### 2. Database Optimizations
- SQLite WAL mode for better concurrency
- Comprehensive indexing strategy
- Prepared statements for common operations
- Connection pooling and caching

### 3. Race Condition Protection
- In-memory locking for booking creation
- Atomic availability checking
- Automatic lock cleanup
- Deadlock prevention

## Testing Scripts

### Performance Testing
```bash
# Run comprehensive performance tests
npm run test:performance

# Test concurrent booking scenarios
# Test WhatsApp integration
# Test race condition protection
```

### Load Testing
```bash
# Run full load test suite
npm run test:load

# Light load test (2 RPS for 15 seconds)
npm run test:load:light

# Heavy load test (10 RPS for 20 seconds)  
npm run test:load:heavy

# Booking-specific load test
npm run test:bookings
```

### System Monitoring
```bash
# Run single health check
npm run health

# Start continuous monitoring
npm run monitor
```

## Performance Endpoints

### Health Check
```
GET /api/health
```
Basic server health status.

### Performance Metrics
```
GET /api/metrics
```
Detailed performance metrics including:
- Total requests processed
- Average response time
- Requests per minute/5 minutes
- Slow request count
- Error request count
- Recent request samples

### Performance Health
```
GET /api/health/performance
```
Performance-based health assessment:
- `healthy`: All metrics within normal ranges
- `degraded`: Some metrics elevated but functional
- `unhealthy`: Critical performance issues detected

## Performance Targets

### Response Times
- **API Endpoints**: < 200ms average
- **Database Queries**: < 50ms average
- **Booking Creation**: < 500ms average
- **Availability Check**: < 100ms average

### Throughput
- **Concurrent Users**: 50+ simultaneous users
- **Requests per Second**: 20+ RPS sustained
- **Booking Creation**: 5+ bookings/second peak

### Reliability
- **Uptime**: 99.9% availability
- **Error Rate**: < 1% under normal load
- **Race Condition Protection**: 100% booking integrity

## Monitoring Alerts

The system monitors for:

### Critical Issues (Immediate Alert)
- Server downtime
- Database connectivity loss
- Error rate > 10%
- Average response time > 2000ms

### Warning Conditions
- Error rate > 5%
- Average response time > 1000ms
- Multiple slow requests (>10 in monitoring period)
- High memory usage

## Load Testing Scenarios

### Scenario 1: Normal Traffic
- **Load**: 2-5 RPS
- **Duration**: 15-30 minutes
- **Endpoints**: Mixed (apartments, availability, bookings)
- **Expected**: All requests successful, <200ms average

### Scenario 2: Peak Traffic
- **Load**: 10-15 RPS
- **Duration**: 10-15 minutes
- **Endpoints**: Heavy on search and availability
- **Expected**: >95% success rate, <500ms average

### Scenario 3: Booking Rush
- **Load**: 5-8 concurrent booking attempts
- **Duration**: 5-10 minutes
- **Endpoints**: Booking creation only
- **Expected**: Proper race condition handling, no double bookings

### Scenario 4: Stress Test
- **Load**: 20+ RPS
- **Duration**: 5 minutes
- **Endpoints**: All endpoints
- **Expected**: Graceful degradation, no crashes

## Performance Optimization Checklist

### Database
- [x] Proper indexing on frequently queried columns
- [x] WAL mode enabled for better concurrency
- [x] Prepared statements for common operations
- [x] Query optimization for availability checks

### Application
- [x] Response compression enabled
- [x] Static file serving optimized
- [x] Rate limiting implemented
- [x] Input validation and sanitization
- [x] Error handling and logging

### Concurrency
- [x] Race condition protection for bookings
- [x] Atomic operations for critical paths
- [x] Lock management and cleanup
- [x] Deadlock prevention

### Monitoring
- [x] Real-time performance metrics
- [x] Health check endpoints
- [x] Automated testing scripts
- [x] Log aggregation and analysis

## Troubleshooting Performance Issues

### High Response Times
1. Check database query performance
2. Review recent code changes
3. Analyze slow request logs
4. Check system resource usage

### High Error Rates
1. Review error logs for patterns
2. Check database connectivity
3. Verify input validation
4. Test critical endpoints manually

### Race Condition Issues
1. Check booking lock status
2. Review concurrent request logs
3. Verify atomic operation integrity
4. Test with concurrent booking scenarios

### Memory Issues
1. Monitor request metrics storage
2. Check for memory leaks in long-running processes
3. Review lock cleanup mechanisms
4. Analyze garbage collection patterns

## Performance Best Practices

### Development
- Always test with realistic data volumes
- Use performance testing in CI/CD pipeline
- Monitor performance metrics in staging
- Profile code for bottlenecks

### Production
- Enable performance monitoring
- Set up automated alerts
- Regular performance audits
- Capacity planning based on metrics

### Database
- Regular index analysis and optimization
- Monitor query performance
- Backup and recovery testing
- Connection pool tuning

### Caching
- Implement appropriate caching strategies
- Cache frequently accessed data
- Use CDN for static assets
- Monitor cache hit rates

## Continuous Improvement

1. **Regular Performance Reviews**: Monthly analysis of performance trends
2. **Load Testing Schedule**: Weekly automated load tests
3. **Performance Budgets**: Set and monitor performance budgets for key metrics
4. **Optimization Sprints**: Dedicated time for performance improvements
5. **User Experience Monitoring**: Track real user performance metrics