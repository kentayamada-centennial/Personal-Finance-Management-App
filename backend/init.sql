CREATE DATABASE finance;

USE finance;

-- USER table
CREATE TABLE USER (
    userId INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL
);

-- ACCOUNT table
CREATE TABLE ACCOUNT (
    accountId INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL,
    balance DECIMAL DEFAULT 0.00,
    userId INT,
    FOREIGN KEY (userId) REFERENCES USER(userId) ON DELETE CASCADE
);

-- TRANSACTION table
CREATE TABLE TRANSACTION (
    transactionId INT AUTO_INCREMENT PRIMARY KEY,
    amount DECIMAL NOT NULL,
    date DATE NOT NULL,
    type ENUM('income', 'expense') NOT NULL,
    category VARCHAR(255) NOT NULL,
    description TEXT,
    accountId INT,
    FOREIGN KEY (accountId) REFERENCES ACCOUNT(accountId) ON DELETE CASCADE
);

-- BUDGET table
CREATE TABLE BUDGET (
    budgetId INT AUTO_INCREMENT PRIMARY KEY,
    category VARCHAR(255) NOT NULL,
    amount DECIMAL NOT NULL,
    userId INT,
    FOREIGN KEY (userId) REFERENCES USER(userId) ON DELETE CASCADE
);

-- REPORT table
CREATE TABLE REPORT (
    reportId INT AUTO_INCREMENT PRIMARY KEY,
    startDate DATE NOT NULL,
    endDate DATE NOT NULL,
    userId INT,
    FOREIGN KEY (userId) REFERENCES USER(userId) ON DELETE CASCADE
);

-- NOTIFICATION table
CREATE TABLE NOTIFICATION (
    notificationId INT AUTO_INCREMENT PRIMARY KEY,
    message TEXT NOT NULL,
    date DATE NOT NULL,
    type ENUM('alert', 'reminder') NOT NULL,
    userId INT,
    FOREIGN KEY (userId) REFERENCES USER(userId) ON DELETE CASCADE
);

-- SETTINGS table
CREATE TABLE SETTINGS (
    settingsId INT AUTO_INCREMENT PRIMARY KEY,
    emailNotifications BOOLEAN DEFAULT TRUE,
    userId INT,
    FOREIGN KEY (userId) REFERENCES USER(userId) ON DELETE CASCADE
);

-- Insert data into USER table
INSERT INTO USER (email, password, name) VALUES 
('john.doe@example.com', 'password123', 'John Doe'),
('jane.smith@example.com', 'password456', 'Jane Smith');

-- Insert data into ACCOUNT table
INSERT INTO ACCOUNT (name, type, balance, userId) VALUES 
('Checking Account', 'checking', 1500.00, 1),
('Savings Account', 'savings', 5000.00, 1),
('Checking Account', 'checking', 1200.00, 2),
('Savings Account', 'savings', 3000.00, 2);

-- Insert data into TRANSACTION table
INSERT INTO TRANSACTION (amount, date, type, category, description, accountId) VALUES 
(200.00, '2024-07-01', 'income', 'Salary', 'Monthly salary', 1),
(-50.00, '2024-07-02', 'expense', 'Groceries', 'Weekly groceries', 1),
(300.00, '2024-07-03', 'income', 'Freelance', 'Freelance project', 2),
(-100.00, '2024-07-04', 'expense', 'Utilities', 'Electricity bill', 2);

-- Insert data into BUDGET table
INSERT INTO BUDGET (category, amount, userId) VALUES 
('Groceries', 400.00, 1),
('Utilities', 150.00, 1),
('Entertainment', 200.00, 2),
('Savings', 500.00, 2);

-- Insert data into REPORT table
INSERT INTO REPORT (startDate, endDate, userId) VALUES 
('2024-07-01', '2024-07-31', 1),
('2024-07-01', '2024-07-31', 2);

-- Insert data into NOTIFICATION table
INSERT INTO NOTIFICATION (message, date, type, userId) VALUES 
('Your monthly budget report is ready.', '2024-07-01', 'reminder', 1),
('Reminder: Pay your electricity bill.', '2024-07-02', 'alert', 2);

-- Insert data into SETTINGS table
INSERT INTO SETTINGS (emailNotifications, userId) VALUES 
(TRUE, 1),
(FALSE, 2);
