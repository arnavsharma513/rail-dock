require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const railwayRoutes = require("./src/routes/railwayRoutes");

const { 
    errorHandler, notFoundHandler 
} = require("./src/middleware/errorHandler");

const app = express();
app.use(helmet());
app.use(cors({
    origin: process.env.frontend_url,
    methods: ['GET'],
    allowedHeaders: ['Content-Type']
}));
app.use(express.json());

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 100, 
    message: "Too many requests from this IP, please try again later."
});
app.use("/api/", limiter);
app.use("/api/railway", railwayRoutes);
app.use(errorHandler);
app.use(notFoundHandler); 

const port = process.env.PORT || 5000 ;

app.listen(port, () => {
    console.log(`Your server is running on port ${port}`);
});