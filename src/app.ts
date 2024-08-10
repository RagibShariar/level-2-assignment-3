import cors from "cors";
import express from "express";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import authRouter from "./modules/auth/auth.route";
const app = express();

// middlewares
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("⚙️ Server is running...");
});

// application routes
app.use("/api/auth", authRouter);

// global error handler
app.use(globalErrorHandler);

export default app;
