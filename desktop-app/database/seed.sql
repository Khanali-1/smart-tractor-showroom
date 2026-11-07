// creating table 

USE smart_tractor_showroom;

INSERT INTO users (name,username,password,role,status) 
VALUES (
    "Usama",
    "usama-khan",
    "$2b$10$uM7UMH2R8ucyN11kUiUbmOUe7SAkFwcbcXskdiSNLgGJPcDVgahpG",
    "admin",
    1
),
(
    "habib",
    "habib-khan",
    "$2b$10$0ggr9xbiVdTOrEcrvMy2leH.EyeUDNfZMaYp./rcm5walwN0oDYMC",
    "hr",
    1

);


INSERT INTO tractors ( brand,
    model,
    variant,
    tractor_code,
    engine_number,
    chassis_number,
    manufacturing_year,
    purchase_price,
    selling_price,
    stock_quantity,
    low_stock_limit,
    horsepower,
    transmission,
    fuel_type,
    color,
    supplier_name,
    supplier_contact,
    warranty_months,
    status,
    description,
    image_url)
    VALUES (

    'Massey Ferguson',
    'MF 385',
    '2WD',
    'TRC-001',
    'MF385-ENG-1001',
    'MF385-CHS-2001',
    2025,
    4300000.00,
    4650000.00,
    5,
    2,
    85,
    '8 Forward + 2 Reverse',
    'Diesel',
    'Red',
    'Millat Tractors',
    '021-111-111-111',
    24,
    'available',
    'Massey Ferguson 385 suitable for agricultural and farming operations.',
    NULL
),

(
    'Massey Ferguson',
    'MF 240',
    '2WD',
    'TRC-002',
    'MF240-ENG-1002',
    'MF240-CHS-2002',
    2025,
    3100000.00,
    3350000.00,
    8,
    2,
    50,
    '8 Forward + 2 Reverse',
    'Diesel',
    'Red',
    'Millat Tractors',
    '021-111-111-111',
    24,
    'available',
    'Reliable tractor for general farming and agricultural work.',
    NULL
),

(
    'Massey Ferguson',
    'MF 260',
    '2WD',
    'TRC-003',
    'MF260-ENG-1003',
    'MF260-CHS-2003',
    2024,
    3500000.00,
    3800000.00,
    3,
    2,
    60,
    '8 Forward + 2 Reverse',
    'Diesel',
    'Red',
    'Millat Tractors',
    '021-111-111-111',
    24,
    'available',
    'Medium horsepower tractor for farming and field operations.',
    NULL
),

(
    'New Holland',
    'NH 480',
    '2WD',
    'TRC-004',
    'NH480-ENG-1004',
    'NH480-CHS-2004',
    2025,
    3900000.00,
    4200000.00,
    4,
    2,
    55,
    '8 Forward + 2 Reverse',
    'Diesel',
    'Blue',
    'Al-Ghazi Tractors',
    '021-222-222-222',
    24,
    'available',
    'Popular agricultural tractor designed for versatile farming applications.',
    NULL
),

(
    'New Holland',
    'NH 640',
    '2WD',
    'TRC-005',
    'NH640-ENG-1005',
    'NH640-CHS-2005',
    2024,
    4400000.00,
    4750000.00,
    2,
    2,
    75,
    '8 Forward + 2 Reverse',
    'Diesel',
    'Blue',
    'Al-Ghazi Tractors',
    '021-222-222-222',
    24,
    'available',
    'High performance tractor suitable for heavy agricultural operations.',
    NULL
),

(
    'Al-Ghazi',
    'AGTL 65',
    '2WD',
    'TRC-006',
    'AG65-ENG-1006',
    'AG65-CHS-2006',
    2025,
    3700000.00,
    4000000.00,
    1,
    2,
    65,
    '8 Forward + 2 Reverse',
    'Diesel',
    'Blue',
    'Al-Ghazi Tractors',
    '021-222-222-222',
    18,
    'low_stock',
    '65 HP tractor suitable for medium and heavy agricultural tasks.',
    NULL
),

(
    'Al-Ghazi',
    'AGTL 85',
    '2WD',
    'TRC-007',
    'AG85-ENG-1007',
    'AG85-CHS-2007',
    2024,
    4500000.00,
    4850000.00,
    0,
    2,
    85,
    '8 Forward + 2 Reverse',
    'Diesel',
    'Blue',
    'Al-Ghazi Tractors',
    '021-222-222-222',
    18,
    'out_of_stock',
    'Powerful tractor designed for demanding agricultural operations.',
    NULL
),

