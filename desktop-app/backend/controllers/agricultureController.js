
import db from "../database/connect.js";


// ==========================================
// GET ALL FARMING OPERATIONS
// ==========================================
const getOperations = async (req, res) => {
    try {

        const [rows] = await db.query(`
            SELECT
                id,
                operation_name,
                description,
                min_hp,
                max_hp
            FROM agriculture_operations
            ORDER BY operation_name ASC
        `);

        res.status(200).json({
            success: true,
            operations: rows
        });

    } catch (error) {

        console.error("Error getting agriculture operations:", error);

        res.status(500).json({
            success: false,
            message: "Failed to get farming operations"
        });
    }
};


// ==========================================
// TRACTOR RECOMMENDATION
// ==========================================
const recommendTractors = async (req, res) => {

    try {

        const { operation, landSize } = req.query;


        // Check operation
        if (!operation) {

            return res.status(400).json({
                success: false,
                message: "Operation is required"
            });
        }


        // Find selected operation
        const [operations] = await db.query(
            `
            SELECT
                id,
                operation_name,
                description,
                min_hp,
                max_hp
            FROM agriculture_operations
            WHERE operation_name = ?
            `,
            [operation]
        );


        if (operations.length === 0) {

            return res.status(404).json({
                success: false,
                message: "Operation not found"
            });
        }


        const selectedOperation = operations[0];


        // Find suitable tractors
        const [tractors] = await db.query(
            `
            SELECT
                id,
                brand,
                model,
                variant,
                tractor_code,
                horsepower,
                selling_price,
                stock_quantity,
                status,
                image_url
            FROM tractors
            WHERE horsepower BETWEEN ? AND ?
            AND stock_quantity > 0
            AND status = 'Active'
            ORDER BY horsepower ASC
            `,
            [
                selectedOperation.min_hp,
                selectedOperation.max_hp
            ]
        );


        res.status(200).json({

            success: true,

            operation: selectedOperation,

            landSize: landSize || null,

            tractors: tractors

        });

    } catch (error) {

        console.error("Error recommending tractors:", error);

        res.status(500).json({
            success: false,
            message: "Failed to recommend tractors"
        });
    }
};


export {
    getOperations,
    recommendTractors
};

