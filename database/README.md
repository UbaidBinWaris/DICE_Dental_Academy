# DICE Dental Academy - Database Setup Guide

## Prerequisites

1. **PostgreSQL Installation**
   - Windows: Download from [postgresql.org](https://www.postgresql.org/download/windows/)
   - Minimum version: PostgreSQL 14+
   - During installation, note down the postgres superuser password

2. **Access PostgreSQL**
   ```powershell
   # Add PostgreSQL to PATH if not already done
   # Default location: C:\Program Files\PostgreSQL\16\bin
   
   # Connect to PostgreSQL
   psql -U postgres
   ```

## Setup Instructions

### Step 1: Run Database Creation Script

```powershell
# Navigate to the database folder
cd c:\Users\PMLS\Documents\GitHub\DICE_Dental_Academy\database

# Run the database creation script
psql -U postgres -f 01_create_database.sql
```

This script will:
- Create a new user `dice_admin` with password `DiceAcademy2024!Secure`
- Create a new user `dice_app` for application connections
- Create a new user `dice_backup` for backups (read-only)
- Create database `dice_dental_academy`
- Enable required extensions (uuid-ossp, pgcrypto, pg_trgm)
- Set up Row Level Security
- Configure default privileges

### Step 2: Run Table Creation Script

```powershell
# Run the table creation script
psql -U postgres -d dice_dental_academy -f 02_create_tables.sql
```

This script will:
- Create all 27 tables with proper relationships
- Set up Row Level Security policies
- Create indexes for performance
- Set up triggers for automatic timestamp updates
- Grant permissions to application users

### Step 3: Verify Database Setup

```powershell
# Connect to the database
psql -U dice_admin -d dice_dental_academy

# Inside psql, run these commands:
\dt dice_schema.*          # List all tables
\du                        # List all users
SELECT * FROM dice_schema.roles;  # Check default roles
```

Expected output:
- 27 tables in dice_schema
- 3 users: dice_admin, dice_app, dice_backup
- 5 default roles in the roles table

## Database Connection Details

### For Spring Boot Application

Use these connection details in your `application.yml`:

```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/dice_dental_academy
    username: dice_app
    password: DiceApp2024!Connect
    driver-class-name: org.postgresql.Driver
```

## Security Notes

### Default Passwords (CHANGE IN PRODUCTION!)

- **dice_admin**: `DiceAcademy2024!Secure`
- **dice_app**: `DiceApp2024!Connect`
- **dice_backup**: `DiceBackup2024!ReadOnly`

### Before Going to Production:

1. **Change all default passwords**
```sql
ALTER USER dice_admin WITH PASSWORD 'your_new_secure_password';
ALTER USER dice_app WITH PASSWORD 'your_new_secure_password';
ALTER USER dice_backup WITH PASSWORD 'your_new_secure_password';
```

2. **Configure pg_hba.conf** for network access
```
# Location: C:\Program Files\PostgreSQL\16\data\pg_hba.conf
# Add this line for local network access:
host    dice_dental_academy    dice_admin    127.0.0.1/32    md5
hostssl dice_dental_academy    dice_app      0.0.0.0/0       md5
```

3. **Enable SSL** (postgresql.conf)
```
ssl = on
ssl_cert_file = 'server.crt'
ssl_key_file = 'server.key'
```

## Row Level Security (RLS)

The following tables have RLS enabled:

1. **users** - Users can only see their own data; admins can see all
2. **applications** - Only admins and counselors can view
3. **counseling_requests** - Only admins and counselors can view
4. **contact_messages** - Only admins and counselors can view

### How RLS Works in the Application

The application must set the current user ID before queries:

```java
// In Spring Boot, set this before each query
jdbcTemplate.update("SET app.current_user_id = ?", userId);
```

## Backup and Restore

### Create Backup

```powershell
# Full database backup
pg_dump -U dice_backup -d dice_dental_academy -F c -f backup_$(date +%Y%m%d).backup

# Schema only backup
pg_dump -U dice_backup -d dice_dental_academy -s -f schema_backup.sql

# Data only backup
pg_dump -U dice_backup -d dice_dental_academy -a -f data_backup.sql
```

### Restore Backup

```powershell
# Restore from backup
pg_restore -U dice_admin -d dice_dental_academy -F c backup_20241228.backup
```

### Automated Backups (Recommended)

Create a PowerShell script for daily backups:

```powershell
# backup_script.ps1
$date = Get-Date -Format "yyyyMMdd"
$backupFile = "C:\Backups\dice_dental_academy_$date.backup"

& "C:\Program Files\PostgreSQL\16\bin\pg_dump.exe" `
  -U dice_backup `
  -d dice_dental_academy `
  -F c `
  -f $backupFile

# Delete backups older than 30 days
Get-ChildItem "C:\Backups" -Filter "dice_dental_academy_*.backup" | 
  Where-Object {$_.LastWriteTime -lt (Get-Date).AddDays(-30)} | 
  Remove-Item
```

Schedule this script using Windows Task Scheduler.

## Troubleshooting

### Connection Refused

```powershell
# Check if PostgreSQL is running
Get-Service postgresql*

# Start PostgreSQL if not running
Start-Service postgresql-x64-16
```

### Permission Denied

```sql
-- Grant missing permissions
GRANT ALL PRIVILEGES ON DATABASE dice_dental_academy TO dice_admin;
GRANT ALL ON SCHEMA dice_schema TO dice_admin;
```

### RLS Blocking Queries

```sql
-- Temporarily disable RLS for testing (NOT RECOMMENDED IN PRODUCTION)
ALTER TABLE users DISABLE ROW LEVEL SECURITY;

-- Re-enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
```

## Database Schema Overview

### Core Entities

1. **Authentication** - users, roles, refresh_tokens
2. **Courses** - courses, course_categories, course_modules, course_schedules
3. **Faculty** - faculty, course_faculty (junction), international_partners, collaborations
4. **Applications** - applications, counseling_requests, contact_messages, newsletter_subscribers
5. **CMS** - pages, sections, content_blocks, seo_meta
6. **Blog** - blog_posts, blog_categories, blog_tags, blog_post_tags
7. **Media** - media (centralized media library)
8. **Exams** - exam_pathways, exam_requirements
9. **Testimonials** - testimonials

### Relationships

- Courses ↔ Faculty (Many-to-Many)
- Courses → Course Modules (One-to-Many)
- Pages → Sections → Content Blocks (Hierarchical)
- Blog Posts ↔ Tags (Many-to-Many)
- Users → Applications (One-to-Many)

## Next Steps

After database setup is complete:

1. ✅ Database created
2. Create Spring Boot project with JPA entities
3. Configure Spring Security and JWT
4. Create repository and service layers
5. Create REST API controllers
6. Test API endpoints with Postman

## Support

If you encounter any issues:

1. Check PostgreSQL logs: `C:\Program Files\PostgreSQL\16\data\log\`
2. Verify user permissions: `\du` in psql
3. Check table creation: `\dt dice_schema.*`
4. Verify RLS policies: `\d+ dice_schema.users`
