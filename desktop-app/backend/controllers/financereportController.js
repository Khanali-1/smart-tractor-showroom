
import db from "../database/connect.js";

const getFinanceReport = async (req, res) => {
    try {

        // 1. Overall finance summary
        const [summary] = await db.query(`
            SELECT
                COUNT(*) AS total_sales,

                COALESCE(SUM(total_amount), 0) AS total_revenue,

                COALESCE(SUM(paid_amount), 0) AS total_collected,

                COALESCE(SUM(remaining_amount), 0) AS total_pending,

                COALESCE(SUM(discount), 0) AS total_discount

            FROM sales
        `);


        // 2. Monthly finance
        const [monthlyFinance] = await db.query(`
            SELECT
                DATE_FORMAT(sale_date, '%Y-%m') AS month,

                COUNT(*) AS total_sales,

                COALESCE(SUM(total_amount), 0) AS revenue,

                COALESCE(SUM(paid_amount), 0) AS collected,

                COALESCE(SUM(remaining_amount), 0) AS pending,

                COALESCE(SUM(discount), 0) AS discount

            FROM sales

            GROUP BY DATE_FORMAT(sale_date, '%Y-%m')

            ORDER BY month ASC
        `);


        // 3. Payment method summary
        const [paymentMethods] = await db.query(`
            SELECT
                payment_method,

                COUNT(*) AS total_orders,

                COALESCE(SUM(total_amount), 0) AS total_amount,

                COALESCE(SUM(paid_amount), 0) AS collected,

                COALESCE(SUM(remaining_amount), 0) AS pending

            FROM sales

            GROUP BY payment_method
        `);


        // 4. Outstanding payments
        const [outstandingPayments] = await db.query(`
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
                customers.phone

            FROM sales

            LEFT JOIN customers
                ON sales.customer_id = customers.id

            WHERE sales.remaining_amount > 0

            ORDER BY sales.remaining_amount DESC

            LIMIT 20
        `);


        // 5. Recent financial transactions
        const [recentTransactions] = await db.query(`
            SELECT
                sales.id,
                sales.invoice_number,
                sales.sale_date,
                sales.total_amount,
                sales.paid_amount,
                sales.remaining_amount,
                sales.discount,
                sales.payment_method,

                customers.customer_code,
                customers.name AS customer_name

            FROM sales

            LEFT JOIN customers
                ON sales.customer_id = customers.id

            ORDER BY sales.id DESC

            LIMIT 20
        `);


        res.status(200).json({
            success: true,

            summary: summary[0],

            monthlyFinance,

            paymentMethods,

            outstandingPayments,

            recentTransactions
        });

    } catch (error) {

        console.log("Finance report error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch finance report",
            error: error.message
        });
    }
};

export default getFinanceReport;