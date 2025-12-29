-- =====================================================
-- DICE Dental Academy - Database Setup Script
-- PostgreSQL with Row Level Security (RLS)
-- =====================================================

-- Connect as postgres superuser first
-- psql -U postgres

-- 1. Create Database User
-- =====================================================
CREATE USER dice_admin WITH PASSWORD 'DiceAcademy2024!Secure';

-- 2. Create Database
-- =====================================================
CREATE DATABASE dice_dental_academy
    WITH 
    OWNER = dice_admin
    ENCODING = 'UTF8'
    LC_COLLATE = 'en_US.UTF-8'
    LC_CTYPE = 'en_US.UTF-8'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;

-- Grant all privileges on database to dice_admin
GRANT ALL PRIVILEGES ON DATABASE dice_dental_academy TO dice_admin;

-- Connect to the new database
\c dice_dental_academy

-- 3. Create Schema
-- =====================================================
CREATE SCHEMA IF NOT EXISTS dice_schema AUTHORIZATION dice_admin;

-- Set default schema
ALTER DATABASE dice_dental_academy SET search_path TO dice_schema, public;

-- Grant schema privileges
GRANT ALL ON SCHEMA dice_schema TO dice_admin;
GRANT USAGE ON SCHEMA dice_schema TO dice_admin;

-- 4. Enable Required Extensions
-- =====================================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";      -- For UUID generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";       -- For password hashing
CREATE EXTENSION IF NOT EXISTS "pg_trgm";        -- For full-text search

-- Grant execute on all functions in extensions
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO dice_admin;

-- 5. Set Default Privileges
-- =====================================================
-- Future tables
ALTER DEFAULT PRIVILEGES IN SCHEMA dice_schema
    GRANT ALL ON TABLES TO dice_admin;

-- Future sequences
ALTER DEFAULT PRIVILEGES IN SCHEMA dice_schema
    GRANT ALL ON SEQUENCES TO dice_admin;

-- Future functions
ALTER DEFAULT PRIVILEGES IN SCHEMA dice_schema
    GRANT EXECUTE ON FUNCTIONS TO dice_admin;

-- 6. Security Settings
-- =====================================================
-- Enable Row Level Security by default for all tables
-- (Will be configured per table in migration scripts)

-- Create audit log function for tracking changes
CREATE OR REPLACE FUNCTION dice_schema.audit_trigger_func()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        NEW.created_at = NOW();
        NEW.updated_at = NOW();
    ELSIF TG_OP = 'UPDATE' THEN
        NEW.updated_at = NOW();
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Grant execute on audit function
GRANT EXECUTE ON FUNCTION dice_schema.audit_trigger_func() TO dice_admin;

-- 7. Connection Security
-- =====================================================
-- Force SSL connections (configure in postgresql.conf)
-- ssl = on
-- ssl_cert_file = 'server.crt'
-- ssl_key_file = 'server.key'

-- Configure pg_hba.conf to require SSL:
-- hostssl    dice_dental_academy    dice_admin    0.0.0.0/0    md5

-- 8. Create application user (for backend connection)
-- =====================================================
CREATE USER dice_app WITH PASSWORD 'DiceApp2024!Connect';

-- Grant connect privilege
GRANT CONNECT ON DATABASE dice_dental_academy TO dice_app;
GRANT USAGE ON SCHEMA dice_schema TO dice_app;

-- Grant specific privileges (to be set after table creation)
-- These will be added in migration scripts

-- 9. Verification
-- =====================================================
-- List all databases
SELECT datname FROM pg_database WHERE datname = 'dice_dental_academy';

-- List all users
SELECT usename FROM pg_user WHERE usename IN ('dice_admin', 'dice_app');

-- Show database info
\l dice_dental_academy

-- Show user privileges
\du dice_admin
\du dice_app

-- 10. Backup Configuration
-- =====================================================
-- Create backup user (read-only)
CREATE USER dice_backup WITH PASSWORD 'DiceBackup2024!ReadOnly';
GRANT CONNECT ON DATABASE dice_dental_academy TO dice_backup;
GRANT USAGE ON SCHEMA dice_schema TO dice_backup;
GRANT SELECT ON ALL TABLES IN SCHEMA dice_schema TO dice_backup;
ALTER DEFAULT PRIVILEGES IN SCHEMA dice_schema
    GRANT SELECT ON TABLES TO dice_backup;

-- =====================================================
-- NOTES:
-- =====================================================
-- 1. Change default passwords in production
-- 2. Use environment variables for passwords
-- 3. Configure pg_hba.conf for network access
-- 4. Enable SSL in production
-- 5. Set up regular automated backups
-- 6. Monitor connection limits
-- 7. Configure connection pooling (use PgBouncer)
-- =====================================================

COMMENT ON DATABASE dice_dental_academy IS 'DICE Dental Academy - Main Application Database';
COMMENT ON ROLE dice_admin IS 'Database administrator for DICE Dental Academy';
COMMENT ON ROLE dice_app IS 'Application user for backend connections';
COMMENT ON ROLE dice_backup IS 'Read-only user for backups';
