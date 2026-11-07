import db from "../database/connect.js";

const getSalesReport = async (req, res) => {
    try {

        // 1. Overall sales summary
        const [summary] = await db.query(`
            SELECT
                COUNT(*) AS total_sales,
                COALESCE(SUM(total_amount), 0) AS total_revenue,
                COALESCE(SUM(paid_amount), 0) AS total_paid,
                COALESCE(SUM(remaining_amount), 0) AS total_pending
            FROM sales
        `);


        // 2. Monthly sales
        const [monthlySales] = await db.query(`
            SELECT
                DATE_FORMAT(sale_date, '%Y-%m') AS month,
                COUNT(*) AS total_orders,
                COALESCE(SUM(total_amount), 0) AS revenue
            FROM sales
            GROUP BY DATE_FORMAT(sale_date, '%Y-%m')
            ORDER BY month ASC
        `);


        // 3. Recent sales
        const [recentSales] = await db.query(`
            SELECT
                sales.id,
                sales.invoice_number,
                sales.sale_date,
                sales.total_amount,
                sales.paid_amount,
                sales.remaining_amount,
                sales.payment_method,

                customers.customer_code,
                customers.name AS customer_name,
                customers.phone,

                CASE
                    WHEN sales.paid_amount = sales.total_amount
                        THEN 'Paid'

                    WHEN sales.paid_amount > 0
                        AND sales.paid_amount < sales.total_amount
                        THEN 'Partial'

                    ELSE 'Pending'
                END AS payment_status

            FROM sales

            LEFT JOIN customers
                ON sales.customer_id = customers.id

            ORDER BY sales.id DESC
            LIMIT 20
        `);


        // 4. Payment method summary
        const [paymentMethods] = await db.query(`
            SELECT
                payment_method,
                COUNT(*) AS total_orders,
                COALESCE(SUM(total_amount), 0) AS total_amount
            FROM sales
            GROUP BY payment_method
        `);


        res.status(200).json({
            success: true,
            summary: summary[0],
            monthlySales,
            recentSales,
            paymentMethods
        });

    } catch (error) {

        console.log("Sales report error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch sales report",
            error: error.message
        });
    }
};

export default getSalesReport;