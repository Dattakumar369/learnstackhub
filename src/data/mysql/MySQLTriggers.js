const mysqlTriggers = {
  id: 'mysql-triggers',
  title: 'MySQL Triggers - Automated Actions',
  description: 'Learn to create triggers that automatically execute SQL code when data changes',
  content: `
# MySQL Triggers — Automated Database Actions

Triggers are stored programs that automatically execute when specific events occur (INSERT, UPDATE, DELETE). They're perfect for maintaining data integrity and automating business logic.

---

## What are Triggers?

**Triggers** are:
- Automatically executed SQL code
- Fired before or after data changes
- Useful for auditing, validation, and automation
- Can access old and new data values

---

## Trigger Types

1. **BEFORE INSERT** - Before row is inserted
2. **AFTER INSERT** - After row is inserted
3. **BEFORE UPDATE** - Before row is updated
4. **AFTER UPDATE** - After row is updated
5. **BEFORE DELETE** - Before row is deleted
6. **AFTER DELETE** - After row is deleted

---

## Creating Triggers

### Basic Syntax

\`\`\`sql
DELIMITER //
CREATE TRIGGER trigger_name
BEFORE/AFTER INSERT/UPDATE/DELETE
ON table_name
FOR EACH ROW
BEGIN
    -- Trigger logic
END //
DELIMITER ;
\`\`\`

---

## BEFORE INSERT Trigger

Executes before a row is inserted.

### Example: Auto-generate SKU

\`\`\`sql
DELIMITER //
CREATE TRIGGER before_product_insert
BEFORE INSERT ON products
FOR EACH ROW
BEGIN
    IF NEW.sku IS NULL OR NEW.sku = '' THEN
        SET NEW.sku = CONCAT('PROD-', LPAD(NEW.id, 6, '0'));
    END IF;
END //
DELIMITER ;
\`\`\`

### Example: Validate Data

\`\`\`sql
DELIMITER //
CREATE TRIGGER validate_product_insert
BEFORE INSERT ON products
FOR EACH ROW
BEGIN
    IF NEW.price <= 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Price must be greater than 0';
    END IF;
    
    IF NEW.stock < 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Stock cannot be negative';
    END IF;
END //
DELIMITER ;
\`\`\`

---

## AFTER INSERT Trigger

Executes after a row is inserted.

### Example: Update Statistics

\`\`\`sql
-- Create statistics table
CREATE TABLE product_stats (
    total_products INT DEFAULT 0,
    total_value DECIMAL(15, 2) DEFAULT 0
);

DELIMITER //
CREATE TRIGGER after_product_insert
AFTER INSERT ON products
FOR EACH ROW
BEGIN
    UPDATE product_stats
    SET total_products = total_products + 1,
        total_value = total_value + NEW.price;
END //
DELIMITER ;
\`\`\`

### Example: Log Activity

\`\`\`sql
-- Create audit log table
CREATE TABLE audit_log (
    id INT AUTO_INCREMENT PRIMARY KEY,
    table_name VARCHAR(50),
    action VARCHAR(20),
    record_id INT,
    changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DELIMITER //
CREATE TRIGGER log_product_insert
AFTER INSERT ON products
FOR EACH ROW
BEGIN
    INSERT INTO audit_log (table_name, action, record_id)
    VALUES ('products', 'INSERT', NEW.id);
END //
DELIMITER ;
\`\`\`

---

## BEFORE UPDATE Trigger

Executes before a row is updated.

### Example: Prevent Price Decrease

\`\`\`sql
DELIMITER //
CREATE TRIGGER prevent_price_decrease
BEFORE UPDATE ON products
FOR EACH ROW
BEGIN
    IF NEW.price < OLD.price THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Cannot decrease product price';
    END IF;
END //
DELIMITER ;
\`\`\`

### Example: Auto-update Timestamp

\`\`\`sql
DELIMITER //
CREATE TRIGGER update_timestamp
BEFORE UPDATE ON products
FOR EACH ROW
BEGIN
    SET NEW.updated_at = CURRENT_TIMESTAMP;
END //
DELIMITER ;
\`\`\`

---

## AFTER UPDATE Trigger

Executes after a row is updated.

### Example: Track Price Changes

\`\`\`sql
-- Create price history table
CREATE TABLE price_history (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT,
    old_price DECIMAL(10, 2),
    new_price DECIMAL(10, 2),
    changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DELIMITER //
CREATE TRIGGER track_price_change
AFTER UPDATE ON products
FOR EACH ROW
BEGIN
    IF OLD.price != NEW.price THEN
        INSERT INTO price_history (product_id, old_price, new_price)
        VALUES (NEW.id, OLD.price, NEW.price);
    END IF;
END //
DELIMITER ;
\`\`\`

---

## BEFORE DELETE Trigger

Executes before a row is deleted.

### Example: Prevent Deletion

\`\`\`sql
DELIMITER //
CREATE TRIGGER prevent_customer_delete
BEFORE DELETE ON customers
FOR EACH ROW
BEGIN
    DECLARE order_count INT;
    
    SELECT COUNT(*) INTO order_count
    FROM orders
    WHERE customer_id = OLD.id;
    
    IF order_count > 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Cannot delete customer with existing orders';
    END IF;
END //
DELIMITER ;
\`\`\`

### Example: Archive Before Delete

\`\`\`sql
-- Create archive table
CREATE TABLE products_archive LIKE products;

DELIMITER //
CREATE TRIGGER archive_product
BEFORE DELETE ON products
FOR EACH ROW
BEGIN
    INSERT INTO products_archive
    SELECT * FROM products WHERE id = OLD.id;
END //
DELIMITER ;
\`\`\`

---

## AFTER DELETE Trigger

Executes after a row is deleted.

### Example: Update Statistics

\`\`\`sql
DELIMITER //
CREATE TRIGGER update_stats_after_delete
AFTER DELETE ON products
FOR EACH ROW
BEGIN
    UPDATE product_stats
    SET total_products = total_products - 1,
        total_value = total_value - OLD.price;
END //
DELIMITER ;
\`\`\`

---

## Real-World Examples

### Example 1: E-Commerce Order Processing

\`\`\`sql
-- Auto-update stock when order item is inserted
DELIMITER //
CREATE TRIGGER update_stock_on_order
AFTER INSERT ON order_items
FOR EACH ROW
BEGIN
    UPDATE products
    SET stock = stock - NEW.quantity
    WHERE id = NEW.product_id;
END //
DELIMITER ;

-- Validate stock before order
DELIMITER //
CREATE TRIGGER validate_stock_before_order
BEFORE INSERT ON order_items
FOR EACH ROW
BEGIN
    DECLARE available_stock INT;
    
    SELECT stock INTO available_stock
    FROM products
    WHERE id = NEW.product_id;
    
    IF available_stock < NEW.quantity THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Insufficient stock';
    END IF;
END //
DELIMITER ;
\`\`\`

### Example 2: User Activity Logging

\`\`\`sql
CREATE TABLE user_activity_log (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    action VARCHAR(50),
    old_data JSON,
    new_data JSON,
    changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DELIMITER //
CREATE TRIGGER log_user_changes
AFTER UPDATE ON users
FOR EACH ROW
BEGIN
    IF OLD.email != NEW.email OR OLD.name != NEW.name THEN
        INSERT INTO user_activity_log (user_id, action, old_data, new_data)
        VALUES (
            NEW.id,
            'UPDATE',
            JSON_OBJECT('name', OLD.name, 'email', OLD.email),
            JSON_OBJECT('name', NEW.name, 'email', NEW.email)
        );
    END IF;
END //
DELIMITER ;
\`\`\`

### Example 3: Auto-calculate Order Total

\`\`\`sql
DELIMITER //
CREATE TRIGGER calculate_order_total
AFTER INSERT ON order_items
FOR EACH ROW
BEGIN
    UPDATE orders
    SET total_amount = (
        SELECT SUM(quantity * price)
        FROM order_items
        WHERE order_id = NEW.order_id
    )
    WHERE id = NEW.order_id;
END //
DELIMITER ;
\`\`\`

---

## OLD and NEW Keywords

- **NEW** - Refers to new row (INSERT, UPDATE)
- **OLD** - Refers to old row (UPDATE, DELETE)

\`\`\`sql
DELIMITER //
CREATE TRIGGER example_trigger
BEFORE UPDATE ON products
FOR EACH ROW
BEGIN
    -- OLD.price - old value
    -- NEW.price - new value
    
    IF NEW.price != OLD.price THEN
        -- Log the change
        INSERT INTO price_log (product_id, old_price, new_price)
        VALUES (NEW.id, OLD.price, NEW.price);
    END IF;
END //
DELIMITER ;
\`\`\`

---

## Viewing and Managing Triggers

\`\`\`sql
-- Show all triggers
SHOW TRIGGERS;

-- Show triggers for specific table
SHOW TRIGGERS FROM database_name LIKE 'table_name';

-- Show trigger definition
SHOW CREATE TRIGGER trigger_name;

-- Drop trigger
DROP TRIGGER IF EXISTS trigger_name;
\`\`\`

---

## Best Practices

### 1. Keep Triggers Simple
Complex logic should be in stored procedures.

### 2. Avoid Recursive Triggers
Triggers that modify the same table can cause infinite loops.

### 3. Use for Business Rules
Triggers are perfect for enforcing business logic.

### 4. Document Triggers
Add comments explaining what the trigger does.

---

## Summary

Triggers provide:
- **Automation** - Automatic execution on data changes
- **Data Integrity** - Enforce business rules
- **Auditing** - Track all changes
- **Validation** - Validate data before changes

**Trigger Types:**
- BEFORE/AFTER INSERT
- BEFORE/AFTER UPDATE
- BEFORE/AFTER DELETE

Use triggers wisely to automate database operations!

---

## Practice Question

**Q:** Create triggers to:
1. Log all product price changes to a history table
2. Prevent deleting products that have orders
3. Auto-update order total when items are added/removed

**Answer:**
\`\`\`sql
-- Price history table
CREATE TABLE price_history (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT,
    old_price DECIMAL(10, 2),
    new_price DECIMAL(10, 2),
    changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Trigger 1: Log price changes
DELIMITER //
CREATE TRIGGER log_price_change
AFTER UPDATE ON products
FOR EACH ROW
BEGIN
    IF OLD.price != NEW.price THEN
        INSERT INTO price_history (product_id, old_price, new_price)
        VALUES (NEW.id, OLD.price, NEW.price);
    END IF;
END //
DELIMITER ;

-- Trigger 2: Prevent deletion
DELIMITER //
CREATE TRIGGER prevent_product_delete
BEFORE DELETE ON products
FOR EACH ROW
BEGIN
    DECLARE order_count INT;
    SELECT COUNT(*) INTO order_count
    FROM order_items WHERE product_id = OLD.id;
    
    IF order_count > 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Cannot delete product with existing orders';
    END IF;
END //
DELIMITER ;

-- Trigger 3: Update order total
DELIMITER //
CREATE TRIGGER update_order_total_insert
AFTER INSERT ON order_items
FOR EACH ROW
BEGIN
    UPDATE orders
    SET total_amount = (
        SELECT SUM(quantity * price) FROM order_items WHERE order_id = NEW.order_id
    )
    WHERE id = NEW.order_id;
END //
DELIMITER ;

DELIMITER //
CREATE TRIGGER update_order_total_delete
AFTER DELETE ON order_items
FOR EACH ROW
BEGIN
    UPDATE orders
    SET total_amount = (
        SELECT COALESCE(SUM(quantity * price), 0) FROM order_items WHERE order_id = OLD.order_id
    )
    WHERE id = OLD.order_id;
END //
DELIMITER ;
\`\`\`
  `,
  code: `-- MySQL Triggers Examples

CREATE DATABASE triggers_demo;
USE triggers_demo;

CREATE TABLE products (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    stock INT UNSIGNED DEFAULT 0,
    sku VARCHAR(50),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE orders (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    customer_id INT UNSIGNED,
    total_amount DECIMAL(10, 2) DEFAULT 0,
    order_date DATE NOT NULL
);

CREATE TABLE order_items (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    order_id INT UNSIGNED NOT NULL,
    product_id INT UNSIGNED NOT NULL,
    quantity INT UNSIGNED NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- ========== BEFORE INSERT Triggers ==========

-- Auto-generate SKU
DELIMITER //
CREATE TRIGGER before_product_insert
BEFORE INSERT ON products
FOR EACH ROW
BEGIN
    IF NEW.sku IS NULL OR NEW.sku = '' THEN
        SET NEW.sku = CONCAT('PROD-', LPAD(NEW.id, 6, '0'));
    END IF;
END //
DELIMITER ;

-- Validate data
DELIMITER //
CREATE TRIGGER validate_product_insert
BEFORE INSERT ON products
FOR EACH ROW
BEGIN
    IF NEW.price <= 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Price must be greater than 0';
    END IF;
    
    IF NEW.stock < 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Stock cannot be negative';
    END IF;
END //
DELIMITER ;

-- ========== AFTER INSERT Triggers ==========

-- Create audit log
CREATE TABLE audit_log (
    id INT AUTO_INCREMENT PRIMARY KEY,
    table_name VARCHAR(50),
    action VARCHAR(20),
    record_id INT,
    changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DELIMITER //
CREATE TRIGGER log_product_insert
AFTER INSERT ON products
FOR EACH ROW
BEGIN
    INSERT INTO audit_log (table_name, action, record_id)
    VALUES ('products', 'INSERT', NEW.id);
END //
DELIMITER ;

-- ========== BEFORE UPDATE Triggers ==========

-- Prevent price decrease
DELIMITER //
CREATE TRIGGER prevent_price_decrease
BEFORE UPDATE ON products
FOR EACH ROW
BEGIN
    IF NEW.price < OLD.price THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Cannot decrease product price';
    END IF;
END //
DELIMITER ;

-- Auto-update timestamp
DELIMITER //
CREATE TRIGGER update_timestamp
BEFORE UPDATE ON products
FOR EACH ROW
BEGIN
    SET NEW.updated_at = CURRENT_TIMESTAMP;
END //
DELIMITER ;

-- ========== AFTER UPDATE Triggers ==========

-- Price history
CREATE TABLE price_history (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT,
    old_price DECIMAL(10, 2),
    new_price DECIMAL(10, 2),
    changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DELIMITER //
CREATE TRIGGER track_price_change
AFTER UPDATE ON products
FOR EACH ROW
BEGIN
    IF OLD.price != NEW.price THEN
        INSERT INTO price_history (product_id, old_price, new_price)
        VALUES (NEW.id, OLD.price, NEW.price);
    END IF;
END //
DELIMITER ;

-- ========== BEFORE DELETE Triggers ==========

-- Prevent deletion
DELIMITER //
CREATE TRIGGER prevent_product_delete
BEFORE DELETE ON products
FOR EACH ROW
BEGIN
    DECLARE order_count INT;
    SELECT COUNT(*) INTO order_count
    FROM order_items WHERE product_id = OLD.id;
    
    IF order_count > 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Cannot delete product with existing orders';
    END IF;
END //
DELIMITER ;

-- ========== AFTER DELETE Triggers ==========

DELIMITER //
CREATE TRIGGER log_product_delete
AFTER DELETE ON products
FOR EACH ROW
BEGIN
    INSERT INTO audit_log (table_name, action, record_id)
    VALUES ('products', 'DELETE', OLD.id);
END //
DELIMITER ;

-- ========== Real-World: Order Processing ==========

-- Update stock when order item added
DELIMITER //
CREATE TRIGGER update_stock_on_order
AFTER INSERT ON order_items
FOR EACH ROW
BEGIN
    UPDATE products
    SET stock = stock - NEW.quantity
    WHERE id = NEW.product_id;
END //
DELIMITER ;

-- Validate stock before order
DELIMITER //
CREATE TRIGGER validate_stock_before_order
BEFORE INSERT ON order_items
FOR EACH ROW
BEGIN
    DECLARE available_stock INT;
    SELECT stock INTO available_stock FROM products WHERE id = NEW.product_id;
    
    IF available_stock < NEW.quantity THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Insufficient stock';
    END IF;
END //
DELIMITER ;

-- Auto-calculate order total
DELIMITER //
CREATE TRIGGER calculate_order_total_insert
AFTER INSERT ON order_items
FOR EACH ROW
BEGIN
    UPDATE orders
    SET total_amount = (
        SELECT SUM(quantity * price) FROM order_items WHERE order_id = NEW.order_id
    )
    WHERE id = NEW.order_id;
END //
DELIMITER ;

DELIMITER //
CREATE TRIGGER calculate_order_total_delete
AFTER DELETE ON order_items
FOR EACH ROW
BEGIN
    UPDATE orders
    SET total_amount = COALESCE((
        SELECT SUM(quantity * price) FROM order_items WHERE order_id = OLD.order_id
    ), 0)
    WHERE id = OLD.order_id;
END //
DELIMITER ;

-- View triggers
SHOW TRIGGERS;
SHOW CREATE TRIGGER track_price_change;`
};

export default mysqlTriggers;

