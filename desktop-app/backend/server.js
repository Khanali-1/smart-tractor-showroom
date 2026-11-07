import app from "./app.js";
import db from "./database/connect.js";

const PORT = 5000;

const startServer = async () => {
    try {
        const connection = await db.getConnection();

        console.log("MySQL connected successfully");// getting on connect from db 

        connection.release();
        // returning it 

        app.listen(PORT, () => {
            console.log(`Backend running on http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error("MySQL connection failed:", error.message);
    }
};

startServer();