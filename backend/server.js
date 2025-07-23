import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000; // Set the port from environment variables or default to 5000
const __dirname = path.resolve(); // Get the current directory name

app.use(express.json()); // Allows us to accept JSON data in req.body
app.use("/api/products", productRoutes); // Mount the product routes

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  connectDB();
  console.log("Server is running on http://localhost:" + PORT);
});

app.get("/", (req, res) => {
  res.send("Backend server is up and running!");
});
