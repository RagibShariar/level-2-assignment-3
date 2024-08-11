import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import authRouter from "./modules/auth/auth.route";
import facilityRouter from "./modules/facility/facility.route";
const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("⚙️ Server is running...");
});

// application routes
app.use("/api/auth", authRouter);
app.use("/api/facility", facilityRouter);

// global error handler
app.use(globalErrorHandler);

export default app;
