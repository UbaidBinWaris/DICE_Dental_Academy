# DICE Dental Academy - Project Structure

This document provides an overview of the complete project structure for the DICE Dental Academy full-stack application.

## Project Organization

```
DICE_Dental_Academy/
├── dice-dental-frontend/     # Public-facing Next.js website
├── dice-dental-admin/        # Admin dashboard (separate Next.js project)
├── dice-dental-backend/      Spring Boot REST API
├── database/                 # PostgreSQL scripts and schema
├── docs/                     # Documentation
└── README.md
```

---

## 1. Frontend (dice-dental-frontend/)

**Purpose:** Public-facing website for students, visitors, and applicants.

**Stack:** Next.js 15+, TypeScript, Tailwind CSS

```
dice-dental-frontend/
├── app/
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Homepage
│   ├── about/
│   │   └── page.tsx
│   ├── courses/
│   │   ├── page.tsx              # All courses listing
│   │   ├── [slug]/
│   │   │   └── page.tsx          # Individual course page
│   │   ├── pg-diplomas/
│   │   ├── aesthetic-dentistry/
│   │   └── short-courses/
│   ├── ai-dentistry/
│   ├── international-exams/
│   ├── facilities/
│   ├── faculty/
│   ├── testimonials/
│   ├── blog/
│   ├── contact/
│   └── apply/
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── MegaMenu.tsx
│   ├── ui/                       # Reusable UI components
│   ├── course/
│   ├── forms/
│   └── sections/                 # Homepage sections
├── lib/
│   ├── api.ts                    # API client
│   └── utils.ts
├── hooks/
├── types/
├── styles/
│   └── globals.css
├── public/
│   ├── images/
│   └── videos/
├── .env.local
├── next.config.ts
├── tailwind.config.ts
└── package.json
```

**Key Features:**
- Server Components for SEO
- Dynamic routing for courses & blog
- Form handling with validation
- Image optimization
- SEO metadata per page

---

##  Admin Dashboard (dice-dental-admin/)

**Purpose:** Separate admin interface for managing content, courses, applications, etc.

**Stack:** Next.js 15+, TypeScript, Tailwind CSS

```
dice-dental-admin/
├── app/
│   ├── layout.tsx
│   ├── page.tsx                  # Admin dashboard home
│   ├── login/
│   │   └── page.tsx
│   ├── dashboard/
│   │   └── page.tsx
│   ├── courses/
│   │   ├── page.tsx              # List all courses
│   │   ├── new/
│   │   │   └── page.tsx          # Create course
│   │   └── [id]/
│   │       └── edit/
│   │           └── page.tsx      # Edit course
│   ├── applications/
│   ├── cms/                      # Content management
│   ├── media/                    # Media library
│   ├── blog/
│   ├── faculty/
│   ├── seo/
│   └── settings/
├── components/
│   ├── layout/
│   │   ├── AdminSidebar.tsx
│   │   ├── AdminHeader.tsx
│   │   └── AdminLayout.tsx
│   ├── ui/
│   ├── forms/
│   │   ├── CourseForm.tsx
│   │   ├── BlogEditor.tsx        # Rich text editor (TipTap)
│   │   └── MediaUploader.tsx
│   ├── tables/
│   │   ├── DataTable.tsx
│   │   └── ApplicationsTable.tsx
│   └── charts/                   # Analytics charts
├── lib/
│   ├── api.ts
│   ├── auth.ts                   # JWT handling
│   └── utils.ts
├── hooks/
│   ├── useAuth.tsx
│   └── useApi.ts
├── middleware.ts                 # Auth protection
├── .env.local
└── package.json
```

**Key Features:**
- Protected routes (admin authentication)
- Rich text editor (TipTap)
 Drag-and-drop file upload
- Data tables with sorting/filtering
- Real-time form validation
- Toast notifications

---

## 3. Backend (dice-dental-backend/)

**Purpose:** REST API handling all business logic, database operations, and authentication.

**Stack:** Spring Boot 3.2, Java 17, PostgreSQL, JWT

```
dice-dental-backend/
├── src/main/java/com/dice/academy/
│   ├── DiceAcademyApplication.java
│   ├── config/
│   │   ├── SecurityConfig.java
│   │   ├── JwtConfig.java
│   │   ├── CorsConfig.java
│   │   ├── OpenApiConfig.java
│   │   └── StorageConfig.java
│   ├── controller/
│   │   ├── AuthController.java
│   │   ├── CourseController.java
│   │   ├── ApplicationController.java
│   │   ├── FacultyController.java
│   │   ├── BlogController.java
│   │   ├── CMSController.java
│   │   ├── MediaController.java
│   │   └── ExamPathwayController.java
│   ├── dto/
│   │   ├── request/
│   │   │   ├── LoginRequest.java
│   │   │   ├── RegisterRequest.java
│   │   │   ├── CourseRequest.java
│   │   │   └── ApplicationRequest.java
│   │   └── response/
│   │       ├── AuthResponse.java
│   │       ├── CourseResponse.java
│   │       └── ApiResponse.java
│   ├── entity/
│   │   ├── User.java
│   │   ├── Role.java
│   │   ├── Course.java
│   │   ├── CourseCategory.java
│   │   ├── Faculty.java
│   │   ├── Application.java
│   │   ├── BlogPost.java
│   │   ├── Page.java
│   │   ├── Media.java
│   │   └── ... (all other entities)
│   ├── repository/
│   │   ├── UserRepository.java
│   │   ├── CourseRepository.java
│   │   ├── ApplicationRepository.java
│   │   └── ... (repositories for all entities)
│   ├── service/
│   │   ├── AuthService.java
│   │   ├── CourseService.java
│   │   ├── ApplicationService.java
│   │   ├── MediaService.java
│   │   ├── EmailService.java
│   │   └── StorageService.java
│   ├── security/
│   │   ├── JwtTokenProvider.java
│   │   ├── JwtAuthenticationFilter.java
│   │   ├── UserDetailsServiceImpl.java
│   │   └── SecurityUtils.java
│   ├── exception/
│   │   ├── GlobalExceptionHandler.java
│   │   ├── ResourceNotFoundException.java
│   │   ├── UnauthorizedException.java
│   │   └── ValidationException.java
│   └── util/
│       ├── SlugGenerator.java
│       └── FileValidator.java
├── src/main/resources/
│   ├── application.yml
│   ├── application-dev.yml
│   └── application-prod.yml
├── uploads/                      # Local file storage
├── logs/
├── .env.example
├── .gitignore
└── pom.xml
```

