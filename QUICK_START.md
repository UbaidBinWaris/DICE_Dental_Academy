# DICE Dental Academy - Quick Start Guide

Welcome to the DICE Dental Academy project! This guide will help you get up and running quickly.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18+ and npm
- **Java JDK** 17+
- **PostgreSQL** 14+
- **Maven** 3.6+ (or use the included Maven wrapper)
- **Git**

---

## Step 1: Clone the Repository

```powershell
git clone https://github.com/yourusername/DICE_Dental_Academy.git
cd DICE_Dental_Academy
```

---

## Step 2: Database Setup

### 2.1 Start PostgreSQL

Ensure PostgreSQL is running on your system.

```powershell
# Check if PostgreSQL is running
Get-Service postgresql*

# Start if not running
Start-Service postgresql-x64-16
```

### 2.2 Create Database

```powershell
cd database

# Run database creation script
psql -U postgres -f 01_create_database.sql

# Run table creation script
psql -U postgres -d dice_dental_academy -f 02_create_tables.sql
```

**Default credentials created:**
- Database: `dice_dental_academy`
- App User: `dice_app` / Password: `DiceApp2024!Connect`
- Admin User: `dice_admin` / Password: `DiceAcademy2024!Secure`

⚠️ **IMPORTANT:** Change these passwords before deploying to production!

---

## Step 3: Backend Setup (Spring Boot)

### 3.1 Configure Environment

```powershell
cd dice-dental-backend

# Copy environment template
copy .env.example .env
```

### 3.2 Edit .env File

Open `.env` and update with your settings:

```env
# Database (use default for local development)
DB_USERNAME=dice_app
DB_PASSWORD=DiceApp2024!Connect

# JWT Secret (change this!)
JWT_SECRET=change_this_to_a_long_random_string_at_least_256_bits

# Email (use your Gmail)
EMAIL_USERNAME=your_email@gmail.com
EMAIL_PASSWORD=your_gmail_app_password
```

**Getting Gmail App Password:**
1. Go to Google Account → Security
2. Enable 2-Factor Authentication
3. Generate App Password for "Mail"

### 3.3 Run the Backend

```powershell
# Build and run
.\mvnw spring-boot:run

# Or use Maven directly
mvn spring-boot:run
```

Backend will start at: **http://localhost:8080**  
Swagger UI: **http://localhost:8080/swagger-ui.html**

---

## Step 4: Frontend Setup (Public Website)

```powershell
cd dice-dental-frontend

# Install dependencies
npm install

# Run development server
npm run dev
```

Frontend will start at: **http://localhost:3000**

---

## Step 5: Admin Dashboard Setup

```powershell
cd dice-dental-admin

# Install dependencies
npm install

# Run development server
npm run dev
```

Admin dashboard will start at: **http://localhost:3001**

---

## Step 6: Verify Everything Works

### 6.1 Check Backend Health

Open browser: http://localhost:8080/actuator/health

Expected response:
```json
{
  "status": "UP"
}
```

### 6.2 Check Swagger API

Open: http://localhost:8080/swagger-ui.html

You should see all API endpoints documented.

### 6.3 Check Frontend

Open: http://localhost:3000