(
    'Massey Ferguson',
    'MF 375',
    '2WD',
    'TRC-008',
    'MF375-ENG-1008',
    'MF375-CHS-2008',
    2025,
    4100000.00,
    4450000.00,
    6,
    2,
    75,
    '8 Forward + 2 Reverse',
    'Diesel',
    'Red',
    'Millat Tractors',
    '021-111-111-111',
    24,
    'available',
    '75 HP tractor for farming, cultivation and transportation work.',
    NULL
),

(
    'New Holland',
    'NH 360',
    '2WD',
    'TRC-009',
    'NH360-ENG-1009',
    'NH360-CHS-2009',
    2024,
    3300000.00,
    3600000.00,
    2,
    2,
    60,
    '8 Forward + 2 Reverse',
    'Diesel',
    'Blue',
    'Al-Ghazi Tractors',
    '021-222-222-222',
    18,
    'available',
    'Compact and efficient tractor for everyday agricultural activities.',
    NULL
),

(
    'Massey Ferguson',
    'MF 375 Deluxe',
    'Deluxe 2WD',
    'TRC-010',
    'MF375D-ENG-1010',
    'MF375D-CHS-2010',
    2025,
    4200000.00,
    4550000.00,
    1,
    2,
    75,
    '8 Forward + 2 Reverse',
    'Diesel',
    'Red',
    'Millat Tractors',
    '021-111-111-111',
    24,
    'low_stock',
    'Deluxe variant with improved features for modern agricultural operations.',
    NULL
    )


// sales data

INSERT INTO sales
(
    invoice_number,
    customer_id,
    tractor_id,
    sale_price,
    discount,
    total_amount,
    paid_amount,
    remaining_amount,
    payment_method,
    notes
)
VALUES

(
    'INV-1001',
    4,
    1,
    5500000,
    100000,
    5400000,
    5400000,
    0,
    'cash',
    'Full payment received'
),

(
    'INV-1002',
    5,
    2,
    4800000,
    0,
    4800000,
    3000000,
    1800000,
    'installment',
    'Installment plan'
),

(
    'INV-1003',
    6,
    3,
    6200000,
    200000,
    6000000,
    4000000,
    2000000,
    'installment',
    'Partial payment received'
),

(
    'INV-1004',
    7,
    4,
    5100000,
    100000,
    5000000,
    5000000,
    0,
    'bank',
    'Bank payment completed'
),

(
    'INV-1005',
    8,
    5,
    4300000,
    0,
    4300000,
    2500000,
    1800000,
    'installment',
    'Remaining amount pending'
),

(
    'INV-1006',
    9,
    6,
    5700000,
    150000,
    5550000,
    5550000,
    0,
    'cash',
    'Full payment received'
),

(
    'INV-1007',
    10,
    7,
    6900000,
    200000,
    6700000,
    5000000,
    1700000,
    'installment',
    'Monthly installment'
),

(
    'INV-1008',
    11,
    8,
    4600000,
    100000,
    4500000,
    3000000,
    1500000,
    'bank',
    'Bank transfer'
),

(
    'INV-1009',
    12,
    9,
    5200000,
    0,
    5200000,
    5200000,
    0,
    'cash',
    'Payment completed'
),

(
    'INV-1010',
    13,
    10,
    6100000,
    100000,
    6000000,
    3500000,
    2500000,
    'installment',
    'Balance remaining'
);


// customers data 



