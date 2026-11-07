
//import bcrypt from "bcryptjs";
import db from "../database/connect.js";

// ===============================
// GET ALL USERS
// ===============================
const getUsers = async (req, res) => {
    try {
        const [users] = await db.query(`
            SELECT 
                id,
                name,
                username,
                role,
                status
            FROM users
            ORDER BY id DESC
        `);

        res.status(200).json({
            success: true,
            users
        });

    } catch (error) {
        console.error("Get users error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to get users"
        });
    }
};

export default getUsers


// ===============================
// ADD NEW USER
// ===============================
/*const addUser = async (req, res) => {
    try {

        const {
            name,
            username,
            password,
            role,
            status
        } = req.body;


        // Check required fields
        if (!name || !username || !password || !role) {
            return res.status(400).json({
                success: false,
                message: "Name, username, password and role are required"
            });
        }


        // Check duplicate username
        const [existingUser] = await db.query(
            "SELECT id FROM users WHERE username = ?",
            [username]
        );

        if (existingUser.length > 0) {
            return res.status(400).json({
                success: false,
                message: "Username already exists"
            });
        }


        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);


        // Insert user
        const [result] = await db.query(
            `INSERT INTO users
            (name, username, password, role, status)
            VALUES (?, ?, ?, ?, ?)`,
            [
                name,
                username,
                hashedPassword,
                role,
                status ?? 1
            ]
        );


        res.status(201).json({
            success: true,
            message: "User created successfully",
            userId: result.insertId
        });

    } catch (error) {

        console.error("Add user error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to create user"
        });
    }
};


// ===============================
// UPDATE USER
// ===============================
const updateUser = async (req, res) => {
    try {

        const { id } = req.params;

        const {
            name,
            username,
            password,
            role,
            status
        } = req.body;


        // Check user exists
        const [existingUser] = await db.query(
            "SELECT * FROM users WHERE id = ?",
            [id]
        );

        if (existingUser.length === 0) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }


        // Check username already used by another user
        const [duplicateUsername] = await db.query(
            `SELECT id FROM users 
             WHERE username = ? AND id != ?`,
            [username, id]
        );

        if (duplicateUsername.length > 0) {
            return res.status(400).json({
                success: false,
                message: "Username already exists"
            });
        }


        // If password is provided, hash it
        if (password && password.trim() !== "") {

            const hashedPassword = await bcrypt.hash(password, 10);

            await db.query(
                `UPDATE users
                 SET name = ?,
                     username = ?,
                     password = ?,
                     role = ?,
                     status = ?
                 WHERE id = ?`,
                [
                    name,
                    username,
                    hashedPassword,
                    role,
                    status,
                    id
                ]
            );

        } else {

            // Keep old password
            await db.query(
                `UPDATE users
                 SET name = ?,
                     username = ?,
                     role = ?,
                     status = ?
                 WHERE id = ?`,
                [
                    name,
                    username,
                    role,
                    status,
                    id
                ]
            );
        }


        res.status(200).json({
            success: true,
            message: "User updated successfully"
        });

    } catch (error) {

        console.error("Update user error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to update user"
        });
    }
};


// ===============================
// DELETE USER
// ===============================
const deleteUser = async (req, res) => {
    try {

        const { id } = req.params;


        const [result] = await db.query(
            "DELETE FROM users WHERE id = ?",
            [id]
        );


        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }


        res.status(200).json({
            success: true,
            message: "User deleted successfully"
        });

    } catch (error) {

        console.error("Delete user error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to delete user"
        });
    }
}; */

