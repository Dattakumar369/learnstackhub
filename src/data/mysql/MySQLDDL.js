const mysqlDDL = {
  id: 'mysql-ddl',
  title: 'MySQL DDL - ALTER, DROP, TRUNCATE',
  description: 'Learn Data Definition Language: ALTER, DROP, TRUNCATE, and table modifications',
  content: `
# MySQL DDL — Data Definition Language

**DDL (Data Definition Language)** is used to define and modify database structure. It includes CREATE, ALTER, DROP, and TRUNCATE statements.

---

## DDL Commands Overview

- **CREATE** - Create database objects
- **ALTER** - Modify existing objects
- **DROP** - Delete objects
- **TRUNCATE** - Remove all data from table
- **RENAME** - Rename objects

---

## ALTER TABLE

Modify existing table structure.

### Add Column

\`\`\`sql
-- Add single column
ALTER TABLE products 
ADD COLUMN description TEXT;

-- Add multiple columns
ALTER TABLE products 
ADD COLUMN description TEXT,
ADD COLUMN category VARCHAR(50);

-- Add column with position
ALTER TABLE products 
ADD COLUMN sku VARCHAR(50) AFTER name;
\`\`\`

### Modify Column

\`\`\`sql
-- Change column data type
ALTER TABLE products 
MODIFY COLUMN price DECIMAL(12, 2);

-- Change column name and type
ALTER TABLE products 
CHANGE COLUMN old_name new_name VARCHAR(200);

-- Modify with constraints
ALTER TABLE products 
MODIFY COLUMN name VARCHAR(200) NOT NULL;
\`\`\`

### Drop Column

\`\`\`sql
-- Remove column
ALTER TABLE products 
DROP COLUMN description;
\`\`\`

### Add/Drop Constraints

\`\`\`sql
-- Add primary key
ALTER TABLE products 
ADD PRIMARY KEY (id);

-- Add foreign key
ALTER TABLE order_items 
ADD CONSTRAINT fk_product 
FOREIGN KEY (product_id) REFERENCES products(id);

-- Add unique constraint
ALTER TABLE products 
ADD CONSTRAINT uk_sku UNIQUE (sku);

-- Add check constraint (MySQL 8.0.16+)
ALTER TABLE products 
ADD CONSTRAINT chk_price CHECK (price > 0);

-- Drop constraint
ALTER TABLE products 
DROP CONSTRAINT uk_sku;

-- Drop foreign key
ALTER TABLE order_items 
DROP FOREIGN KEY fk_product;
\`\`\`

### Add/Drop Index

\`\`\`sql
-- Add index
ALTER TABLE products 
ADD INDEX idx_name (name);

-- Add unique index
ALTER TABLE products 
ADD UNIQUE INDEX idx_sku (sku);

-- Add composite index
ALTER TABLE products 
ADD INDEX idx_category_price (category, price);

-- Drop index
ALTER TABLE products 
DROP INDEX idx_name;
\`\`\`

### Rename Table

\`\`\`sql
-- Rename table
ALTER TABLE old_table_name 
RENAME TO new_table_name;

-- Or use RENAME TABLE
RENAME TABLE old_table_name TO new_table_name;
\`\`\`

---

## DROP Statement

Delete database objects permanently.

### DROP TABLE

\`\`\`sql
-- Drop single table
DROP TABLE products;

-- Drop if exists (prevents error)
DROP TABLE IF EXISTS products;

-- Drop multiple tables
DROP TABLE products, orders, customers;

-- Drop with foreign key constraints
DROP TABLE products CASCADE;  -- MySQL doesn't support CASCADE
-- Must drop foreign keys first
\`\`\`

### DROP DATABASE

\`\`\`sql
-- Drop database
DROP DATABASE my_database;

-- Drop if exists
DROP DATABASE IF EXISTS my_database;
\`\`\`

### DROP INDEX

\`\`\`sql
-- Drop index
DROP INDEX idx_name ON products;
\`\`\`

---

## TRUNCATE TABLE

Remove all rows from table (faster than DELETE).

\`\`\`sql
-- Truncate table
TRUNCATE TABLE products;

-- Truncate resets AUTO_INCREMENT
-- DELETE does not reset AUTO_INCREMENT
\`\`\`

### TRUNCATE vs DELETE

| Feature | TRUNCATE | DELETE |
|---------|----------|--------|
| Speed | Faster | Slower |
| Auto-increment | Resets | Not reset |
| WHERE clause | No | Yes |
| Rollback | No (in some engines) | Yes |
| Triggers | Not fired | Fired |

---

## Real-World Examples

### Example 1: Add Timestamp Columns

\`\`\`sql
-- Add created_at and updated_at
ALTER TABLE products 
ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;
\`\`\`

### Example 2: Modify Column Size

\`\`\`sql
-- Increase VARCHAR size
ALTER TABLE products 
MODIFY COLUMN name VARCHAR(500);

-- Decrease size (data may be truncated)
ALTER TABLE products 
MODIFY COLUMN name VARCHAR(100);
\`\`\`

### Example 3: Add Foreign Key

\`\`\`sql
-- Add foreign key with name
ALTER TABLE order_items 
ADD CONSTRAINT fk_order_items_product 
FOREIGN KEY (product_id) 
REFERENCES products(id) 
ON DELETE CASCADE 
ON UPDATE CASCADE;
\`\`\`

### Example 4: Reorganize Table

\`\`\`sql
-- Add column at specific position
ALTER TABLE products 
ADD COLUMN status VARCHAR(20) DEFAULT 'active' AFTER name;

-- Move column
ALTER TABLE products 
MODIFY COLUMN description TEXT AFTER price;
\`\`\`

---

## Best Practices

### 1. Backup Before ALTER
Always backup before major structure changes.

### 2. Test on Development First
Test ALTER statements on development database.

### 3. Use IF EXISTS
Prevent errors with IF EXISTS clause.

\`\`\`sql
DROP TABLE IF EXISTS temp_table;
\`\`\`

### 4. Consider Downtime
Large ALTER operations may lock tables.

---

## Summary

**DDL Commands:**
- **ALTER** - Modify table structure
- **DROP** - Delete objects
- **TRUNCATE** - Remove all rows

**Common Operations:**
- Add/Modify/Drop columns
- Add/Drop constraints
- Add/Drop indexes
- Rename tables

Master DDL to manage your database structure effectively!

---

## Practice Question

**Q:** Write ALTER statements to:
1. Add a 'status' column (VARCHAR(20), default 'active') after 'name'
2. Add a unique index on 'email' column
3. Add a foreign key from 'orders.customer_id' to 'customers.id'
4. Rename 'old_products' table to 'products'

**Answer:**
\`\`\`sql
-- 1. Add status column
ALTER TABLE products 
ADD COLUMN status VARCHAR(20) DEFAULT 'active' AFTER name;

-- 2. Add unique index
ALTER TABLE customers 
ADD UNIQUE INDEX idx_email (email);

-- 3. Add foreign key
ALTER TABLE orders 
ADD CONSTRAINT fk_orders_customer 
FOREIGN KEY (customer_id) REFERENCES customers(id);

-- 4. Rename table
ALTER TABLE old_products RENAME TO products;
\`\`\`
  `,
  code: `-- MySQL DDL Examples

CREATE DATABASE ddl_demo;
USE ddl_demo;

-- Create initial table
CREATE TABLE products (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    price DECIMAL(10, 2) NOT NULL
);

-- ========== ALTER TABLE - Add Column ==========

-- Add single column
ALTER TABLE products 
ADD COLUMN description TEXT;

-- Add multiple columns
ALTER TABLE products 
ADD COLUMN category VARCHAR(50),
ADD COLUMN stock INT UNSIGNED DEFAULT 0;

-- Add column at specific position
ALTER TABLE products 
ADD COLUMN sku VARCHAR(50) AFTER name;

-- ========== ALTER TABLE - Modify Column ==========

-- Change column data type
ALTER TABLE products 
MODIFY COLUMN price DECIMAL(12, 2);

-- Change column name and type
ALTER TABLE products 
CHANGE COLUMN description product_description TEXT;

-- Modify with constraints
ALTER TABLE products 
MODIFY COLUMN name VARCHAR(200) NOT NULL;

-- ========== ALTER TABLE - Drop Column ==========

-- Remove column
ALTER TABLE products 
DROP COLUMN product_description;

-- ========== ALTER TABLE - Constraints ==========

-- Add primary key (if not exists)
-- ALTER TABLE products ADD PRIMARY KEY (id);

-- Add foreign key
CREATE TABLE orders (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    customer_id INT UNSIGNED,
    total_amount DECIMAL(10, 2)
);

CREATE TABLE customers (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100)
);

ALTER TABLE orders 
ADD CONSTRAINT fk_orders_customer 
FOREIGN KEY (customer_id) REFERENCES customers(id);

-- Add unique constraint
ALTER TABLE products 
ADD CONSTRAINT uk_sku UNIQUE (sku);

-- Add check constraint (MySQL 8.0.16+)
ALTER TABLE products 
ADD CONSTRAINT chk_price CHECK (price > 0);

-- Drop constraint
ALTER TABLE products 
DROP CONSTRAINT uk_sku;

-- Drop foreign key
ALTER TABLE orders 
DROP FOREIGN KEY fk_orders_customer;

-- ========== ALTER TABLE - Indexes ==========

-- Add index
ALTER TABLE products 
ADD INDEX idx_name (name);

-- Add unique index
ALTER TABLE products 
ADD UNIQUE INDEX idx_sku (sku);

-- Add composite index
ALTER TABLE products 
ADD INDEX idx_category_price (category, price);

-- Drop index
ALTER TABLE products 
DROP INDEX idx_name;

-- ========== ALTER TABLE - Rename ==========

-- Rename table
ALTER TABLE products RENAME TO product_items;

-- Or use RENAME TABLE
RENAME TABLE product_items TO products;

-- ========== DROP Statement ==========

-- Drop table
DROP TABLE IF EXISTS temp_table;

-- Drop multiple tables
-- DROP TABLE table1, table2, table3;

-- Drop database
-- DROP DATABASE IF EXISTS test_db;

-- Drop index
DROP INDEX idx_sku ON products;

-- ========== TRUNCATE TABLE ==========

-- Truncate table (removes all rows)
TRUNCATE TABLE products;

-- TRUNCATE vs DELETE
-- TRUNCATE: Faster, resets AUTO_INCREMENT, no WHERE clause
-- DELETE: Slower, doesn't reset AUTO_INCREMENT, supports WHERE

-- ========== Real-World Examples ==========

-- Add timestamp columns
ALTER TABLE products 
ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;

-- Increase column size
ALTER TABLE products 
MODIFY COLUMN name VARCHAR(500);

-- Add status column
ALTER TABLE products 
ADD COLUMN status VARCHAR(20) DEFAULT 'active' AFTER name;

-- Add foreign key with CASCADE
ALTER TABLE orders 
ADD CONSTRAINT fk_orders_customer 
FOREIGN KEY (customer_id) 
REFERENCES customers(id) 
ON DELETE CASCADE 
ON UPDATE CASCADE;`
};

export default mysqlDDL;


