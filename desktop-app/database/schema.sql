// creating table 

USE smart_tractor_showroom;

CREATE TABLE IF NOT EXISTS users(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM("admin","hr") NOT NULL,
    status BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS tractors(
    id INT AUTO_INCREMENT PRIMARY KEY,
    /*BASIC INFORMATION */

    brand VARCHAR(100) NOT NULL,
    model VARCHAR(100) NOT NULL,
    variant VARCHAR(100),

    /* TRACTOR IDENTIFICATION */
    tractor_code VARCHAR(100) NOT NULL UNIQUE,
    engine_number VARCHAR(100) UNIQUE,
    chassis_number VARCHAR(100) UNIQUE,

    /* MANUFACTURING */
    manufacturing_year YEAR,

    -- PRICCING

      purchase_price DECIMAL(12,2) NOT NULL,
      selling_price DECIMAL(12,2) NOT NULL,

    -- Inventory

    stock_quantity INT NOT NULL DEFAULT 0,
    low_stock_limit INT NOT NULL DEFAULT 2,

    -- Tractor Details
    horsepower INT,
    transmission VARCHAR(100),
    fuel_type VARCHAR(50),
    color VARCHAR(50),

     -- Supplier
    supplier_name VARCHAR(150),
    supplier_contact VARCHAR(30),

    -- Warranty
    warranty_months INT DEFAULT 0,

    -- Status
    status ENUM('available', 'low_stock', 'out_of_stock', 'inactive')
        DEFAULT 'available',

    -- Description
    description TEXT,-- CUZ dis can be long or short 

     -- Image
    image_url VARCHAR(500),

     -- Dates
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP


)



CREATE TABLE IF NOT EXISTS customers (
    id INT AUTO_INCREMENT PRIMARY KEY,

    customer_code VARCHAR(30) NOT NULL UNIQUE,
    name VARCHAR(150) NOT NULL,
    phone VARCHAR(30) NOT NULL,

    cnic VARCHAR(30),
    email VARCHAR(150),
    address VARCHAR(255),
    city VARCHAR(100),

    notes TEXT,

    status TINYINT(1) NOT NULL DEFAULT 1,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
);


USE smart_tractor_showroom;

CREATE TABLE IF NOT EXISTS sales (
    id INT AUTO_INCREMENT PRIMARY KEY,

    invoice_number VARCHAR(50) NOT NULL UNIQUE,

    customer_id INT NOT NULL,
    tractor_id INT NOT NULL,

    sale_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    sale_price DECIMAL(12,2) NOT NULL,
    discount DECIMAL(12,2) NOT NULL DEFAULT 0,
    total_amount DECIMAL(12,2) NOT NULL,

    paid_amount DECIMAL(12,2) NOT NULL DEFAULT 0,
    remaining_amount DECIMAL(12,2) NOT NULL DEFAULT 0,

    payment_method ENUM('cash', 'bank', 'installment')
        NOT NULL DEFAULT 'cash',

    notes TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (customer_id)
        REFERENCES customers(id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,

    FOREIGN KEY (tractor_id)
        REFERENCES tractors(id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
);



USE smart_tractor_showroom;

CREATE TABLE IF NOT EXISTS sales (
    id INT AUTO_INCREMENT PRIMARY KEY,

    invoice_number VARCHAR(50) NOT NULL UNIQUE,

    customer_id INT NOT NULL,
    tractor_id INT NOT NULL,

    sale_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    sale_price DECIMAL(15,2) NOT NULL,
    discount DECIMAL(15,2) NOT NULL DEFAULT 0,
    total_amount DECIMAL(15,2) NOT NULL,

    paid_amount DECIMAL(15,2) NOT NULL DEFAULT 0,
    remaining_amount DECIMAL(15,2) NOT NULL DEFAULT 0,

    payment_method ENUM('cash', 'bank', 'installment') NOT NULL,

    notes TEXT,

    FOREIGN KEY (customer_id)
        REFERENCES customers(id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,

    FOREIGN KEY (tractor_id)
        REFERENCES tractors(id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
);


/* hr and employeess */



CREATE TABLE IF NOT EXISTS employees (
    id INT AUTO_INCREMENT PRIMARY KEY,

    employee_code VARCHAR(30) NOT NULL UNIQUE,

    name VARCHAR(100) NOT NULL,

    father_name VARCHAR(100),

    cnic VARCHAR(20) UNIQUE,

    phone VARCHAR(30),

    email VARCHAR(150),

    address VARCHAR(255),

    department VARCHAR(100) NOT NULL,

    designation VARCHAR(100) NOT NULL,

    joining_date DATE NOT NULL,

    basic_salary DECIMAL(12,2) NOT NULL DEFAULT 0,

    status TINYINT NOT NULL DEFAULT 1,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
);


// leaves 
CREATE TABLE leaves (
    id INT AUTO_INCREMENT PRIMARY KEY,

    employee_id INT NOT NULL,

    leave_type VARCHAR(50) NOT NULL,

    start_date DATE NOT NULL,

    end_date DATE NOT NULL,

    reason VARCHAR(500),

    status ENUM('Pending', 'Approved', 'Rejected')
        DEFAULT 'Pending',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (employee_id)
        REFERENCES employees(id)
);

// emplyees-performance 

CREATE TABLE employee_performance (
    id INT AUTO_INCREMENT PRIMARY KEY,

    employee_id INT NOT NULL,

    month VARCHAR(20) NOT NULL,

    sales_target INT NOT NULL DEFAULT 0,

    sales_achieved INT NOT NULL DEFAULT 0,

    attendance_percentage DECIMAL(5,2) NOT NULL DEFAULT 0,

    performance_score DECIMAL(5,2) NOT NULL DEFAULT 0,

    bonus_amount DECIMAL(10,2) NOT NULL DEFAULT 0,

    remarks VARCHAR(500),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (employee_id)
        REFERENCES employees(id)
);

// agricultral
CREATE TABLE agriculture_operations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    operation_name VARCHAR(100) NOT NULL UNIQUE,
    description VARCHAR(500),
    min_hp INT NOT NULL,
    max_hp INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

USE smart_tractor_showroom;

ALTER TABLE employee_performance
ADD COLUMN rank_awarded VARCHAR(50) DEFAULT 'Developing',
ADD COLUMN certificate_title VARCHAR(150) DEFAULT NULL,
ADD COLUMN reward_type VARCHAR(100) DEFAULT NULL,
ADD COLUMN reward_description VARCHAR(255) DEFAULT NULL;