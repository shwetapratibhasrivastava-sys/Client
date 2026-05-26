import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDb from "./config/db.js";
import clientRoute from "./routes/clientRoute.js";
import authRoute from "./routes/authRoute.js";

dotenv.config();

const app = express();

connectDb();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running...");
});

// ROUTES
app.use("/api/auth", authRoute);
app.use("/api/client", clientRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});