You should see the Next.js default page (we'll customize this next).

### 6.4 Check Admin

Open: http://localhost:3001

You should see the Next.js admin page.

---

## Default Admin Login

After the backend creates the default admin user automatically:

- **Email:** `admin@diceacademy.com`
- **Password:** `Admin@123`

⚠️ Change this immediately after first login!

---

## Development Workflow

### Running All Services

**Terminal 1 - Backend:**
```powershell
cd dice-dental-backend
.\mvnw spring-boot:run
```

**Terminal 2 - Frontend:**
```powershell
cd dice-dental-frontend
npm run dev
```

**Terminal 3 - Admin:**
```powershell
cd dice-dental-admin
npm run dev
```

### Making Database Changes

If you update the database schema:

1. Modify the SQL files in `/database`
2. Run the updated scripts:
```powershell
psql -U postgres -d dice_dental_academy -f your_updated_script.sql
```
3. Update corresponding Java entities in the backend
4. Restart the backend

### Adding New API Endpoints

1. Create DTOs in `/dto/request` and `/dto/response`
2. Create Controller in `/controller`
3. Create Service in `/service`
4. Create Repository in `/repository` (if needed)
5. Restart backend
6. Check Swagger UI for new endpoint

### Frontend Development

1. Create new pages in `/app` directory
2. Create components in `/components`
3. Add API calls in `/lib/api.ts`
4. Next.js will hot-reload automatically

---

## Common Issues & Solutions

### Issue: PostgreSQL Connection Refused

**Solution:**
```powershell
# Check if PostgreSQL is running
Get-Service postgresql*

# Start PostgreSQL
Start-Service postgresql-x64-16

# Verify connection
psql -U postgres
```

### Issue: Port 8080 Already in Use

**Solution:**
```powershell
# Find process using port 8080
netstat -ano | findstr :8080

# Kill the process (replace PID with actual process ID)
taskkill /PID <PID> /F
```

### Issue: Maven Build Fails

**Solution:**
```powershell
# Clean and rebuild
.\mvnw clean install

# Skip  tests if they're failing
.\mvnw clean install -DskipTests
```

### Issue: npm Install Fails

**Solution:**
```powershell
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -r node_modules
rm package-lock.json

# Reinstall
npm install
```

---

## Next Steps

Now that everything is running, you can:

1. **Explore the API:**
   - Visit Swagger UI: http://localhost:8080/swagger-ui.html
   - Test authentication endpoints
   - Create test data

2. **Customize Frontend:**
   - Update homepage at `dice-dental-frontend/app/page.tsx`
   - Create your hero section
   - Add course pages

3. **Set Up Admin Dashboard:**
   - Create login page
   - Build course management interface
   - Implement CMS editor

4. **Add Sample Data:**
   - Insert test courses in database
   - Add faculty members
   - Create blog posts

5. **Configure Third-Party Services:**
   - Set up Gmail for emails
   - Add Google Analytics
   - Configure WhatsApp API

---

## Useful Commands

### Backend

```powershell
# Run tests
.\mvnw test

# Build JAR
.\mvnw clean package

# Run with specific profile
.\mvnw spring-boot:run -Dspring-boot.run.profiles=dev
```

### Frontend/Admin

```powershell
# Type checking
npm run type-check

# Build for production
npm run build

# Start production server
npm start

# Lint
npm run lint
```

### Database

```powershell
# Connect to database
psql -U dice_app -d dice_dental_academy

# Dump database
pg_dump -U dice_admin dice_dental_academy > backup.sql

# Restore database
psql -U dice_admin dice_dental_academy < backup.sql

# List all tables
\dt dice_schema.*

# Describe table
\d dice_schema.users
```

---

## Project Structure Overview

```
DICE_Dental_Academy/
├── dice-dental-frontend/     # Next.js public website (Port 3000)
├── dice-dental-admin/        # Next.js admin dashboard (Port 3001)
├── dice-dental-backend/      # Spring Boot API (Port 8080)
├── database/                 # PostgreSQL scripts
├── docs/                     # Documentation
└── README.md                 # Project overview
```

---

## Support & Documentation

- **README.md** - Project overview and structure
- **database/README.md** - Database setup and management
- **docs/VPS_DEPLOYMENT_GUIDE.md** - Production deployment
- **implementation_plan.md** - Technical architecture (in `.gemini` folder)

---

## Tips for Development

1. **Keep backend running** while developing frontend - hot reload works best this way
2. **Use Swagger UI** to test API endpoints before implementing frontend
3. **Check logs** - Backend logs in console, Frontend logs in browser console
4. **Database first** - Always verify database changes before updating code
5. **Git commits** - Commit frequently with clear messages

---

## Ready to Code! 🚀

You're all set! The project is now running locally. Start customizing and building amazing features for DICE Dental Academy.

Happy coding! 💻
