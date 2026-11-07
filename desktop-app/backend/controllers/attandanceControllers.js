import db from '../database/connect.js';

const getAttandance= async(req,res)=>{
    try {
    const [rows] = await db.query(`
      SELECT
        attendance.id,
        attendance.attendance_date,
        attendance.check_in,
        attendance.check_out,
        attendance.status,

        employees.id AS employee_id,
        employees.employee_code,
        employees.name,
        employees.department,
        employees.designation

      FROM attendance

      INNER JOIN employees
        ON attendance.employee_id = employees.id

      ORDER BY attendance.id DESC
    `);

    res.status(200).json(rows);

      } catch (error) {
    console.log("Error fetching attendance:", error);

    res.status(500).json({
      message: "Error fetching attendance",
      error: error.message,
    });
  }

}

export default getAttandance