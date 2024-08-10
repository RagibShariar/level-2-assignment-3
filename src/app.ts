import cors from "cors";
import express from "express";
const app = express();

// middlewares
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("⚙️ Server is running...");
});

export default app;
