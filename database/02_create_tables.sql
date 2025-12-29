-- =====================================================
-- DICE Dental Academy - Table Creation Script
-- PostgreSQL with Row Level Security (RLS)
-- =====================================================

-- Connect to database
\c dice_dental_academy
SET search_path TO dice_schema, public;

-- =====================================================
-- 1. ROLES AND PERMISSIONS TABLE
-- =====================================================

CREATE TABLE roles (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default roles
INSERT INTO roles (name, description) VALUES
    ('ADMIN', 'Full system access'),
    ('FACULTY', 'Faculty member access'),
    ('STUDENT', 'Student portal access'),
    ('COUNSELOR', 'Counseling and application management'),
    ('CONTENT_MANAGER', 'CMS and content management');

-- =====================================================
-- 2. USERS TABLE
-- =====================================================

CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    role_id BIGINT NOT NULL REFERENCES roles(id),
    is_active BOOLEAN DEFAULT true,
    email_verified BOOLEAN DEFAULT false,
    last_login_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Enable RLS on users table
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Users can view their own data
CREATE POLICY users_select_own ON users
    FOR SELECT
    USING (id = current_setting('app.current_user_id')::BIGINT);

-- RLS Policy: Admins can view all users
CREATE POLICY users_select_admin ON users
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM users u
            JOIN roles r ON u.role_id = r.id
            WHERE u.id = current_setting('app.current_user_id')::BIGINT
            AND r.name = 'ADMIN'
        )
    );

-- Create indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role_id ON users(role_id);
CREATE INDEX idx_users_is_active ON users(is_active);

-- =====================================================
-- 3. REFRESH TOKENS TABLE
-- =====================================================