INSERT INTO customers
(
    customer_code,
    name,
    phone,
    cnic,
    email,
    address,
    city,
    notes,
    status
)
VALUES
(
    'CUST-001',
    'Ali Ahmed',
    '03001234567',
    '42101-1234567-1',
    'ali.ahmed@gmail.com',
    'Latifabad Unit 7',
    'Hyderabad',
    'Regular customer',
    1
),
(
    'CUST-002',
    'Ahmed Khan',
    '03011234567',
    '42101-2345678-2',
    'ahmed.khan@gmail.com',
    'Qasimabad',
    'Hyderabad',
    'Interested in Massey Ferguson tractors',
    1
),
(
    'CUST-003',
    'Muhammad Usman',
    '03121234567',
    '42101-3456789-3',
    'm.usman@gmail.com',
    'Tando Jam Road',
    'Hyderabad',
    'Farmer customer',
    1
),
(
    'CUST-004',
    'Abdul Rehman',
    '03211234567',
    '42101-4567890-4',
    'abdul.rehman@gmail.com',
    'Main Bazar',
    'Tando Adam',
    'Regular farmer',
    1
),
(
    'CUST-005',
    'Imran Ali',
    '03331234567',
    '42101-5678901-5',
    'imran.ali@gmail.com',
    'Station Road',
    'Mirpurkhas',
    'Interested in installment plan',
    1
),
(
    'CUST-006',
    'Sajid Hussain',
    '03451234567',
    '42101-6789012-6',
    'sajid.hussain@gmail.com',
    'Main Road',
    'Tando Allahyar',
    'Tractor purchase customer',
    1
),
(
    'CUST-007',
    'Bilal Ahmed',
    '03021234568',
    '42101-7890123-7',
    'bilal.ahmed@gmail.com',
    'Civil Lines',
    'Hyderabad',
    'Agriculture business owner',
    1
),
(
    'CUST-008',
    'Naveed Khan',
    '03131234568',
    '42101-8901234-8',
    'naveed.khan@gmail.com',
    'Market Road',
    'Matiari',
    'Regular customer',
    1
),
(
    'CUST-009',
    'Shahid Ali',
    '03221234568',
    '42101-9012345-9',
    'shahid.ali@gmail.com',
    'Station Road',
    'Hala',
    'Farmer',
    1
),
(
    'CUST-010',
    'Adeel Hussain',
    '03341234568',
    '42101-0123456-0',
    'adeel.hussain@gmail.com',
    'Main Bazar',
    'Thatta',
    'Interested in new tractor',
    1
),
(
    'CUST-011',
    'Faisal Ahmed',
    '03461234568',
    '42101-1122334-1',
    'faisal.ahmed@gmail.com',
    'Airport Road',
    'Hyderabad',
    'Agriculture customer',
    1
),
(
    'CUST-012',
    'Asif Khan',
    '03031234569',
    '42101-2233445-2',
    'asif.khan@gmail.com',
    'Main Road',
    'Jamshoro',
    'Regular tractor buyer',
    1
);


// sales data 

USE smart_tractor_showroom;

INSERT INTO sales
(
    invoice_number,
    customer_id,
    tractor_id,
    sale_price,
    discount,
    total_amount,
    paid_amount,
    remaining_amount,
    payment_method,
    notes
)
VALUES

(
    'INV-1001',
    4,
    1,
    5500000,
    100000,
    5400000,
    5400000,
    0,
    'cash',
    'Full payment received'
),

(
    'INV-1002',
    5,
    2,
    4800000,
    0,
    4800000,
    3000000,
    1800000,
    'installment',
    'Installment plan'
),

(
    'INV-1003',
    6,
    3,
    6200000,
    200000,
    6000000,
    4000000,
    2000000,
    'installment',
    'Partial payment received'
),

(
    'INV-1004',
    7,
    4,
    5100000,
    100000,
    5000000,
    5000000,
    0,
    'bank',
    'Bank payment completed'
),

(
    'INV-1005',
    8,
    5,
    4300000,
    0,
    4300000,
    2500000,
    1800000,
    'installment',
    'Remaining amount pending'
),

(
    'INV-1006',
    9,
    6,
    5700000,
    150000,
    5550000,
    5550000,
    0,
    'cash',
    'Full payment received'
),

(
    'INV-1007',
    10,
    7,
    6900000,
    200000,
    6700000,
    5000000,
    1700000,
    'installment',
    'Monthly installment'
),

(
    'INV-1008',
    11,
    8,
    4600000,
    100000,
    4500000,
    3000000,
    1500000,
    'bank',
    'Bank transfer'
),

(
    'INV-1009',
    12,
    9,
    5200000,
    0,
    5200000,
    5200000,
    0,
    'cash',
    'Payment completed'
),

(
    'INV-1010',
    13,
    10,
    6100000,
    100000,
    6000000,
    3500000,
    2500000,
    'installment',
    'Balance remaining'
);


/* emplyesd data*/

INSERT INTO employees
(
    employee_code,
    name,
    father_name,
    cnic,
    phone,
    email,
    address,
    department,
    designation,
    joining_date,
    basic_salary,
    status
)
VALUES

(
    'EMP-0001',
    'Ali Khan',
    'Muhammad Khan',
    '42101-1234567-1',
    '0300-1111111',
    'ali@smarttractor.com',
    'Latifabad, Hyderabad',
    'Sales',
    'Sales Officer',
    '2024-01-15',
    55000,
    1
),

(
    'EMP-0002',
    'Ahmed Ali',
    'Abdul Rasheed',
    '42101-2345678-2',
    '0301-2222222',
    'ahmed@smarttractor.com',
    'Qasimabad, Hyderabad',
    'Sales',
    'Senior Sales Officer',
    '2023-08-10',
    70000,
    1
),

