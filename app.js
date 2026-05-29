import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import authRoutes from "./src/routes/authRoutes.js";
import {globalErrorMiddleware} from "./src/middleware/errorMiddleware.js";
const app = express();


morgan.token('time', function (req, res) {
    return new Date().toISOString();
});

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan(':time  :method for  :url was received - StatusCode :status - :response-time ms'));
app.use(globalErrorMiddleware);
app.use("/auth",authRoutes);
app.get('/health', (req, res) => {
    res.status(200).json({
        "status": "success",
        "message": "ShopCart API is running 🆙"
    })
})


export default app;