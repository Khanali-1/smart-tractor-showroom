import db from '../database/connect.js';

const getLeave = async(req,res)=>{

    try{
         const [rows] = await db.query(`
      SELECT
        leaves.id,
        leaves.employee_id,
        leaves.leave_type,
        leaves.start_date,
        leaves.end_date,
        leaves.reason,
        leaves.status,
        employees.employee_code,
        employees.name,
        employees.department,
        employees.designation
      FROM leaves
      INNER JOIN employees
        ON leaves.employee_id = employees.id
      ORDER BY leaves.id DESC
    `);

    res.status(200).json(rows);
    }
    catch(error){
        console.log(" error fetching leave ",error)
        res.status(400).json({
            message:"something wnet wrong",
        })

    }

}

export default getLeave