import bcrypt from "bcryptjs";
import db from '../database/connect.js';

const login = async(req,res)=>{
    try {
        const {username,password}=req.body;

        // check feilds

        if(!username || !password){
            return res.status(400).json({
                success:false,
                message:"username and password are required"
            })
        }

        // find user in mysql

        const [users] = await db.execute(
            "SELECT * FROM users WHERE username = ? AND STATUS = 1",
            [username]
        )

        // if user not found

        if(users.length === 0){
            return res.status(404).json({
                success:false,
                message:"invalid username and password ",
            })
        }

        const user = users[0];// 0 = index of object in users databse

        // compare entered password with hashed password
        const passwordMatch = await bcrypt.compare(
            password,// this pass user enter when logs in
            user.password,
        )


        // wrong password
        if(!passwordMatch){
            return res.status(401).json({
                success:false,
                message:"invalid username or password"
            })
        }

        // if login successfull

        return res.status(200).json({
            success:true,
            message:"Login successfull",

            // if user loged in as admin or hr send this data from data to recat which is below

            user:{
                 id: user.id,
                 name: user.name,
                 username: user.username,
                 role: user.role,
                 status:user.status,
            }
        });
    }
    catch(error){
        console.error("Login error :", error)


    return res.status(500).json({
      success: false,
      message: "Server error",
    });

    }
}

export default login;