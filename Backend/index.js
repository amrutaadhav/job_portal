import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
dotenv.config({});

// app.get("/",(req,res) => {
//   return res.status(200).json({
//     message: "Welcome to API!",
//   timestamp: new Date().toISOString(),
// success: true,
//   });
// });

//middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(cookieParser());

const corsOptions = {
  origin: ["http://localhost:5121"],
  credentials: true,
};

app.use(cors(corsOptions));

const PORT = process.envPORT || 5011;
app.listen(PORT,() => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});