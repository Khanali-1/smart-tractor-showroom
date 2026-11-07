// tractor controllers 
import db from '../database/connect.js';
const getAlltractors = async(req,res)=>{
    try {
        const [rows] = await db.query(
            "SELECT * FROM tractors ORDER BY id DESC"
        )
        res.status(200).json(rows);
    }
    catch(error){
        console.log("Error fetching rows",error);

        res.status(500).json({
            message:"Failed to fatched tractors",
            error:error.message
        })
    }
}

export default getAlltractors