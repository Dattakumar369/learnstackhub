const mysqlClauses = {
  id: 'mysql-clauses',
  title: 'MySQL Clauses - WHERE, GROUP BY, HAVING, ORDER BY, LIMIT',
  description: 'Master all SQL clauses: WHERE, GROUP BY, HAVING, ORDER BY, LIMIT for powerful data querying',
  content: `
# MySQL Clauses — Powerful Query Building Blocks

SQL clauses are components of SELECT statements that control how data is filtered, grouped, sorted, and limited.

---

## SQL Clause Order

The correct order of clauses in a SELECT statement:

\`\`\`sql
SELECT      -- 1. What columns to retrieve
FROM        -- 2. Which tables
WHERE       -- 3. Filter rows
GROUP BY    -- 4. Group rows
HAVING      -- 5. Filter groups
ORDER BY    -- 6. Sort results
LIMIT       -- 7. Limit rows
\`\`\`

---

## WHERE Clause

Filters rows before grouping and aggregation.

### Basic WHERE

\`\`\`sql
-- Simple condition
SELECT * FROM products WHERE price > 100;

-- Multiple conditions with AND
SELECT * FROM products 
WHERE price > 100 AND stock > 0;

-- Multiple conditions with OR
SELECT * FROM products 
WHERE category = 'Electronics' OR category = 'Furniture';

-- Combining AND and OR
SELECT * FROM products 
WHERE (category = 'Electronics' OR category = 'Furniture') 
AND price < 500;
\`\`\`

### WHERE with Comparison Operators

\`\`\`sql
-- Equal
SELECT * FROM products WHERE price = 99.99;

-- Not equal
SELECT * FROM products WHERE price != 100;
SELECT * FROM products WHERE price <> 100;

-- Greater than
SELECT * FROM products WHERE price > 100;

-- Less than
SELECT * FROM products WHERE price < 100;

-- Greater than or equal
SELECT * FROM products WHERE price >= 100;

-- Less than or equal
SELECT * FROM products WHERE price <= 100;
\`\`\`

### WHERE with IN

\`\`\`sql
-- Match any value in list
SELECT * FROM products 
WHERE category IN ('Electronics', 'Furniture', 'Books');

-- NOT IN
SELECT * FROM products 
WHERE category NOT IN ('Electronics', 'Furniture');
\`\`\`

### WHERE with BETWEEN

\`\`\`sql
-- Range (inclusive)
SELECT * FROM products 
WHERE price BETWEEN 50 AND 200;

-- NOT BETWEEN
SELECT * FROM products 
WHERE price NOT BETWEEN 50 AND 200;

-- Date range
SELECT * FROM orders 
WHERE order_date BETWEEN '2024-01-01' AND '2024-01-31';
\`\`\`

### WHERE with LIKE

\`\`\`sql
-- Pattern matching
SELECT * FROM products WHERE name LIKE '%laptop%';

-- Starts with
SELECT * FROM products WHERE name LIKE 'Laptop%';

-- Ends with
SELECT * FROM products WHERE name LIKE '%Pro';

-- Single character
SELECT * FROM products WHERE name LIKE 'Lap_op';

-- NOT LIKE
SELECT * FROM products WHERE name NOT LIKE '%test%';
\`\`\`

### WHERE with IS NULL / IS NOT NULL

\`\`\`sql
-- Check for NULL
SELECT * FROM products WHERE description IS NULL;

-- Check for NOT NULL
SELECT * FROM products WHERE description IS NOT NULL;
\`\`\`

---

## GROUP BY Clause

Groups rows that have the same values in specified columns.

\`\`\`sql
-- Group by single column
SELECT category, COUNT(*) AS count
FROM products
GROUP BY category;

-- Group by multiple columns
SELECT category, status, COUNT(*) AS count
FROM products
GROUP BY category, status;

-- Group with aggregate functions
SELECT 
    category,
    COUNT(*) AS product_count,
    AVG(price) AS avg_price,
    MAX(price) AS max_price,
    MIN(price) AS min_price,
    SUM(stock) AS total_stock
FROM products
GROUP BY category;
\`\`\`

### GROUP BY with Expressions

\`\`\`sql
-- Group by expression
SELECT 
    DATE_FORMAT(order_date, '%Y-%m') AS month,
    COUNT(*) AS order_count,
    SUM(total_amount) AS total_revenue
FROM orders
GROUP BY DATE_FORMAT(order_date, '%Y-%m');
\`\`\`

---

## HAVING Clause

Filters groups after GROUP BY (similar to WHERE but for groups).

\`\`\`sql
-- Filter groups
SELECT category, COUNT(*) AS count
FROM products
GROUP BY category
HAVING COUNT(*) > 5;

-- HAVING with aggregate functions
SELECT 
    category,
    AVG(price) AS avg_price
FROM products
GROUP BY category
HAVING AVG(price) > 100;
\`\`\`

### WHERE vs HAVING

| Feature | WHERE | HAVING |
|---------|-------|--------|
| Applied to | Rows | Groups |
| Used with | All SELECT statements | Only with GROUP BY |
| Aggregate functions | Cannot use | Can use |
| Execution order | Before grouping | After grouping |

\`\`\`sql
-- WHERE filters rows, HAVING filters groups
SELECT 
    category,
    COUNT(*) AS count,
    AVG(price) AS avg_price
FROM products
WHERE stock > 0          -- Filter rows first
GROUP BY category
HAVING COUNT(*) > 3      -- Filter groups after
AND AVG(price) > 50;    -- Can use aggregates in HAVING
\`\`\`

---

## ORDER BY Clause

Sorts the result set.

\`\`\`sql
-- Ascending (default)
SELECT * FROM products ORDER BY price;

-- Descending
SELECT * FROM products ORDER BY price DESC;

-- Multiple columns
SELECT * FROM products 
ORDER BY category, price DESC;

-- Using column position
SELECT * FROM products ORDER BY 3 DESC;  -- Sort by 3rd column

-- Using expressions
SELECT 
    name,
    price * stock AS total_value
FROM products
ORDER BY total_value DESC;
\`\`\`

### ORDER BY with NULL Values

\`\`\`sql
-- NULLS FIRST (MySQL default)
SELECT * FROM products ORDER BY description;

-- NULLS LAST (MySQL 8.0+)
SELECT * FROM products ORDER BY description IS NULL, description;
\`\`\`

---

## LIMIT Clause

Limits the number of rows returned.

\`\`\`sql
-- Limit rows
SELECT * FROM products LIMIT 10;

-- Limit with offset
SELECT * FROM products LIMIT 10 OFFSET 20;

-- Alternative syntax
SELECT * FROM products LIMIT 20, 10;  -- Skip 20, take 10

-- Top N records
SELECT * FROM products 
ORDER BY price DESC 
LIMIT 5;
\`\`\`

### LIMIT for Pagination

\`\`\`sql
-- Page 1 (rows 1-10)
SELECT * FROM products LIMIT 0, 10;

-- Page 2 (rows 11-20)
SELECT * FROM products LIMIT 10, 10;

-- Page 3 (rows 21-30)
SELECT * FROM products LIMIT 20, 10;

-- General formula: LIMIT (page - 1) * page_size, page_size
\`\`\`

---

## Complete Example

\`\`\`sql
SELECT 
    category,
    COUNT(*) AS product_count,
    AVG(price) AS avg_price,
    SUM(stock) AS total_stock
FROM products
WHERE stock > 0              -- Filter rows
AND price > 10              -- More row filtering
GROUP BY category            -- Group by category
HAVING COUNT(*) > 2         -- Filter groups
AND AVG(price) > 50        -- More group filtering
ORDER BY avg_price DESC     -- Sort results
LIMIT 10;                   -- Limit to 10 rows
\`\`\`

---

## Real-World Examples

### Example 1: Top Categories by Revenue

\`\`\`sql
SELECT 
    p.category,
    COUNT(DISTINCT oi.order_id) AS order_count,
    SUM(oi.quantity * oi.price) AS total_revenue
FROM products p
JOIN order_items oi ON p.id = oi.product_id
JOIN orders o ON oi.order_id = o.id
WHERE o.status = 'completed'
GROUP BY p.category
HAVING total_revenue > 1000
ORDER BY total_revenue DESC
LIMIT 5;
\`\`\`

### Example 2: Monthly Sales Report

\`\`\`sql
SELECT 
    DATE_FORMAT(order_date, '%Y-%m') AS month,
    COUNT(*) AS order_count,
    COUNT(DISTINCT customer_id) AS unique_customers,
    SUM(total_amount) AS total_revenue,
    AVG(total_amount) AS avg_order_value
FROM orders
WHERE order_date >= DATE_SUB(CURRENT_DATE, INTERVAL 12 MONTH)
AND status = 'completed'
GROUP BY DATE_FORMAT(order_date, '%Y-%m')
HAVING order_count > 10
ORDER BY month DESC;
\`\`\`

### Example 3: Customer Purchase Analysis

\`\`\`sql
SELECT 
    c.name AS customer_name,
    COUNT(o.id) AS order_count,
    SUM(o.total_amount) AS total_spent,
    AVG(o.total_amount) AS avg_order_value,
    MAX(o.order_date) AS last_order_date
FROM customers c
JOIN orders o ON c.id = o.customer_id
WHERE o.status = 'completed'
GROUP BY c.id, c.name
HAVING order_count >= 3
AND total_spent > 500
ORDER BY total_spent DESC;
\`\`\`

---

## Best Practices

### 1. Use WHERE Before GROUP BY
Filter rows early to improve performance.

### 2. Use HAVING for Group Filters
Only use HAVING when filtering groups, not rows.

### 3. Index Columns in WHERE and ORDER BY
Indexes improve query performance.

### 4. Use LIMIT for Large Result Sets
Prevent returning too many rows.

---

## Summary

**SQL Clauses:**
- **WHERE** - Filter rows
- **GROUP BY** - Group rows
- **HAVING** - Filter groups
- **ORDER BY** - Sort results
- **LIMIT** - Limit rows

**Key Points:**
- WHERE filters before grouping
- HAVING filters after grouping
- ORDER BY sorts final results
- LIMIT restricts output

Master these clauses to build powerful queries!

---

## Practice Question

**Q:** Write a query to find:
1. Categories with average price > 100
2. Products in stock, grouped by category
3. Top 3 categories by total stock value (price * stock)

**Answer:**
\`\`\`sql
-- 1. Categories with avg price > 100
SELECT category, AVG(price) AS avg_price
FROM products
GROUP BY category
HAVING AVG(price) > 100;

-- 2. Products in stock, grouped by category
SELECT 
    category,
    COUNT(*) AS product_count,
    SUM(stock) AS total_stock
FROM products
WHERE stock > 0
GROUP BY category;

-- 3. Top 3 categories by stock value
SELECT 
    category,
    SUM(price * stock) AS total_stock_value
FROM products
WHERE stock > 0
GROUP BY category
ORDER BY total_stock_value DESC
LIMIT 3;
\`\`\`
  `,
  code: `-- MySQL Clauses Examples

CREATE DATABASE clauses_demo;
USE clauses_demo;

CREATE TABLE products (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    category VARCHAR(50),
    stock INT UNSIGNED DEFAULT 0,
    status VARCHAR(20) DEFAULT 'active',
    description TEXT
);

CREATE TABLE orders (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    customer_id INT UNSIGNED,
    order_date DATE NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending'
);

-- Insert sample data
INSERT INTO products (name, price, category, stock, status) VALUES
('Laptop', 999.99, 'Electronics', 50, 'active'),
('Mouse', 29.99, 'Electronics', 100, 'active'),
('Keyboard', 79.99, 'Electronics', 75, 'active'),
('Desk', 199.99, 'Furniture', 30, 'active'),
('Chair', 149.99, 'Furniture', 25, 'active');

-- ========== WHERE Clause ==========

-- Simple condition
SELECT * FROM products WHERE price > 100;

-- Multiple conditions with AND
SELECT * FROM products WHERE price > 100 AND stock > 0;

-- Multiple conditions with OR
SELECT * FROM products WHERE category = 'Electronics' OR category = 'Furniture';

-- IN
SELECT * FROM products WHERE category IN ('Electronics', 'Furniture');

-- NOT IN
SELECT * FROM products WHERE category NOT IN ('Electronics');

-- BETWEEN
SELECT * FROM products WHERE price BETWEEN 50 AND 200;

-- LIKE
SELECT * FROM products WHERE name LIKE '%laptop%';
SELECT * FROM products WHERE name LIKE 'Laptop%';
SELECT * FROM products WHERE name LIKE '%Pro';

-- IS NULL / IS NOT NULL
SELECT * FROM products WHERE description IS NULL;
SELECT * FROM products WHERE description IS NOT NULL;

-- ========== GROUP BY Clause ==========

-- Group by single column
SELECT category, COUNT(*) AS count
FROM products
GROUP BY category;

-- Group by multiple columns
SELECT category, status, COUNT(*) AS count
FROM products
GROUP BY category, status;

-- Group with aggregates
SELECT 
    category,
    COUNT(*) AS product_count,
    AVG(price) AS avg_price,
    MAX(price) AS max_price,
    MIN(price) AS min_price,
    SUM(stock) AS total_stock
FROM products
GROUP BY category;

-- ========== HAVING Clause ==========

-- Filter groups
SELECT category, COUNT(*) AS count
FROM products
GROUP BY category
HAVING COUNT(*) > 2;

-- HAVING with aggregates
SELECT 
    category,
    AVG(price) AS avg_price
FROM products
GROUP BY category
HAVING AVG(price) > 100;

-- WHERE vs HAVING
SELECT 
    category,
    COUNT(*) AS count,
    AVG(price) AS avg_price
FROM products
WHERE stock > 0          -- Filter rows first
GROUP BY category
HAVING COUNT(*) > 1     -- Filter groups after
AND AVG(price) > 50;

-- ========== ORDER BY Clause ==========

-- Ascending (default)
SELECT * FROM products ORDER BY price;

-- Descending
SELECT * FROM products ORDER BY price DESC;

-- Multiple columns
SELECT * FROM products ORDER BY category, price DESC;

-- Using expressions
SELECT 
    name,
    price * stock AS total_value
FROM products
ORDER BY total_value DESC;

-- ========== LIMIT Clause ==========

-- Limit rows
SELECT * FROM products LIMIT 10;

-- Limit with offset
SELECT * FROM products LIMIT 10 OFFSET 0;
SELECT * FROM products LIMIT 0, 10;

-- Top N
SELECT * FROM products ORDER BY price DESC LIMIT 5;

-- Pagination
SELECT * FROM products LIMIT 0, 10;   -- Page 1
SELECT * FROM products LIMIT 10, 10;  -- Page 2
SELECT * FROM products LIMIT 20, 10;  -- Page 3

-- ========== Complete Example ==========

SELECT 
    category,
    COUNT(*) AS product_count,
    AVG(price) AS avg_price,
    SUM(stock) AS total_stock
FROM products
WHERE stock > 0
AND price > 10
GROUP BY category
HAVING COUNT(*) > 1
AND AVG(price) > 50
ORDER BY avg_price DESC
LIMIT 10;

-- ========== Real-World Examples ==========

-- Top categories by stock value
SELECT 
    category,
    SUM(price * stock) AS total_stock_value
FROM products
WHERE stock > 0
GROUP BY category
ORDER BY total_stock_value DESC
LIMIT 3;

-- Categories with high average price
SELECT 
    category,
    AVG(price) AS avg_price,
    COUNT(*) AS product_count
FROM products
GROUP BY category
HAVING AVG(price) > 100
ORDER BY avg_price DESC;`
};

export default mysqlClauses;

