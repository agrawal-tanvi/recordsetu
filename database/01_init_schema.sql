-- Enable UUID extension if needed
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. users
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    role VARCHAR(50) DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. documents
CREATE TABLE documents (
    id SERIAL PRIMARY KEY,
    uploaded_by INTEGER REFERENCES users(id),
    file_path VARCHAR(500) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. land_records
CREATE TABLE land_records (
    id SERIAL PRIMARY KEY,
    document_id INTEGER REFERENCES documents(id),
    khasra_no VARCHAR(100) NOT NULL,
    owner_name VARCHAR(255) NOT NULL,
    village VARCHAR(255) NOT NULL,
    district VARCHAR(255) NOT NULL,
    area DECIMAL(10,4) NOT NULL,
    area_unit VARCHAR(50) NOT NULL,
    status VARCHAR(50) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. owners
CREATE TABLE owners (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    contact_number VARCHAR(20),
    aadhar_hash VARCHAR(255)
);

-- 5. ownership_shares
CREATE TABLE ownership_shares (
    id SERIAL PRIMARY KEY,
    land_record_id INTEGER REFERENCES land_records(id),
    owner_id INTEGER REFERENCES owners(id),
    share_percentage DECIMAL(5,2) CHECK (share_percentage > 0 AND share_percentage <= 100)
);

-- 6. ocr_results
CREATE TABLE ocr_results (
    id SERIAL PRIMARY KEY,
    document_id INTEGER REFERENCES documents(id),
    raw_text TEXT NOT NULL,
    extracted_json JSONB,
    processed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 7. validation_results
CREATE TABLE validation_results (
    id SERIAL PRIMARY KEY,
    land_record_id INTEGER REFERENCES land_records(id),
    is_valid BOOLEAN DEFAULT false,
    discrepancy_notes TEXT,
    validated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 8. audit_logs
CREATE TABLE audit_logs (
    id SERIAL PRIMARY KEY,
    table_name VARCHAR(100) NOT NULL,
    record_id INTEGER NOT NULL,
    action VARCHAR(50) NOT NULL,
    changed_by INTEGER REFERENCES users(id),
    action_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);