(
    'EMP-0003',
    'Usman Ahmed',
    'Sajid Ahmed',
    '42101-3456789-3',
    '0302-3333333',
    'usman@smarttractor.com',
    'Hirabad, Hyderabad',
    'Inventory',
    'Inventory Officer',
    '2024-03-20',
    50000,
    1
),

(
    'EMP-0004',
    'Hamza Shaikh',
    'Nadeem Shaikh',
    '42101-4567890-4',
    '0303-4444444',
    'hamza@smarttractor.com',
    'Latifabad, Hyderabad',
    'Accounts',
    'Accountant',
    '2022-11-05',
    65000,
    1
),

(
    'EMP-0005',
    'Bilal Ahmed',
    'Rashid Ahmed',
    '42101-5678901-5',
    '0304-5555555',
    'bilal@smarttractor.com',
    'Qasimabad, Hyderabad',
    'HR',
    'HR Officer',
    '2023-05-12',
    60000,
    1
),

(
    'EMP-0006',
    'Saad Khan',
    'Imran Khan',
    '42101-6789012-6',
    '0305-6666666',
    'saad@smarttractor.com',
    'Auto Bhan Road, Hyderabad',
    'Service',
    'Mechanic',
    '2024-06-01',
    45000,
    1
),

(
    'EMP-0007',
    'Fahad Hussain',
    'Riaz Hussain',
    '42101-7890123-7',
    '0306-7777777',
    'fahad@smarttractor.com',
    'Latifabad, Hyderabad',
    'Sales',
    'Sales Executive',
    '2025-01-10',
    48000,
    1
),

(
    'EMP-0008',
    'Arslan Malik',
    'Javed Malik',
    '42101-8901234-8',
    '0307-8888888',
    'arslan@smarttractor.com',
    'Qasimabad, Hyderabad',
    'Inventory',
    'Store Keeper',
    '2025-02-18',
    42000,
    1
),

(
    'EMP-0009',
    'Danish Ali',
    'Khalid Ali',
    '42101-9012345-9',
    '0308-9999999',
    'danish@smarttractor.com',
    'Citizen Colony, Hyderabad',
    'Service',
    'Technician',
    '2024-09-25',
    47000,
    1
),

(
    'EMP-0010',
    'Waqas Ahmed',
    'Shahid Ahmed',
    '42101-0123456-0',
    '0309-1010101',
    'waqas@smarttractor.com',
    'Latifabad, Hyderabad',
    'Administration',
    'Office Assistant',
    '2025-04-07',
    40000,
    1
);

// agriculture_operations


INSERT INTO agriculture_operations
(operation_name, description, min_hp, max_hp)
VALUES
(
    'Ploughing',
    'Used for primary soil preparation and deep tillage.',
    45,
    60
),
(
    'Cultivation',
    'Used for breaking soil clods and preparing the field.',
    40,
    55
),
(
    'Seeding',
    'Used for seed bed preparation and sowing operations.',
    40,
    60
),
(
    'Spraying',
    'Used for crop protection and spraying operations.',
    35,
    50
),
(
    'Harvesting',
    'Used for supporting harvesting and related field operations.',
    50,
    70
);


// inserting emplyee performmace 

INSERT INTO employee_performance
(
    employee_id,
    month,
    sales_target,
    sales_achieved,
    attendance_percentage,
    performance_score,
    bonus_amount,
    remarks,
    rank_awarded,
    certificate_title,
    reward_type,
    reward_description
)
VALUES
(
    1,
    'September 2026',
    10,
    12,
    96.00,
    92.00,
    8000.00,
    'Sales target exceeded with excellent overall performance',
    'Star Performer',
    'Certificate of Excellence',
    'Performance Bonus',
    'Performance bonus and special recognition'
),
(
    2,
    'September 2026',
    10,
    9,
    94.00,
    82.00,
    5000.00,
    'Good performance with strong attendance',
    'Excellent',
    'Certificate of Achievement',
    'Special Reward',
    'Special employee reward'
),
(
    3,
    'September 2026',
    8,
    7,
    91.00,
    76.00,
    2500.00,
    'Good performance and consistent attendance',
    'Good Performer',
    'Certificate of Appreciation',
    'Appreciation',
    'Employee appreciation'
),
(
    4,
    'September 2026',
    10,
    6,
    88.00,
    68.00,
    0.00,
    'Performance needs improvement',
    'Developing',
    NULL,
    NULL,
    NULL
),
(
    5,
    'September 2026',
    12,
    14,
    97.00,
    95.00,
    10000.00,
    'Outstanding sales achievement and excellent attendance',
    'Star Performer',
    'Certificate of Excellence',
    'Performance Bonus',
    'Performance bonus and special recognition'
);
