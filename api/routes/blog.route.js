import express from "express";
import { createBlog, getAllBlogs } from "../controllers/blogcontroller.js";

const router = express.Router();

// Route to create a new blog post
router.post("/", createBlog);

// Route to get all blog posts
router.get("/", getAllBlogs);

export default router;
