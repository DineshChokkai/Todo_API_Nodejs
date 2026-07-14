import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import todoRoutes from "./routes/todo.routes.js";
import {connectDB} from "./config/db.js";
import dotenv from "dotenv";
import {errorHandler} from "./middlewares/error.middleware.js";
import swaggerSpec from "./config/swagger.js";

dotenv.config();

const app =express();

// middleware
app.use(cors());
app.use(express.json());

// Swagger UI setup
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// connect DB
connectDB();
// Routes
app.use("/api", todoRoutes);
    
// Error handling middleware
app.use(errorHandler);

// start the server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
} );