CREATE TABLE refresh_tokens (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    token VARCHAR(500) UNIQUE NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_refresh_tokens_user_id ON refresh_tokens(user_id);
CREATE INDEX idx_refresh_tokens_token ON refresh_tokens(token);

-- =====================================================
-- 4. COURSE CATEGORIES TABLE
-- =====================================================

CREATE TABLE course_categories (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    icon VARCHAR(255),
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_course_categories_slug ON course_categories(slug);

-- =====================================================
-- 5. COURSES TABLE
-- =====================================================

CREATE TABLE courses (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    category_id BIGINT REFERENCES course_categories(id),
    description TEXT,
    overview TEXT,
    duration VARCHAR(100),
    eligibility TEXT,
    price DECIMAL(10, 2),
    certification_type VARCHAR(100),
    hands_on_details TEXT,
    image_url VARCHAR(500),
    is_active BOOLEAN DEFAULT true,
    is_featured BOOLEAN DEFAULT false,
    enrollment_capacity INT,
    current_enrollments INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_courses_slug ON courses(slug);
CREATE INDEX idx_courses_category_id ON courses(category_id);
CREATE INDEX idx_courses_is_active ON courses(is_active);
CREATE INDEX idx_courses_is_featured ON courses(is_featured);

-- =====================================================
-- 6. COURSE MODULES TABLE
-- =====================================================

CREATE TABLE course_modules (
    id BIGSERIAL PRIMARY KEY,
    course_id BIGINT NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    duration VARCHAR(50),
    module_order INT NOT NULL,
    content TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_course_modules_course_id ON course_modules(course_id);

-- =====================================================
-- 7. FACULTY TABLE
-- =====================================================

CREATE TABLE faculty (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    designation VARCHAR(255),
    bio TEXT,
    expertise TEXT,
    image_url VARCHAR(500),
    email VARCHAR(255),
    is_international BOOLEAN DEFAULT false,
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_faculty_is_active ON faculty(is_active);

-- =====================================================
-- 8. COURSE FACULTY (Many-to-Many)
-- =====================================================

CREATE TABLE course_faculty (
    course_id BIGINT NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    faculty_id BIGINT NOT NULL REFERENCES faculty(id) ON DELETE CASCADE,
    role VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (course_id, faculty_id)
);

CREATE INDEX idx_course_faculty_course_id ON course_faculty(course_id);
CREATE INDEX idx_course_faculty_faculty_id ON course_faculty(faculty_id);

-- =====================================================
-- 9. COURSE SCHEDULES TABLE
-- =====================================================

CREATE TABLE course_schedules (
    id BIGSERIAL PRIMARY KEY,
    course_id BIGINT NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    start_date DATE NOT NULL,
    end_date DATE,
    time_slot VARCHAR(100),
    location VARCHAR(255),
    available_seats INT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_course_schedules_course_id ON course_schedules(course_id);
CREATE INDEX idx_course_schedules_start_date ON course_schedules(start_date);

-- =====================================================
-- 10. APPLICATIONS TABLE
-- =====================================================

CREATE TABLE applications (
    id BIGSERIAL PRIMARY KEY,
    course_id BIGINT REFERENCES courses(id),
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    qualification VARCHAR(255),
    experience_years INT,
    message TEXT,
    status VARCHAR(50) DEFAULT 'PENDING',
    admin_notes TEXT,
    reviewed_by BIGINT REFERENCES users(id),
    reviewed_at TIMESTAMP,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Enable RLS
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Only admins and counselors can view applications
CREATE POLICY applications_select_policy ON applications
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM users u
            JOIN roles r ON u.role_id = r.id
            WHERE u.id = current_setting('app.current_user_id')::BIGINT
            AND r.name IN ('ADMIN', 'COUNSELOR')
        )
    );

CREATE INDEX idx_applications_course_id ON applications(course_id);
CREATE INDEX idx_applications_status ON applications(status);
CREATE INDEX idx_applications_email ON applications(email);

-- =====================================================
-- 11. COUNSELING REQUESTS TABLE
-- =====================================================

CREATE TABLE counseling_requests (
    id BIGSERIAL PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    preferred_date DATE,
    preferred_time VARCHAR(50),
    course_interest VARCHAR(255),
    message TEXT,
    status VARCHAR(50) DEFAULT 'PENDING',
    admin_notes TEXT,
    assigned_to BIGINT REFERENCES users(id),
    scheduled_at TIMESTAMP,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE counseling_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY counseling_select_policy ON counseling_requests
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM users u
            JOIN roles r ON u.role_id = r.id
            WHERE u.id = current_setting('app.current_user_id')::BIGINT
            AND r.name IN ('ADMIN', 'COUNSELOR')
        )
    );

CREATE INDEX idx_counseling_status ON counseling_requests(status);

-- =====================================================
-- 12. CONTACT MESSAGES TABLE
-- =====================================================

CREATE TABLE contact_messages (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    subject VARCHAR(255),
    message TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'NEW',
    admin_notes TEXT,
    responded_by BIGINT REFERENCES users(id),
    responded_at TIMESTAMP,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY contact_select_policy ON contact_messages
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM users u
            JOIN roles r ON u.role_id = r.id
            WHERE u.id = current_setting('app.current_user_id')::BIGINT
            AND r.name IN ('ADMIN', 'COUNSELOR')
        )
    );

CREATE INDEX idx_contact_messages_status ON contact_messages(status);

-- =====================================================
-- 13. NEWSLETTER SUBSCRIBERS TABLE
-- =====================================================

CREATE TABLE newsletter_subscribers (
    id BIGSERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    is_subscribed BOOLEAN DEFAULT true,
    subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    unsubscribed_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_newsletter_email ON newsletter_subscribers(email);

-- =====================================================
-- 14. PAGES TABLE (CMS)
-- =====================================================

CREATE TABLE pages (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    published BOOLEAN DEFAULT false,
    created_by BIGINT REFERENCES users(id),
    updated_by BIGINT REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_pages_slug ON pages(slug);

-- =====================================================
-- 15. SECTIONS TABLE (CMS)
-- =====================================================

CREATE TABLE sections (
    id BIGSERIAL PRIMARY KEY,
    page_id BIGINT NOT NULL REFERENCES pages(id) ON DELETE CASCADE,
    type VARCHAR(100) NOT NULL,
    title VARCHAR(255),
    order_index INT NOT NULL,
    config JSONB,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_sections_page_id ON sections(page_id);

-- =====================================================
-- 16. CONTENT BLOCKS TABLE (CMS)
-- =====================================================

CREATE TABLE content_blocks (
    id BIGSERIAL PRIMARY KEY,
    section_id BIGINT NOT NULL REFERENCES sections(id) ON DELETE CASCADE,
    content_type VARCHAR(50) NOT NULL,
    content TEXT,
    order_index INT NOT NULL,
    metadata JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_content_blocks_section_id ON content_blocks(section_id);

-- =====================================================
-- 17. SEO META TABLE
-- =====================================================

CREATE TABLE seo_meta (
    id BIGSERIAL PRIMARY KEY,
    page_id BIGINT UNIQUE NOT NULL REFERENCES pages(id) ON DELETE CASCADE,
    meta_title VARCHAR(255),
    meta_description TEXT,
    meta_keywords VARCHAR(500),
    og_title VARCHAR(255),
    og_description TEXT,
    og_image VARCHAR(500),
    schema_markup JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_seo_meta_page_id ON seo_meta(page_id);

-- =====================================================
-- 18. MEDIA TABLE
-- =====================================================

CREATE TABLE media (
    id BIGSERIAL PRIMARY KEY,
    file_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_url VARCHAR(500) NOT NULL,
    file_type VARCHAR(50) NOT NULL,
    file_size BIGINT NOT NULL,
    mime_type VARCHAR(100),
    alt_text VARCHAR(255),
    caption TEXT,
    uploaded_by BIGINT REFERENCES users(id),
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_media_file_type ON media(file_type);
CREATE INDEX idx_media_uploaded_by ON media(uploaded_by);

-- =====================================================
-- 19. BLOG CATEGORIES TABLE
-- =====================================================

CREATE TABLE blog_categories (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_blog_categories_slug ON blog_categories(slug);

-- =====================================================
-- 20. BLOG TAGS TABLE
-- =====================================================

CREATE TABLE blog_tags (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_blog_tags_slug ON blog_tags(slug);

-- =====================================================
-- 21. BLOG POSTS TABLE
-- =====================================================

CREATE TABLE blog_posts (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    excerpt TEXT,
    content TEXT NOT NULL,
    featured_image VARCHAR(500),
    category_id BIGINT REFERENCES blog_categories(id),
    author_id BIGINT REFERENCES users(id),
    published BOOLEAN DEFAULT false,
    published_at TIMESTAMP,
    view_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_category_id ON blog_posts(category_id);
CREATE INDEX idx_blog_posts_author_id ON blog_posts(author_id);
CREATE INDEX idx_blog_posts_published ON blog_posts(published);

-- =====================================================
-- 22. BLOG POST TAGS (Many-to-Many)
-- =====================================================

CREATE TABLE blog_post_tags (
    blog_post_id BIGINT NOT NULL REFERENCES blog_posts(id) ON DELETE CASCADE,
    tag_id BIGINT NOT NULL REFERENCES blog_tags(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (blog_post_id, tag_id)
);

CREATE INDEX idx_blog_post_tags_post_id ON blog_post_tags(blog_post_id);
CREATE INDEX idx_blog_post_tags_tag_id ON blog_post_tags(tag_id);

-- =====================================================
-- 23. INTERNATIONAL PARTNERS TABLE
-- =====================================================

CREATE TABLE international_partners (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    country VARCHAR(100),
    website VARCHAR(500),
    logo_url VARCHAR(500),
    description TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- 24. COLLABORATIONS TABLE
-- =====================================================

CREATE TABLE collaborations (
    id BIGSERIAL PRIMARY KEY,
    partner_id BIGINT REFERENCES international_partners(id),
    faculty_id BIGINT REFERENCES faculty(id),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    start_date DATE,
    end_date DATE,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_collaborations_partner_id ON collaborations(partner_id);
CREATE INDEX idx_collaborations_faculty_id ON collaborations(faculty_id);

-- =====================================================
-- 25. EXAM PATHWAYS TABLE
-- =====================================================

CREATE TABLE exam_pathways (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    country VARCHAR(100) NOT NULL,
    description TEXT,
    overview TEXT,
    exam_structure TEXT,
    preparation_details TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_exam_pathways_slug ON exam_pathways(slug);

-- =====================================================
-- 26. EXAM REQUIREMENTS TABLE
-- =====================================================

CREATE TABLE exam_requirements (
    id BIGSERIAL PRIMARY KEY,
    exam_pathway_id BIGINT NOT NULL REFERENCES exam_pathways(id) ON DELETE CASCADE,
    requirement_type VARCHAR(100) NOT NULL,
    requirement_text TEXT NOT NULL,
    order_index INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_exam_requirements_pathway_id ON exam_requirements(exam_pathway_id);

-- =====================================================
-- 27. TESTIMONIALS TABLE
-- =====================================================

CREATE TABLE testimonials (
    id BIGSERIAL PRIMARY KEY,
    student_name VARCHAR(255) NOT NULL,
    course_id BIGINT REFERENCES courses(id),
    rating INT CHECK (rating >= 1 AND rating <= 5),
    testimonial_text TEXT NOT NULL,
    image_url VARCHAR(500),
    is_featured BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_testimonials_course_id ON testimonials(course_id);
CREATE INDEX idx_testimonials_is_featured ON testimonials(is_featured);

-- =====================================================
-- CREATE TRIGGERS FOR UPDATED_AT
-- =====================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply triggers to all tables with updated_at
DO $$
DECLARE
    t text;
BEGIN
    FOR t IN 
        SELECT table_name 
        FROM information_schema.columns 
        WHERE column_name = 'updated_at' 
        AND table_schema = 'dice_schema'
    LOOP
        EXECUTE format('CREATE TRIGGER update_%I_updated_at BEFORE UPDATE ON dice_schema.%I FOR EACH ROW EXECUTE FUNCTION update_updated_at_column()', t, t);
    END LOOP;
END;
$$;

-- =====================================================
-- GRANT PERMISSIONS
-- =====================================================

-- Grant permissions to dice_app user
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA dice_schema TO dice_app;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA dice_schema TO dice_app;

-- =====================================================
-- VERIFICATION
-- =====================================================

-- Count tables
SELECT COUNT(*) as total_tables FROM information_schema.tables WHERE table_schema = 'dice_schema';

-- List all tables
SELECT table_name FROM information_schema.tables WHERE table_schema = 'dice_schema' ORDER BY table_name;
