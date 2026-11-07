import db from "../database/connect.js";

const Sales = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM sales ORDER BY id DESC"
    );

    res.status(200).json(rows);
  } catch (error) {
    console.log("Error finding sales data:", error);

    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

export default Sales;

