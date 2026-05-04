## Lekki Stays — MongoDB to Supabase Migration Guide

Complete step-by-step guide for migrating from MongoDB to Supabase.

See full documentation in the repository for detailed instructions on:

1. Creating Supabase project
2. Running database schema
3. Getting credentials
4. Updating environment variables
5. Testing endpoints
6. Migrating existing data
7. Deploying to production
8. Cleaning up old code

**Quick Start:**

```bash
# 1. Create Supabase project at https://app.supabase.com
# 2. Run supabase/schema.sql in SQL Editor
# 3. Get credentials from Settings > API
# 4. Update server/.env with credentials
# 5. Install dependencies
cd server
npm install

# 6. Start server
npm start

# 7. Test health endpoint
curl http://localhost:3000/api/health
```

**New API Endpoints:**

- GET /api/apartments
- GET /api/apartments/:id
- GET /api/apartments/:id/availability
- POST /api/bookings
- POST /api/availability/search

**Status:** Ready for migration
**Estimated Time:** 1-2 hours
