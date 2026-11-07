import db from "../database/connect.js";

const getPerformace = async (req, res) => {

    try {

        const [rows] = await db.query(`

            SELECT 
                employee_performance.id,
                employee_performance.employee_id,
                employee_performance.month,
                employee_performance.sales_target,
                employee_performance.sales_achieved,
                employee_performance.attendance_percentage,
                employee_performance.performance_score,
                employee_performance.bonus_amount,
                employee_performance.remarks,

                employee_performance.rank_awarded,
                employee_performance.certificate_title,
                employee_performance.reward_type,
                employee_performance.reward_description,

                employees.employee_code,
                employees.name,
                employees.department,
                employees.designation

            FROM employee_performance

            INNER JOIN employees
                ON employee_performance.employee_id = employees.id

            ORDER BY employee_performance.id DESC

        `);

        res.status(200).json(rows);

    } catch (error) {

        console.log(
            "Failed fetching monthly employee performance:",
            error
        );

        res.status(500).json({
            message: "Failed fetching performance",
            error: error.message
        });

    }

};

export default getPerformace;