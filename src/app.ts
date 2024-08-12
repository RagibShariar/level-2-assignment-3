import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import authRouter from "./modules/auth/auth.route";
import bookingRouter from "./modules/booking/booking.route";
import facilityRouter from "./modules/facility/facility.route";
import { bookingController } from "./modules/booking/booking.controller";
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
app.get("/api/check-availability", bookingController.checkAvailability);
app.use("/api/bookings", bookingRouter);

// global error handler
app.use(globalErrorHandler);

export default app;
