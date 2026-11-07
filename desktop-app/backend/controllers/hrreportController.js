
import db from "../database/connect.js";

const gethrReport = async (req, res) => {
    try {

        // ==========================================
        // 1. EMPLOYEE SUMMARY
        // ==========================================

        const [employeeSummary] = await db.query(`
            SELECT
                COUNT(*) AS total_employees,

                SUM(
                    CASE
                        WHEN status = 'Active' THEN 1
                        ELSE 0
                    END
                ) AS active_employees,

                SUM(
                    CASE
                        WHEN status != 'Active' THEN 1
                        ELSE 0
                    END
                ) AS inactive_employees

            FROM employees
        `);


        // ==========================================
        // 2. DEPARTMENT SUMMARY
        // ==========================================

        const [departments] = await db.query(`
            SELECT
                department,
                COUNT(*) AS total_employees

            FROM employees

            GROUP BY department

            ORDER BY total_employees DESC
        `);


        // ==========================================
        // 3. TODAY'S ATTENDANCE
        // ==========================================

        const [todayAttendance] = await db.query(`
            SELECT

                COUNT(*) AS total_records,

                SUM(
                    CASE
                        WHEN attendance.status = 'Present'
                        THEN 1
                        ELSE 0
                    END
                ) AS present,

                SUM(
                    CASE
                        WHEN attendance.status = 'Absent'
                        THEN 1
                        ELSE 0
                    END
                ) AS absent,

                SUM(
                    CASE
                        WHEN attendance.status = 'Late'
                        THEN 1
                        ELSE 0
                    END
                ) AS late

            FROM attendance

            WHERE attendance.attendance_date = CURDATE()
        `);


        // ==========================================
        // 4. LEAVE SUMMARY
        // ==========================================

        const [leaveSummary] = await db.query(`
            SELECT

                COUNT(*) AS total_leaves,

                SUM(
                    CASE
                        WHEN status = 'Pending'
                        THEN 1
                        ELSE 0
                    END
                ) AS pending_leaves,

                SUM(
                    CASE
                        WHEN status = 'Approved'
                        THEN 1
                        ELSE 0
                    END
                ) AS approved_leaves,

                SUM(
                    CASE
                        WHEN status = 'Rejected'
                        THEN 1
                        ELSE 0
                    END
                ) AS rejected_leaves

            FROM leaves
        `);


        // ==========================================
        // 5. PERFORMANCE SUMMARY
        // ==========================================

        const [performance] = await db.query(`
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

                employees.employee_code,
                employees.name,
                employees.department,
                employees.designation

            FROM employee_performance

            INNER JOIN employees
                ON employee_performance.employee_id = employees.id

            ORDER BY employee_performance.id DESC

            LIMIT 20
        `);


        // ==========================================
        // 6. RECENT EMPLOYEES
        // ==========================================

        const [recentEmployees] = await db.query(`
            SELECT
                id,
                employee_code,
                name,
                department,
                designation,
                joining_date,
                status

            FROM employees

            ORDER BY id DESC

            LIMIT 20
        `);


        // ==========================================
        // FINAL RESPONSE
        // ==========================================

        res.status(200).json({

            success: true,

            employeeSummary: employeeSummary[0],

            departments,

            todayAttendance: todayAttendance[0],

            leaveSummary: leaveSummary[0],

            performance,

            recentEmployees

        });

    } catch (error) {

        console.log("HR report error:", error);

        res.status(500).json({

            success: false,

            message: "Failed to fetch HR report",

            error: error.message

        });
    }
};

export default gethrReport;
