const mysqlDQL = {
  id: 'mysql-dql',
  title: 'MySQL DQL - Data Query Language (SELECT)',
  description: 'Complete guide to SELECT statement: DQL operations, filtering, sorting, and querying data',
  content: `
# MySQL DQL — Data Query Language

**DQL (Data Query Language)** is used to retrieve data from databases. The primary DQL command is **SELECT**.

---

## What is DQL?

DQL includes:
- **SELECT** - Retrieve data from tables
- Query operations
- Data filtering and sorting
- Aggregations and grouping

**Note:** SELECT is often categorized separately from DML because it doesn't modify data.

---

## Basic SELECT Syntax

\`\`\`sql
SELECT column1, column2, ...
FROM table_name
WHERE condition
GROUP BY column
HAVING condition
ORDER BY column
LIMIT number;
\`\`\`

---

## SELECT All Columns

\`\`\`sql
-- Select all columns
SELECT * FROM products;

-- Select specific columns
SELECT id, name, price FROM products;
\`\`\`

---

## SELECT with WHERE

Filter rows based on conditions.

\`\`\`sql
-- Simple condition
SELECT * FROM products WHERE price > 100;

-- Multiple conditions
SELECT * FROM products 
WHERE price > 100 AND stock > 0;

-- Pattern matching
SELECT * FROM products WHERE name LIKE '%laptop%';
\`\`\`

---

## SELECT with DISTINCT

Remove duplicate rows.

\`\`\`sql
-- Distinct values
SELECT DISTINCT category FROM products;

-- Distinct combinations
SELECT DISTINCT category, price FROM products;
\`\`\`

---

## SELECT with ORDER BY

Sort results.

\`\`\`sql
-- Ascending order (default)
SELECT * FROM products ORDER BY price;

-- Descending order
SELECT * FROM products ORDER BY price DESC;

-- Multiple columns
SELECT * FROM products ORDER BY category, price DESC;

-- Using column position
SELECT * FROM products ORDER BY 3 DESC;  -- Sort by 3rd column
\`\`\`

---

## SELECT with LIMIT

Limit number of rows returned.

\`\`\`sql
-- Limit rows
SELECT * FROM products LIMIT 10;

-- Limit with offset
SELECT * FROM products LIMIT 10 OFFSET 20;
-- Or
SELECT * FROM products LIMIT 20, 10;  -- Skip 20, take 10
\`\`\`

---

## SELECT with GROUP BY

Group rows by column values.

\`\`\`sql
-- Group by category
SELECT category, COUNT(*) AS count
FROM products
GROUP BY category;

-- Group with aggregate functions
SELECT 
    category,
    COUNT(*) AS product_count,
    AVG(price) AS avg_price,
    SUM(stock) AS total_stock
FROM products
GROUP BY category;
\`\`\`

---

## SELECT with HAVING

Filter groups (used with GROUP BY).

\`\`\`sql
-- Filter groups
SELECT category, COUNT(*) AS count
FROM products
GROUP BY category
HAVING COUNT(*) > 5;

-- HAVING vs WHERE
-- WHERE filters rows before grouping
-- HAVING filters groups after grouping
\`\`\`

---

## SELECT with Aliases

Use aliases for columns and tables.

\`\`\`sql
-- Column alias
SELECT 
    name AS product_name,
    price AS product_price
FROM products;

-- Table alias
SELECT p.name, p.price
FROM products p
WHERE p.price > 100;
\`\`\`

---

## SELECT with Expressions

Calculate values in SELECT.

\`\`\`sql
-- Calculate total
SELECT 
    name,
    price,
    quantity,
    price * quantity AS total
FROM order_items;

-- Use functions
SELECT 
    name,
    UPPER(name) AS name_upper,
    ROUND(price, 2) AS price_rounded
FROM products;
\`\`\`

---

## SELECT with CASE

Conditional logic in SELECT.

\`\`\`sql
SELECT 
    name,
    price,
    CASE
        WHEN price > 500 THEN 'Expensive'
        WHEN price > 100 THEN 'Moderate'
        ELSE 'Cheap'
    END AS price_category
FROM products;
\`\`\`

---

## Real-World Examples

### Example 1: Top Products by Sales

\`\`\`sql
SELECT 
    p.name,
    SUM(oi.quantity) AS total_sold,
    SUM(oi.quantity * oi.price) AS total_revenue
FROM products p
JOIN order_items oi ON p.id = oi.product_id
GROUP BY p.id, p.name
ORDER BY total_revenue DESC
LIMIT 10;
\`\`\`

### Example 2: Customer Order Summary

\`\`\`sql
SELECT 
    c.name AS customer_name,
    COUNT(o.id) AS order_count,
    SUM(o.total_amount) AS total_spent,
    AVG(o.total_amount) AS avg_order_value
FROM customers c
LEFT JOIN orders o ON c.id = o.customer_id
GROUP BY c.id, c.name
HAVING total_spent > 1000
ORDER BY total_spent DESC;
\`\`\`

### Example 3: Monthly Sales Report

\`\`\`sql
SELECT 
    DATE_FORMAT(order_date, '%Y-%m') AS month,
    COUNT(*) AS order_count,
    SUM(total_amount) AS total_revenue,
    AVG(total_amount) AS avg_order_value
FROM orders
WHERE status = 'completed'
GROUP BY DATE_FORMAT(order_date, '%Y-%m')
ORDER BY month DESC;
\`\`\`

---

## DQL vs DML

| Feature | DQL (SELECT) | DML (INSERT/UPDATE/DELETE) |
|---------|--------------|----------------------------|
| Purpose | Retrieve data | Modify data |
| Data Change | No | Yes |
| Transactions | Read-only | Write operations |
| Locks | Shared locks | Exclusive locks |

---

## Best Practices

### 1. Select Only Needed Columns
\`\`\`sql
-- Good
SELECT id, name, price FROM products;

-- Avoid (unless needed)
SELECT * FROM products;
\`\`\`

### 2. Use WHERE to Filter Early
Filter at database level, not in application.

### 3. Use Indexes
Index columns used in WHERE, JOIN, ORDER BY.

### 4. Limit Results
Use LIMIT to prevent large result sets.

---

## Summary

DQL (Data Query Language) includes:
- **SELECT** - Primary query command
- **Filtering** - WHERE, HAVING
- **Sorting** - ORDER BY
- **Grouping** - GROUP BY
- **Limiting** - LIMIT

**Key Points:**
- SELECT retrieves data (doesn't modify)
- Use WHERE for row filtering
- Use HAVING for group filtering
- Use indexes for performance

Master DQL to efficiently retrieve and analyze data!

---

## Practice Question

**Q:** Write a SELECT query to find:
1. Top 5 customers by total spending
2. Products with price above average
3. Categories with more than 10 products

**Answer:**
\`\`\`sql
-- 1. Top 5 customers
SELECT 
    c.name,
    SUM(o.total_amount) AS total_spent
FROM customers c
JOIN orders o ON c.id = o.customer_id
GROUP BY c.id, c.name
ORDER BY total_spent DESC
LIMIT 5;

-- 2. Products above average price
SELECT * FROM products
WHERE price > (SELECT AVG(price) FROM products);

-- 3. Categories with > 10 products
SELECT category, COUNT(*) AS product_count
FROM products
GROUP BY category
HAVING COUNT(*) > 10;
\`\`\`
  `,
  code: `-- MySQL DQL Examples

CREATE DATABASE dql_demo;
USE dql_demo;

CREATE TABLE products (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    category VARCHAR(50),
    stock INT UNSIGNED DEFAULT 0
);

CREATE TABLE customers (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE
);

CREATE TABLE orders (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    customer_id INT UNSIGNED,
    order_date DATE NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending',
    FOREIGN KEY (customer_id) REFERENCES customers(id)
);

CREATE TABLE order_items (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    order_id INT UNSIGNED,
    product_id INT UNSIGNED,
    quantity INT UNSIGNED NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Insert sample data
INSERT INTO products (name, price, category, stock) VALUES
('Laptop', 999.99, 'Electronics', 50),
('Mouse', 29.99, 'Electronics', 100),
('Keyboard', 79.99, 'Electronics', 75),
('Desk', 199.99, 'Furniture', 30);

INSERT INTO customers (name, email) VALUES
('John Doe', 'john@example.com'),
('Jane Smith', 'jane@example.com');

INSERT INTO orders (customer_id, order_date, total_amount, status) VALUES
(1, '2024-01-15', 999.99, 'completed'),
(2, '2024-01-16', 109.98, 'completed');

-- ========== Basic SELECT ==========

-- Select all columns
SELECT * FROM products;

-- Select specific columns
SELECT id, name, price FROM products;

-- ========== SELECT with WHERE ==========

-- Simple condition
SELECT * FROM products WHERE price > 100;

-- Multiple conditions
SELECT * FROM products WHERE price > 100 AND stock > 0;

-- Pattern matching
SELECT * FROM products WHERE name LIKE '%laptop%';

-- ========== SELECT with DISTINCT ==========

-- Distinct values
SELECT DISTINCT category FROM products;

-- ========== SELECT with ORDER BY ==========

-- Ascending (default)
SELECT * FROM products ORDER BY price;

-- Descending
SELECT * FROM products ORDER BY price DESC;

-- Multiple columns
SELECT * FROM products ORDER BY category, price DESC;

-- ========== SELECT with LIMIT ==========

-- Limit rows
SELECT * FROM products LIMIT 10;

-- Limit with offset
SELECT * FROM products LIMIT 10 OFFSET 0;
SELECT * FROM products LIMIT 0, 10;  -- Same as above

-- ========== SELECT with GROUP BY ==========

-- Group by category
SELECT category, COUNT(*) AS count
FROM products
GROUP BY category;

-- Group with aggregates
SELECT 
    category,
    COUNT(*) AS product_count,
    AVG(price) AS avg_price,
    SUM(stock) AS total_stock
FROM products
GROUP BY category;

-- ========== SELECT with HAVING ==========

-- Filter groups
SELECT category, COUNT(*) AS count
FROM products
GROUP BY category
HAVING COUNT(*) > 1;

-- ========== SELECT with Aliases ==========

-- Column alias
SELECT 
    name AS product_name,
    price AS product_price
FROM products;

-- Table alias
SELECT p.name, p.price
FROM products p
WHERE p.price > 100;

-- ========== SELECT with Expressions ==========

-- Calculate total
SELECT 
    name,
    price,
    stock,
    price * stock AS total_value
FROM products;

-- Use functions
SELECT 
    name,
    UPPER(name) AS name_upper,
    ROUND(price, 2) AS price_rounded
FROM products;

-- ========== SELECT with CASE ==========

SELECT 
    name,
    price,
    CASE
        WHEN price > 500 THEN 'Expensive'
        WHEN price > 100 THEN 'Moderate'
        ELSE 'Cheap'
    END AS price_category
FROM products;

-- ========== Real-World Examples ==========

-- Top products by stock value
SELECT 
    name,
    price,
    stock,
    price * stock AS total_value
FROM products
ORDER BY total_value DESC
LIMIT 5;

-- Customer order summary
SELECT 
    c.name AS customer_name,
    COUNT(o.id) AS order_count,
    COALESCE(SUM(o.total_amount), 0) AS total_spent
FROM customers c
LEFT JOIN orders o ON c.id = o.customer_id
GROUP BY c.id, c.name;

-- Products above average price
SELECT * FROM products
WHERE price > (SELECT AVG(price) FROM products);

-- Categories with multiple products
SELECT category, COUNT(*) AS product_count
FROM products
GROUP BY category
HAVING COUNT(*) > 1;`
};

export default mysqlDQL;


