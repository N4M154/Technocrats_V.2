import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import blogRoutes from "./routes/blog.route.js"; // Import the blog routes
import cookieParser from "cookie-parser";
import path from "path";
import cors from "cors"; // Import CORS

dotenv.config();

// Enable CORS for frontend access
const app = express();
app.use(cors({
  origin: "http://localhost:5173", // Frontend origin
  credentials: true, // Allow credentials (cookies)
}));

// MongoDB connection
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

const __dirname = path.resolve();

// In-memory blogs storage for demonstration (temporary solution)
let blogs = [];

// API Routes for blogs (in-memory storage)
app.get("/api/blogs", (req, res) => {
  res.json({ blogs });
});

app.post("/api/blogs", (req, res) => {
  const { title, content, author } = req.body;
  if (!title || !content || !author) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const newBlog = { id: blogs.length + 1, title, content, author };
  blogs.push(newBlog);
  res.status(201).json({ blog: newBlog });
});

// Middlewares
app.use(express.json()); // Parse JSON bodies
app.use(cookieParser()); // Parse cookies

// API Routes
app.use("/api/blog", blogRoutes); // Blog routes
app.use("/api/user", userRoutes); // User routes
app.use("/api/auth", authRoutes); // Auth routes

// Serve static files (React frontend)
app.use(express.static(path.join(__dirname, "/client/dist")));

// Catch-all route for React
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});

// Start the server
app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
