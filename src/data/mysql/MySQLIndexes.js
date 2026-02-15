const mysqlIndexes = {
  id: 'mysql-indexes',
  title: 'MySQL Indexes - Performance Optimization',
  description: 'Learn about indexes: types, creation, optimization, and best practices for query performance',
  content: `
# MySQL Indexes — Performance Optimization

**Indexes** are data structures that improve the speed of data retrieval operations. They're essential for optimizing database performance.

---

## What are Indexes?

An **index** is like a book's index:
- Points to data location
- Speeds up SELECT queries
- Slows down INSERT/UPDATE/DELETE (trade-off)

---

## Types of Indexes

### 1. Primary Key Index
Automatically created for PRIMARY KEY.

\`\`\`sql
-- Primary key automatically creates index
CREATE TABLE products (
    id INT PRIMARY KEY,  -- Index created automatically
    name VARCHAR(200)
);
\`\`\`

### 2. Unique Index
Ensures unique values, speeds up lookups.

\`\`\`sql
-- Create unique index
CREATE UNIQUE INDEX idx_email ON users(email);

-- Or in table definition
CREATE TABLE users (
    id INT PRIMARY KEY,
    email VARCHAR(255),
    UNIQUE INDEX idx_email (email)
);
\`\`\`

### 3. Regular Index (Non-Unique)
Most common type, speeds up queries.

\`\`\`sql
-- Create index
CREATE INDEX idx_name ON products(name);

-- Composite index
CREATE INDEX idx_category_price ON products(category, price);
\`\`\`

### 4. Full-Text Index
For full-text searches (MyISAM, InnoDB 5.6+).

\`\`\`sql
-- Create full-text index
CREATE FULLTEXT INDEX idx_description ON products(description);

-- Use in queries
SELECT * FROM products 
WHERE MATCH(description) AGAINST('laptop' IN NATURAL LANGUAGE MODE);
\`\`\`

### 5. Spatial Index
For geographic data (GEOMETRY columns).

\`\`\`sql
-- Create spatial index
CREATE SPATIAL INDEX idx_location ON places(location);
\`\`\`

---

## Creating Indexes

### CREATE INDEX

\`\`\`sql
-- Single column index
CREATE INDEX idx_name ON products(name);

-- Composite index (multiple columns)
CREATE INDEX idx_category_price ON products(category, price);

-- Index with prefix length
CREATE INDEX idx_name_prefix ON products(name(10));
\`\`\`

### CREATE INDEX with ALTER TABLE

\`\`\`sql
-- Add index
ALTER TABLE products ADD INDEX idx_name (name);

-- Add unique index
ALTER TABLE products ADD UNIQUE INDEX idx_sku (sku);

-- Add composite index
ALTER TABLE products ADD INDEX idx_category_price (category, price);
\`\`\`

### CREATE INDEX in Table Definition

\`\`\`sql
CREATE TABLE products (
    id INT PRIMARY KEY,
    name VARCHAR(200),
    category VARCHAR(50),
    price DECIMAL(10, 2),
    INDEX idx_name (name),
    INDEX idx_category (category),
    INDEX idx_category_price (category, price)
);
\`\`\`

---

## Dropping Indexes

\`\`\`sql
-- Drop index
DROP INDEX idx_name ON products;

-- Or with ALTER TABLE
ALTER TABLE products DROP INDEX idx_name;
\`\`\`

---

## Viewing Indexes

\`\`\`sql
-- Show indexes for table
SHOW INDEX FROM products;

-- Show indexes with details
SHOW INDEX FROM products FROM database_name;

-- Query information schema
SELECT 
    INDEX_NAME,
    COLUMN_NAME,
    SEQ_IN_INDEX,
    NON_UNIQUE
FROM INFORMATION_SCHEMA.STATISTICS
WHERE TABLE_SCHEMA = 'database_name'
AND TABLE_NAME = 'products';
\`\`\`

---

## Index Usage

### When Indexes are Used

Indexes are used for:
- **WHERE clauses** - Filtering rows
- **JOIN conditions** - Joining tables
- **ORDER BY** - Sorting results
- **GROUP BY** - Grouping data

\`\`\`sql
-- Index used for WHERE
SELECT * FROM products WHERE name = 'Laptop';  -- Uses idx_name

-- Index used for JOIN
SELECT * FROM products p
JOIN categories c ON p.category_id = c.id;  -- Uses index on category_id

-- Index used for ORDER BY
SELECT * FROM products ORDER BY name;  -- Uses idx_name
\`\`\`

### EXPLAIN to Check Index Usage

\`\`\`sql
-- Check if index is used
EXPLAIN SELECT * FROM products WHERE name = 'Laptop';

-- Look for:
-- key: Index name used
-- rows: Number of rows examined
-- type: ALL = no index, ref/index = index used
\`\`\`

---

## Composite Indexes

Index on multiple columns.

### Column Order Matters

\`\`\`sql
-- Composite index
CREATE INDEX idx_category_price ON products(category, price);

-- This index helps:
SELECT * FROM products WHERE category = 'Electronics';
SELECT * FROM products WHERE category = 'Electronics' AND price > 100;

-- But NOT this:
SELECT * FROM products WHERE price > 100;  -- Can't use index efficiently
\`\`\`

### Best Practices for Composite Indexes

1. **Most selective column first**
\`\`\`sql
-- Good: category is more selective
CREATE INDEX idx_category_price ON products(category, price);

-- Less optimal: price first
CREATE INDEX idx_price_category ON products(price, category);
\`\`\`

2. **Leftmost prefix rule**
\`\`\`sql
-- Index on (a, b, c) can be used for:
-- WHERE a = ?
-- WHERE a = ? AND b = ?
-- WHERE a = ? AND b = ? AND c = ?
-- But NOT: WHERE b = ? or WHERE c = ?
\`\`\`

---

## Index Performance

### Benefits
- ✅ Faster SELECT queries
- ✅ Faster JOINs
- ✅ Faster ORDER BY
- ✅ Enforces uniqueness

### Costs
- ❌ Slower INSERT/UPDATE/DELETE
- ❌ Additional storage space
- ❌ Maintenance overhead

---

## Real-World Examples

### Example 1: E-Commerce Products

\`\`\`sql
-- Products table with indexes
CREATE TABLE products (
    id INT PRIMARY KEY,
    sku VARCHAR(50) UNIQUE,
    name VARCHAR(200),
    category VARCHAR(50),
    price DECIMAL(10, 2),
    stock INT,
    created_at TIMESTAMP,
    INDEX idx_name (name),
    INDEX idx_category (category),
    INDEX idx_price (price),
    INDEX idx_category_price (category, price),
    INDEX idx_created (created_at)
);

-- Common queries will use indexes:
-- Search by name
SELECT * FROM products WHERE name LIKE '%laptop%';

-- Filter by category and price
SELECT * FROM products WHERE category = 'Electronics' AND price < 500;

-- Sort by date
SELECT * FROM products ORDER BY created_at DESC LIMIT 10;
\`\`\`

### Example 2: User Orders

\`\`\`sql
-- Orders table
CREATE TABLE orders (
    id INT PRIMARY KEY,
    user_id INT,
    order_date DATE,
    status VARCHAR(20),
    total_amount DECIMAL(10, 2),
    INDEX idx_user_id (user_id),
    INDEX idx_order_date (order_date),
    INDEX idx_status (status),
    INDEX idx_user_date (user_id, order_date)
);

-- Efficient queries:
-- User's orders
SELECT * FROM orders WHERE user_id = 123;

-- User's recent orders
SELECT * FROM orders WHERE user_id = 123 ORDER BY order_date DESC;

-- Orders by status
SELECT * FROM orders WHERE status = 'pending';
\`\`\`

---

## Best Practices

### 1. Index Columns in WHERE
\`\`\`sql
-- If you frequently query:
SELECT * FROM products WHERE category = 'Electronics';
-- Then index:
CREATE INDEX idx_category ON products(category);
\`\`\`

### 2. Index Foreign Keys
\`\`\`sql
-- Foreign keys should be indexed
CREATE TABLE order_items (
    order_id INT,
    product_id INT,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id),
    INDEX idx_order_id (order_id),
    INDEX idx_product_id (product_id)
);
\`\`\`

### 3. Don't Over-Index
Too many indexes slow down writes.

### 4. Use EXPLAIN
Check if indexes are actually used.

### 5. Monitor Index Usage
\`\`\`sql
-- Check index usage statistics
SELECT 
    OBJECT_SCHEMA,
    OBJECT_NAME,
    INDEX_NAME,
    COUNT_FETCH,
    COUNT_INSERT,
    COUNT_UPDATE,
    COUNT_DELETE
FROM performance_schema.table_io_waits_summary_by_index_usage
WHERE OBJECT_SCHEMA = 'your_database';
\`\`\`

---

## Summary

**Index Types:**
- Primary Key (automatic)
- Unique Index
- Regular Index
- Full-Text Index
- Spatial Index

**Key Points:**
- Indexes speed up SELECT queries
- Slow down INSERT/UPDATE/DELETE
- Composite indexes: column order matters
- Use EXPLAIN to verify index usage

Master indexes to optimize database performance!

---

## Practice Question

**Q:** Create indexes for a products table that will optimize:
1. Searching by product name
2. Filtering by category and price range
3. Sorting by creation date
4. Joining with categories table

**Answer:**
\`\`\`sql
CREATE TABLE products (
    id INT PRIMARY KEY,
    name VARCHAR(200),
    category_id INT,
    price DECIMAL(10, 2),
    created_at TIMESTAMP,
    INDEX idx_name (name),
    INDEX idx_category_price (category_id, price),
    INDEX idx_created (created_at),
    INDEX idx_category_id (category_id),
    FOREIGN KEY (category_id) REFERENCES categories(id)
);
\`\`\`
  `,
  code: `-- MySQL Indexes Examples

CREATE DATABASE indexes_demo;
USE indexes_demo;

-- ========== Primary Key Index ==========

-- Primary key automatically creates index
CREATE TABLE products (
    id INT PRIMARY KEY,
    name VARCHAR(200)
);

-- ========== Unique Index ==========

CREATE TABLE users (
    id INT PRIMARY KEY,
    email VARCHAR(255),
    username VARCHAR(50)
);

-- Create unique index
CREATE UNIQUE INDEX idx_email ON users(email);

-- Or in table definition
CREATE TABLE users2 (
    id INT PRIMARY KEY,
    email VARCHAR(255),
    UNIQUE INDEX idx_email (email)
);

-- ========== Regular Index ==========

-- Single column index
CREATE INDEX idx_name ON products(name);

-- Composite index
CREATE INDEX idx_category_price ON products(category, price);

-- Index with prefix
CREATE INDEX idx_name_prefix ON products(name(10));

-- ========== Full-Text Index ==========

CREATE TABLE articles (
    id INT PRIMARY KEY,
    title VARCHAR(200),
    content TEXT,
    FULLTEXT INDEX idx_content (content)
);

-- Use full-text search
SELECT * FROM articles 
WHERE MATCH(content) AGAINST('laptop' IN NATURAL LANGUAGE MODE);

-- ========== Creating Indexes ==========

-- CREATE INDEX
CREATE INDEX idx_name ON products(name);
CREATE INDEX idx_category_price ON products(category, price);

-- ALTER TABLE
ALTER TABLE products ADD INDEX idx_name (name);
ALTER TABLE products ADD UNIQUE INDEX idx_sku (sku);
ALTER TABLE products ADD INDEX idx_category_price (category, price);

-- In table definition
CREATE TABLE products2 (
    id INT PRIMARY KEY,
    name VARCHAR(200),
    category VARCHAR(50),
    price DECIMAL(10, 2),
    INDEX idx_name (name),
    INDEX idx_category (category),
    INDEX idx_category_price (category, price)
);

-- ========== Dropping Indexes ==========

-- Drop index
DROP INDEX idx_name ON products;

-- Or with ALTER TABLE
ALTER TABLE products DROP INDEX idx_name;

-- ========== Viewing Indexes ==========

-- Show indexes
SHOW INDEX FROM products;

-- Query information schema
SELECT 
    INDEX_NAME,
    COLUMN_NAME,
    SEQ_IN_INDEX,
    NON_UNIQUE
FROM INFORMATION_SCHEMA.STATISTICS
WHERE TABLE_SCHEMA = 'indexes_demo'
AND TABLE_NAME = 'products';

-- ========== Index Usage ==========

-- Check index usage with EXPLAIN
EXPLAIN SELECT * FROM products WHERE name = 'Laptop';

-- Index used for WHERE
SELECT * FROM products WHERE name = 'Laptop';

-- Index used for ORDER BY
SELECT * FROM products ORDER BY name;

-- Index used for JOIN
SELECT * FROM products p
JOIN categories c ON p.category_id = c.id;

-- ========== Composite Indexes ==========

-- Composite index
CREATE INDEX idx_category_price ON products(category, price);

-- This helps:
SELECT * FROM products WHERE category = 'Electronics';
SELECT * FROM products WHERE category = 'Electronics' AND price > 100;

-- This doesn't use index efficiently:
-- SELECT * FROM products WHERE price > 100;

-- ========== Real-World Example ==========

CREATE TABLE products (
    id INT PRIMARY KEY,
    sku VARCHAR(50) UNIQUE,
    name VARCHAR(200),
    category VARCHAR(50),
    price DECIMAL(10, 2),
    stock INT,
    created_at TIMESTAMP,
    INDEX idx_name (name),
    INDEX idx_category (category),
    INDEX idx_price (price),
    INDEX idx_category_price (category, price),
    INDEX idx_created (created_at)
);

-- Optimized queries
SELECT * FROM products WHERE name LIKE '%laptop%';
SELECT * FROM products WHERE category = 'Electronics' AND price < 500;
SELECT * FROM products ORDER BY created_at DESC LIMIT 10;

-- ========== Foreign Key Indexes ==========

CREATE TABLE orders (
    id INT PRIMARY KEY,
    customer_id INT,
    order_date DATE,
    INDEX idx_customer_id (customer_id),
    FOREIGN KEY (customer_id) REFERENCES customers(id)
);

CREATE TABLE order_items (
    id INT PRIMARY KEY,
    order_id INT,
    product_id INT,
    INDEX idx_order_id (order_id),
    INDEX idx_product_id (product_id),
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);`
};

export default mysqlIndexes;

