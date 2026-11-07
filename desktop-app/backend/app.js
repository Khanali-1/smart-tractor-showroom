//app.js makes the application while server.js listen the paplication
// we r importing the express package bcz we r building our eweb server with Express
import express from "express";
// we r creating a express application by making aor calling a express() function with var of app
import authRoutes from './routes/authRoutes.js';
import tractorRoutes from './routes/tractorRoutes.js'
import customersRoutes from './routes/customersRoutes.js';
import salesRoutes from './routes/salesRoutes.js';
import empRoutes from './routes/empRoutes.js';
import attandnaceRoutes from './routes/attandanceRoutes.js'
import leaveRoutes from './routes/leaveRoutes.js'
import performanceRoutes from './routes/performanceRoutes.js'
import salesreportRoutes from './routes/salesreportRoutes.js'
import financeRoutes from './routes/financeRoutes.js'
import hrreportRoutes from './routes/hrRoutes.js'
import userRoutes from './routes/userRoutes.js'

import agricultureRoutes from './routes/agricultureRoutes.js'

import cors from "cors";
const app = express();

app.use(cors());


// To read incoming JSON data from React.
// The data is available in req.body.
app.use(express.json());

// login api

app.use("/api/auth",authRoutes);

// tractor api 

app.use("/api/tractors",tractorRoutes);

// customers api

app.use("/api/customers",customersRoutes)

// sales routes

app.use('/api/sales',salesRoutes);

// employeees routes

app.use('/api/employees',empRoutes)

// atttandance routes 

app.use('/api/attandance',attandnaceRoutes)

// get leaves api 

app.use('/api/leaves',leaveRoutes)

app.use('/api/performance',performanceRoutes)

// sales report routes 

app.use('/api/salesreports',salesreportRoutes)

// a

app.use("/api/financereports",financeRoutes)

// hr report

app.use('/api/hrreports',hrreportRoutes)

app.use('/api/users',userRoutes)

// agriculture routes 

app.use('/api/agriculture',agricultureRoutes)





app.get('/',(req,res)=>{
        res.send("<h1>Hello</h1><p>The port is running</p>");
})



// Exporting the Express application
// so server.js can use it.
export default app;
