const mysqlPrivileges = {
  id: 'mysql-privileges',
  title: 'MySQL Privileges & Security - GRANT, REVOKE, DCL',
  description: 'Learn Data Control Language: user management, privileges, GRANT, REVOKE, and database security',
  content: `
# MySQL Privileges & Security — Data Control Language (DCL)

**DCL (Data Control Language)** manages database security through user permissions and access control.

---

## What is DCL?

DCL includes:
- **GRANT** - Give privileges to users
- **REVOKE** - Remove privileges from users
- User management
- Security policies

---

## User Management

### Create User

\`\`\`sql
-- Create user
CREATE USER 'username'@'localhost' IDENTIFIED BY 'password';

-- Create user with specific host
CREATE USER 'username'@'%' IDENTIFIED BY 'password';  -- Any host
CREATE USER 'username'@'192.168.1.%' IDENTIFIED BY 'password';  -- IP range

-- Create user with password expiration
CREATE USER 'username'@'localhost' 
IDENTIFIED BY 'password'
PASSWORD EXPIRE INTERVAL 90 DAY;
\`\`\`

### Drop User

\`\`\`sql
-- Drop user
DROP USER 'username'@'localhost';

-- Drop multiple users
DROP USER 'user1'@'localhost', 'user2'@'localhost';
\`\`\`

### Rename User

\`\`\`sql
-- Rename user
RENAME USER 'old_username'@'localhost' TO 'new_username'@'localhost';
\`\`\`

### Change Password

\`\`\`sql
-- Change password
ALTER USER 'username'@'localhost' IDENTIFIED BY 'new_password';

-- Set password (deprecated, use ALTER USER)
SET PASSWORD FOR 'username'@'localhost' = 'new_password';
\`\`\`

---

## Privilege Types

### Global Privileges

Apply to all databases:
- **ALL PRIVILEGES** - All privileges
- **CREATE USER** - Create users
- **RELOAD** - Reload server
- **SHUTDOWN** - Shut down server
- **PROCESS** - View processes

### Database Privileges

Apply to specific database:
- **CREATE** - Create tables
- **DROP** - Drop tables
- **ALTER** - Alter tables
- **SELECT** - Read data
- **INSERT** - Insert data
- **UPDATE** - Update data
- **DELETE** - Delete data
- **INDEX** - Create indexes
- **CREATE VIEW** - Create views
- **SHOW VIEW** - Show views

### Table Privileges

Apply to specific tables:
- **SELECT** - Read table
- **INSERT** - Insert rows
- **UPDATE** - Update rows
- **DELETE** - Delete rows
- **ALTER** - Alter table
- **DROP** - Drop table
- **INDEX** - Create indexes
- **REFERENCES** - Create foreign keys

### Column Privileges

Apply to specific columns:
- **SELECT** - Read column
- **INSERT** - Insert into column
- **UPDATE** - Update column

---

## GRANT Statement

Grant privileges to users.

### Grant Database Privileges

\`\`\`sql
-- Grant all privileges on database
GRANT ALL PRIVILEGES ON database_name.* TO 'username'@'localhost';

-- Grant specific privileges
GRANT SELECT, INSERT, UPDATE ON database_name.* TO 'username'@'localhost';

-- Grant on all databases
GRANT SELECT ON *.* TO 'username'@'localhost';
\`\`\`

### Grant Table Privileges

\`\`\`sql
-- Grant on specific table
GRANT SELECT, INSERT ON database_name.table_name TO 'username'@'localhost';

-- Grant on all tables
GRANT SELECT, INSERT ON database_name.* TO 'username'@'localhost';
\`\`\`

### Grant Column Privileges

\`\`\`sql
-- Grant on specific columns
GRANT SELECT (id, name), UPDATE (name) 
ON database_name.products 
TO 'username'@'localhost';
\`\`\`

### Grant with WITH GRANT OPTION

Allow user to grant privileges to others.

\`\`\`sql
-- Grant with grant option
GRANT SELECT ON database_name.* 
TO 'username'@'localhost' 
WITH GRANT OPTION;
\`\`\`

---

## REVOKE Statement

Remove privileges from users.

### Revoke Privileges

\`\`\`sql
-- Revoke all privileges
REVOKE ALL PRIVILEGES ON database_name.* FROM 'username'@'localhost';

-- Revoke specific privileges
REVOKE SELECT, INSERT ON database_name.* FROM 'username'@'localhost';

-- Revoke grant option
REVOKE GRANT OPTION ON database_name.* FROM 'username'@'localhost';
\`\`\`

---

## View Privileges

### Show User Privileges

\`\`\`sql
-- Show privileges for user
SHOW GRANTS FOR 'username'@'localhost';

-- Show current user privileges
SHOW GRANTS;
SHOW GRANTS FOR CURRENT_USER();
\`\`\`

### Query Privilege Tables

\`\`\`sql
-- View user privileges
SELECT * FROM mysql.user WHERE User = 'username';

-- View database privileges
SELECT * FROM mysql.db WHERE User = 'username';

-- View table privileges
SELECT * FROM mysql.tables_priv WHERE User = 'username';

-- View column privileges
SELECT * FROM mysql.columns_priv WHERE User = 'username';
\`\`\`

---

## Common Privilege Scenarios

### Scenario 1: Read-Only User

\`\`\`sql
-- Create read-only user
CREATE USER 'readonly'@'localhost' IDENTIFIED BY 'password';
GRANT SELECT ON database_name.* TO 'readonly'@'localhost';
FLUSH PRIVILEGES;
\`\`\`

### Scenario 2: Application User

\`\`\`sql
-- Create application user (no DDL)
CREATE USER 'app_user'@'localhost' IDENTIFIED BY 'password';
GRANT SELECT, INSERT, UPDATE, DELETE ON database_name.* TO 'app_user'@'localhost';
FLUSH PRIVILEGES;
\`\`\`

### Scenario 3: Developer User

\`\`\`sql
-- Create developer user (full access to dev database)
CREATE USER 'developer'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON dev_database.* TO 'developer'@'localhost';
FLUSH PRIVILEGES;
\`\`\`

### Scenario 4: Admin User

\`\`\`sql
-- Create admin user (all privileges)
CREATE USER 'admin'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON *.* TO 'admin'@'localhost' WITH GRANT OPTION;
FLUSH PRIVILEGES;
\`\`\`

---

## FLUSH PRIVILEGES

Reload privilege tables after changes.

\`\`\`sql
-- Reload privileges
FLUSH PRIVILEGES;

-- Required after:
-- CREATE USER
-- GRANT
-- REVOKE
-- DROP USER
\`\`\`

---

## Security Best Practices

### 1. Principle of Least Privilege
Grant only necessary privileges.

### 2. Use Strong Passwords
\`\`\`sql
CREATE USER 'user'@'localhost' 
IDENTIFIED BY 'StrongP@ssw0rd123!';
\`\`\`

### 3. Limit Host Access
\`\`\`sql
-- Good: Specific host
CREATE USER 'user'@'192.168.1.100' IDENTIFIED BY 'password';

-- Avoid: Any host
CREATE USER 'user'@'%' IDENTIFIED BY 'password';
\`\`\`

### 4. Regular Audit
Review user privileges regularly.

\`\`\`sql
-- List all users
SELECT User, Host FROM mysql.user;

-- List users with specific privilege
SELECT User, Host FROM mysql.user WHERE Select_priv = 'Y';
\`\`\`

### 5. Remove Unused Users
\`\`\`sql
-- Drop unused users
DROP USER 'old_user'@'localhost';
\`\`\`

---

## Summary

DCL (Data Control Language) includes:
- **GRANT** - Give privileges
- **REVOKE** - Remove privileges
- **User Management** - CREATE, DROP, ALTER USER

**Privilege Levels:**
- Global (all databases)
- Database (specific database)
- Table (specific table)
- Column (specific columns)

**Security Best Practices:**
- Least privilege principle
- Strong passwords
- Limit host access
- Regular audits

Master DCL to secure your database!

---

## Practice Question

**Q:** Create:
1. Read-only user for reporting
2. Application user with INSERT/UPDATE/DELETE/SELECT
3. Revoke DELETE from application user

**Answer:**
\`\`\`sql
-- 1. Read-only user
CREATE USER 'reporter'@'localhost' IDENTIFIED BY 'password';
GRANT SELECT ON database_name.* TO 'reporter'@'localhost';
FLUSH PRIVILEGES;

-- 2. Application user
CREATE USER 'app_user'@'localhost' IDENTIFIED BY 'password';
GRANT SELECT, INSERT, UPDATE, DELETE ON database_name.* TO 'app_user'@'localhost';
FLUSH PRIVILEGES;

-- 3. Revoke DELETE
REVOKE DELETE ON database_name.* FROM 'app_user'@'localhost';
FLUSH PRIVILEGES;
\`\`\`
  `,
  code: `-- MySQL Privileges & Security Examples

-- Note: These commands require appropriate privileges
-- Run as root or user with CREATE USER and GRANT privileges

-- ========== User Management ==========

-- Create user
CREATE USER 'testuser'@'localhost' IDENTIFIED BY 'password123';

-- Create user with specific host
CREATE USER 'remoteuser'@'%' IDENTIFIED BY 'password123';

-- Create user with IP range
CREATE USER 'networkuser'@'192.168.1.%' IDENTIFIED BY 'password123';

-- Drop user
DROP USER 'testuser'@'localhost';

-- Rename user
RENAME USER 'olduser'@'localhost' TO 'newuser'@'localhost';

-- Change password
ALTER USER 'testuser'@'localhost' IDENTIFIED BY 'newpassword123';

-- ========== GRANT Privileges ==========

-- Grant all privileges on database
GRANT ALL PRIVILEGES ON my_database.* TO 'testuser'@'localhost';

-- Grant specific privileges
GRANT SELECT, INSERT, UPDATE ON my_database.* TO 'testuser'@'localhost';

-- Grant on specific table
GRANT SELECT, INSERT ON my_database.products TO 'testuser'@'localhost';

-- Grant on all databases
GRANT SELECT ON *.* TO 'readonly'@'localhost';

-- Grant column-level privileges
GRANT SELECT (id, name), UPDATE (name) 
ON my_database.products 
TO 'testuser'@'localhost';

-- Grant with GRANT OPTION
GRANT SELECT ON my_database.* 
TO 'testuser'@'localhost' 
WITH GRANT OPTION;

-- ========== REVOKE Privileges ==========

-- Revoke all privileges
REVOKE ALL PRIVILEGES ON my_database.* FROM 'testuser'@'localhost';

-- Revoke specific privileges
REVOKE SELECT, INSERT ON my_database.* FROM 'testuser'@'localhost';

-- Revoke grant option
REVOKE GRANT OPTION ON my_database.* FROM 'testuser'@'localhost';

-- ========== View Privileges ==========

-- Show user privileges
SHOW GRANTS FOR 'testuser'@'localhost';

-- Show current user privileges
SHOW GRANTS;
SHOW GRANTS FOR CURRENT_USER();

-- Query privilege tables
SELECT User, Host FROM mysql.user;
SELECT * FROM mysql.db WHERE User = 'testuser';
SELECT * FROM mysql.tables_priv WHERE User = 'testuser';

-- ========== Common Scenarios ==========

-- Read-only user
CREATE USER 'readonly'@'localhost' IDENTIFIED BY 'password';
GRANT SELECT ON my_database.* TO 'readonly'@'localhost';
FLUSH PRIVILEGES;

-- Application user (no DDL)
CREATE USER 'app_user'@'localhost' IDENTIFIED BY 'password';
GRANT SELECT, INSERT, UPDATE, DELETE ON my_database.* TO 'app_user'@'localhost';
FLUSH PRIVILEGES;

-- Developer user
CREATE USER 'developer'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON dev_database.* TO 'developer'@'localhost';
FLUSH PRIVILEGES;

-- Admin user
CREATE USER 'admin'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON *.* TO 'admin'@'localhost' WITH GRANT OPTION;
FLUSH PRIVILEGES;

-- ========== FLUSH PRIVILEGES ==========

-- Reload privileges (required after GRANT/REVOKE)
FLUSH PRIVILEGES;

-- ========== Security Best Practices ==========

-- List all users
SELECT User, Host FROM mysql.user;

-- List users with specific privilege
SELECT User, Host FROM mysql.user WHERE Select_priv = 'Y';

-- Remove unused users
DROP USER IF EXISTS 'olduser'@'localhost';

-- Change password regularly
ALTER USER 'testuser'@'localhost' IDENTIFIED BY 'new_secure_password';

-- Note: Always use strong passwords in production!
-- Consider using password validation plugin for MySQL 5.7+`
};

export default mysqlPrivileges;

