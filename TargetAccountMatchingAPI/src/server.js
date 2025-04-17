import express from "express";
import authRoute from "./routes/auth.route.js";
import accountRoute from "./routes/account.route.js";
import { connectDB } from "./lib/db.js";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();

const PORT = process.env.PORT || 1000;
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

// app.get("/", (req, res) => {
//   res.send("Hello from server");
// });

app.use("/api/auth", authRoute);
app.use("/api/account", accountRoute);

app.listen(PORT, () => {
  console.log(`server is listening on http://localhost:${PORT}`);
  connectDB();
});
