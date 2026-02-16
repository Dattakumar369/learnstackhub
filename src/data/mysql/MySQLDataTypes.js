const mysqlDataTypes = {
  id: 'mysql-data-types',
  title: 'MySQL Data Types',
  description: 'Complete guide to MySQL data types: numeric, string, date, and JSON types',
  content: `
# MySQL Data Types — Choosing the Right Type

Choosing the correct data type is crucial for database design. It affects storage, performance, and data integrity. MySQL provides various data types for different purposes.

---

## Why Data Types Matter

**Benefits of Correct Types:**
- ✅ **Storage Efficiency** - Saves disk space
- ✅ **Performance** - Faster queries and indexing
- ✅ **Data Integrity** - Prevents invalid data
- ✅ **Validation** - Automatic type checking

**Problems with Wrong Types:**
- ❌ Wasted storage space
- ❌ Slower queries
- ❌ Data integrity issues
- ❌ Difficult to maintain

---

## Categories of Data Types

1. **Numeric Types** - Numbers (INT, DECIMAL, FLOAT)
2. **String Types** - Text (VARCHAR, TEXT, CHAR)
3. **Date/Time Types** - Dates and times (DATE, DATETIME, TIMESTAMP)
4. **JSON Type** - JSON data (MySQL 5.7+)
5. **Binary Types** - Binary data (BLOB)

---

## 1. Numeric Types

### Integer Types

| Type | Storage | Signed Range | Unsigned Range | Use Case |
|------|---------|--------------|----------------|----------|
| **TINYINT** | 1 byte | -128 to 127 | 0 to 255 | Age, status codes |
| **SMALLINT** | 2 bytes | -32,768 to 32,767 | 0 to 65,535 | Small numbers |
| **MEDIUMINT** | 3 bytes | -8M to 8M | 0 to 16M | Medium numbers |
| **INT** | 4 bytes | -2B to 2B | 0 to 4B | IDs, counts (most common) |
| **BIGINT** | 8 bytes | -9Q to 9Q | 0 to 18Q | Large numbers |

**Examples:**
\`\`\`sql
-- Age (0-150)
age TINYINT UNSIGNED

-- User ID (can be large)
user_id INT UNSIGNED AUTO_INCREMENT

-- Product count (can be very large)
total_products BIGINT UNSIGNED

-- Status code (0 or 1)
is_active TINYINT(1)  -- 0 = false, 1 = true
\`\`\`

### Decimal Types

**DECIMAL(M, D)**
- **M** = Total digits (precision)
- **D** = Digits after decimal (scale)
- Exact precision - no rounding errors
- Use for: Money, prices, measurements

\`\`\`sql
-- Price with 2 decimal places
price DECIMAL(10, 2)  -- Max: 99,999,999.99

-- Weight with 3 decimal places
weight DECIMAL(8, 3)  -- Max: 99,999.999
\`\`\`

**FLOAT and DOUBLE**
- Approximate floating-point numbers
- Faster but less precise
- Use for: Scientific calculations, measurements

\`\`\`sql
-- Scientific measurement
temperature FLOAT

-- High precision calculation
distance DOUBLE
\`\`\`

---

## 2. String Types

### VARCHAR vs CHAR

**VARCHAR(N)**
- Variable-length string
- Stores up to N characters
- Uses only needed space
- **Use for**: Names, addresses, descriptions

\`\`\`sql
-- Name (variable length)
name VARCHAR(100)

-- Email (variable length)
email VARCHAR(255)
\`\`\`

**CHAR(N)**
- Fixed-length string
- Always uses N characters
- Faster for fixed-length data
- **Use for**: Codes, status flags

\`\`\`sql
-- Country code (always 2 chars)
country_code CHAR(2)  -- 'US', 'IN', 'UK'

-- Status (always 1 char)
status CHAR(1)  -- 'A' (Active), 'I' (Inactive)
\`\`\`

### Text Types

| Type | Max Size | Use Case |
|------|----------|----------|
| **TINYTEXT** | 255 bytes | Short descriptions |
| **TEXT** | 65,535 bytes (64 KB) | Articles, comments |
| **MEDIUMTEXT** | 16,777,215 bytes (16 MB) | Long articles, content |
| **LONGTEXT** | 4,294,967,295 bytes (4 GB) | Very long content |

\`\`\`sql
-- Product description
description TEXT

-- Blog post content
content MEDIUMTEXT

-- Large document
document LONGTEXT
\`\`\`

---

## 3. Date and Time Types

### DATE
Stores date only (YYYY-MM-DD)

\`\`\`sql
-- Birth date
birth_date DATE

-- Order date
order_date DATE
\`\`\`

### TIME
Stores time only (HH:MM:SS)

\`\`\`sql
-- Meeting time
meeting_time TIME
\`\`\`

### DATETIME
Stores date and time (YYYY-MM-DD HH:MM:SS)
- Range: 1000-01-01 to 9999-12-31
- No timezone awareness

\`\`\`sql
-- Created timestamp
created_at DATETIME

-- Event date and time
event_datetime DATETIME
\`\`\`

### TIMESTAMP
Stores date and time with timezone
- Range: 1970-01-01 to 2038-01-19
- Automatically converts to UTC
- Auto-update on row modification

\`\`\`sql
-- Auto-updating timestamp
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

-- Auto-update on change
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
\`\`\`

### YEAR
Stores year only (1901 to 2155)

\`\`\`sql
-- Graduation year
graduation_year YEAR
\`\`\`

---

## 4. JSON Type (MySQL 5.7+)

Stores JSON documents with validation.

\`\`\`sql
-- User preferences as JSON
preferences JSON

-- Product metadata
metadata JSON
\`\`\`

**Usage:**
\`\`\`sql
-- Insert JSON
INSERT INTO users (name, preferences) VALUES
('John', '{"theme": "dark", "language": "en"}');

-- Query JSON
SELECT name, preferences->'$.theme' AS theme FROM users;
\`\`\`

---

## 5. Binary Types

### BLOB Types

| Type | Max Size | Use Case |
|------|----------|----------|
| **TINYBLOB** | 255 bytes | Small binary data |
| **BLOB** | 65,535 bytes | Images, files |
| **MEDIUMBLOB** | 16 MB | Large images |
| **LONGBLOB** | 4 GB | Very large files |

**Note:** For files, consider storing file paths instead of BLOB data.

---

## Complete Example: E-Commerce Database

\`\`\`sql
CREATE TABLE products (
    -- Integer types
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    category_id SMALLINT UNSIGNED,
    stock_quantity INT UNSIGNED DEFAULT 0,
    views_count BIGINT UNSIGNED DEFAULT 0,
    is_active TINYINT(1) DEFAULT 1,
    
    -- String types
    name VARCHAR(200) NOT NULL,
    sku CHAR(20) UNIQUE,
    description TEXT,
    full_description LONGTEXT,
    
    -- Decimal types
    price DECIMAL(10, 2) NOT NULL,
    weight DECIMAL(8, 3),
    discount_percentage DECIMAL(5, 2) DEFAULT 0.00,
    
    -- Date/Time types
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    release_date DATE,
    
    -- JSON type
    specifications JSON,
    
    -- Indexes
    INDEX idx_category (category_id),
    INDEX idx_name (name),
    INDEX idx_price (price)
);
\`\`\`

---

## Choosing the Right Type

### For IDs
\`\`\`sql
-- Primary key (auto-increment)
id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY

-- Foreign key
user_id INT UNSIGNED
\`\`\`

### For Names
\`\`\`sql
-- First name (usually short)
first_name VARCHAR(50)

-- Full name (can be longer)
full_name VARCHAR(100)

-- Company name (can be very long)
company_name VARCHAR(255)
\`\`\`

### For Money/Prices
\`\`\`sql
-- Always use DECIMAL for money
price DECIMAL(10, 2)  -- 10 digits total, 2 after decimal
total DECIMAL(12, 2)  -- For larger amounts
\`\`\`

### For Dates
\`\`\`sql
-- Date only
birth_date DATE

-- Date and time (with auto-update)
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
\`\`\`

### For Boolean
\`\`\`sql
-- Use TINYINT(1)
is_active TINYINT(1) DEFAULT 1  -- 1 = true, 0 = false
is_deleted TINYINT(1) DEFAULT 0
\`\`\`

---

## Common Mistakes

### ❌ Wrong: Using VARCHAR for Everything
\`\`\`sql
-- Bad
age VARCHAR(10)  -- Should be TINYINT
price VARCHAR(20)  -- Should be DECIMAL
\`\`\`

### ✅ Correct: Using Appropriate Types
\`\`\`sql
-- Good
age TINYINT UNSIGNED
price DECIMAL(10, 2)
\`\`\`

### ❌ Wrong: Using TEXT for Short Strings
\`\`\`sql
-- Bad (wastes space)
name TEXT  -- Should be VARCHAR
\`\`\`

### ✅ Correct: Using VARCHAR for Short Strings
\`\`\`sql
-- Good
name VARCHAR(100)
\`\`\`

---

## Summary

**Numeric Types:**
- **INT** - Most common for IDs and counts
- **DECIMAL** - For money and exact decimals
- **FLOAT/DOUBLE** - For approximate numbers

**String Types:**
- **VARCHAR** - Variable-length strings (most common)
- **CHAR** - Fixed-length strings
- **TEXT** - Long text content

**Date/Time Types:**
- **DATE** - Date only
- **DATETIME** - Date and time
- **TIMESTAMP** - Auto-updating date/time

**Special Types:**
- **JSON** - Structured data (MySQL 5.7+)
- **BLOB** - Binary data

Choose the right type for better performance and data integrity!

---

## Practice Question

**Q:** Design a table for an e-commerce product with the following fields:
- Product ID (auto-increment)
- Product name
- SKU (unique code, always 10 characters)
- Price (with 2 decimal places)
- Stock quantity
- Description (can be long)
- Created date/time (auto-set)
- Updated date/time (auto-update)
- Active status (true/false)

**Answer:**
\`\`\`sql
CREATE TABLE products (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    sku CHAR(10) UNIQUE NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    stock_quantity INT UNSIGNED DEFAULT 0,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_active TINYINT(1) DEFAULT 1
);
\`\`\`
  `,
  code: `-- MySQL Data Types Examples

-- Create database
CREATE DATABASE data_types_demo;
USE data_types_demo;

-- Example 1: Numeric Types
CREATE TABLE numeric_examples (
    -- Integer types
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    age TINYINT UNSIGNED,
    user_count INT UNSIGNED DEFAULT 0,
    total_views BIGINT UNSIGNED DEFAULT 0,
    status_code TINYINT(1) DEFAULT 1,  -- Boolean-like
    
    -- Decimal types
    price DECIMAL(10, 2) NOT NULL,
    weight DECIMAL(8, 3),
    discount DECIMAL(5, 2) DEFAULT 0.00,
    
    -- Float types
    temperature FLOAT,
    distance DOUBLE
);

-- Example 2: String Types
CREATE TABLE string_examples (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    
    -- VARCHAR (variable length)
    name VARCHAR(100),
    email VARCHAR(255),
    address VARCHAR(500),
    
    -- CHAR (fixed length)
    country_code CHAR(2),  -- 'US', 'IN', 'UK'
    status CHAR(1),  -- 'A', 'I', 'D'
    
    -- TEXT types
    short_description TINYTEXT,
    description TEXT,
    long_content MEDIUMTEXT,
    very_long_content LONGTEXT
);

-- Example 3: Date/Time Types
CREATE TABLE datetime_examples (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    
    -- DATE
    birth_date DATE,
    order_date DATE,
    
    -- TIME
    meeting_time TIME,
    
    -- DATETIME
    created_at DATETIME,
    event_datetime DATETIME,
    
    -- TIMESTAMP (auto-updating)
    created_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- YEAR
    graduation_year YEAR
);

-- Example 4: JSON Type (MySQL 5.7+)
CREATE TABLE json_examples (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    
    -- JSON data
    preferences JSON,
    metadata JSON,
    settings JSON
);

-- Insert examples
INSERT INTO numeric_examples (age, price, weight, temperature) VALUES
(25, 99.99, 1.500, 23.5),
(30, 149.50, 2.250, 25.8);

INSERT INTO string_examples (name, email, country_code, status, description) VALUES
('John Doe', 'john@example.com', 'US', 'A', 'This is a description'),
('Jane Smith', 'jane@example.com', 'UK', 'I', 'Another description');

INSERT INTO datetime_examples (birth_date, order_date, created_at) VALUES
('1990-01-15', '2024-01-20', '2024-01-20 10:30:00'),
('1985-05-22', '2024-01-21', '2024-01-21 14:45:00');

INSERT INTO json_examples (name, preferences, metadata) VALUES
('John', '{"theme": "dark", "language": "en"}', '{"version": 1, "features": ["feature1", "feature2"]}'),
('Jane', '{"theme": "light", "language": "fr"}', '{"version": 2, "features": ["feature1"]}');

-- Query examples
SELECT * FROM numeric_examples;
SELECT * FROM string_examples;
SELECT * FROM datetime_examples;

-- Query JSON
SELECT name, preferences->'$.theme' AS theme FROM json_examples;
SELECT name, JSON_EXTRACT(metadata, '$.version') AS version FROM json_examples;

-- Complete E-Commerce Example
CREATE TABLE products (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    category_id SMALLINT UNSIGNED,
    name VARCHAR(200) NOT NULL,
    sku CHAR(20) UNIQUE NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    stock_quantity INT UNSIGNED DEFAULT 0,
    description TEXT,
    is_active TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    specifications JSON
);

INSERT INTO products (category_id, name, sku, price, stock_quantity, description, specifications) VALUES
(1, 'Laptop', 'LAP-001', 999.99, 50, 'High-performance laptop', '{"cpu": "Intel i7", "ram": "16GB", "storage": "512GB SSD"}'),
(1, 'Mouse', 'MOU-001', 29.99, 100, 'Wireless mouse', '{"connectivity": "Bluetooth", "battery": "Rechargeable"}');

SELECT * FROM products;`
};

export default mysqlDataTypes;


