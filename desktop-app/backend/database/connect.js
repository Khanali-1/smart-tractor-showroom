import mysql from "mysql2/promise";

const db = mysql.createPool({// We are creating a pool to manage multiple MySQL connections.
    host: "127.0.0.1",
    user: "root",
    password: "ali12345",
    database: "smart_tractor_showroom",


    // Wait if all connections are busy.
    waitForConnections: true,
    // Maximum 10 connections at the same time.
    connectionLimit: 10,
    // No limit for waiting requests.
    queueLimit: 0,
});

export default db;