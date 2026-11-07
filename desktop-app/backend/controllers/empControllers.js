import db from '../database/connect.js';

const employees = async(req,res)=>{
    try{
        const [rows]= await db.query(
            "SELECT * FROM employees ORDER BY id DESC"
        )
        res.status(200).json(rows)
    }
    catch(error){
        console.log(" error fetching employees data",error);

        res.status(400).json({
            message:"error fetching employees data",
            error:error.message,
        })
    }
} 

export default employees