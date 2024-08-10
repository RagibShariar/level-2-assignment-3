import app from "./app";
import { config } from "./modules/config";

const port = config.port || 5000;

app.get("/", (req, res) => {
  res.send("⚙️ Server is running...");
});

app.listen(port, () => {
  console.log(`🌐 Server is running on port ${port}`);
});
