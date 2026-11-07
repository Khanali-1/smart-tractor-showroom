// customer controller 

import db from '../database/connect.js';
// reading the data from mysql and sending to throug backend to front end 
const getAllCustomers = async(req,res)=>{

    try {
        const [rows] = await db.query(
            "SELECT * FROM customers ORDER BY id DESC"
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

export default getAllCustomers