**Key Features:**
- JWT authentication with refresh tokens
- Row Level Security integration
- Local file storage (upgradeable to S3)
- Email service integration
- Swagger/OpenAPI documentation
- Global exception handling
- Request validation

---

## 4. Database (database/)

**PostgreSQL with Row Level Security**

```
database/
├── 01_create_database.sql       # Create DB, users, and security
├── 02_create_tables.sql         # Create all 27 tables with RLS
└── README.md                    # Setup instructions
```

**Tables Created:**
- Authentication: users, roles, refresh_tokens
- Courses: courses, course_categories, course_modules, course_schedules
- Faculty: faculty, course_faculty, international_partners, collaborations
- Applications: applications, counseling_requests, contact_messages, newsletter_subscribers
- CMS: pages, sections, content_blocks, seo_meta
- Blog: blog_posts, blog_categories, blog_tags, blog_post_tags
- Media: media
- Exams: exam_pathways, exam_requirements
- Testimonials: testimonials

---

## 5. Documentation (docs/)

```
docs/
├── VPS_DEPLOYMENT_GUIDE.md      # Complete deployment instructions
├── API_DOCUMENTATION.md         # API endpoints reference
└── DEVELOPER_GUIDE.md           # Development setup guide
```

---

## Environment Variables

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:8080/api
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### Admin (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

### Backend (.env)
```env
DB_URL=jdbc:postgresql://localhost:5432/dice_dental_academy
DB_USERNAME=dice_app
DB_PASSWORD=DiceApp2024!Connect
JWT_SECRET=your_secret_key
EMAIL_USERNAME=your_email@gmail.com
EMAIL_PASSWORD=your_password
STORAGE_TYPE=local
WHATSAPP_API_KEY=your_key
GA_TRACKING_ID=G-XXXXXXXXXX
FB_PIXEL_ID=your_pixel_id
```

---

## Development Workflow

### 1. Database Setup
```powershell
# Navigate to database folder
cd database

# Run database scripts
psql -U postgres -f 01_create_database.sql
psql -U postgres -d dice_dental_academy -f 02_create_tables.sql
```

### 2. Backend Development
```powershell
cd dice-dental-backend

# Copy environment file
copy .env.example .env
# Edit .env with your values

# Run the application
.\mvnw spring-boot:run

# Access Swagger UI
# http://localhost:8080/swagger-ui.html
```

### 3. Frontend Development
```powershell
cd dice-dental-frontend

# Install dependencies
npm install

# Run dev server
npm run dev

# Access: http://localhost:3000
```

### 4. Admin Dashboard Development
```powershell
cd dice-dental-admin

# Install dependencies
npm install

# Run dev server
npm run dev

# Access: http://localhost:3001
```

---

## Git Structure

```
.git/
├── .gitignore (root level)
dice-dental-frontend/.gitignore
dice-dental-admin/.gitignore
dice-dental-backend/.gitignore
```

**Root .gitignore:**
```
# Environment files
*.env
.env.local
.env.production

# OS files
.DS_Store
Thumbs.db

# IDE
.idea/
.vscode/
*.iml

# Logs
logs/
*.log

# Uploads
uploads/
```

---

## Tech Stack Summary

| Component | Technology |
|-----------|-----------|
| Frontend | Next.js 15, React 19, TypeScript |
| Admin | Next.js 15, React 19, TypeScript |
| Styling | Tailwind CSS |
| Backend | Spring Boot 3.2, Java 17 |
| Database | PostgreSQL 15+ with RLS |
| Authentication | JWT (Spring Security) |
| API Docs | Swagger/OpenAPI |
| File Storage | Local (upgradeable to S3) |
| Email | Spring Mail (SMTP) |
| Rich Text Editor | TipTap |
| Deployment | Vercel (Frontend), VPS (Backend) |

---

## Next Steps

1. ✅ Database scripts created
2. ✅ Spring Boot configured
3. ✅ Next.js projects initialized
4. Create Spring Boot entities
5. Create repositories and services
6. Implement JWT authentication
7. Create REST API controllers
8. Build frontend components
9. Build admin dashboard
10. Test and deploy

---

## Support

For issues or questions:
1. Check documentation in `/docs`
2. Review implementation plan
3. Check API documentation (Swagger)
4. Review VPS deployment guide
