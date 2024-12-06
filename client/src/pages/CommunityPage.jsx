import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";


const CommunityPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState({ title: "", content: "", author: "" });

  // Fetch all blogs from the backend
  useEffect(() => {
  axios
    .get("http://localhost:3000/api/blogs") // Use the correct backend URL
    .then((response) => {
      setBlogs(response.data.blogs || []); // Handle potential response format variations
    })
    .catch((error) => console.error("Error fetching blogs:", error));
}, []);

  // Handle input changes for new blog
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewBlog((prevBlog) => ({ ...prevBlog, [name]: value }));
  };

  // Handle blog submission
  const handleSubmit = (e) => {
  e.preventDefault();

  axios
    .post("http://localhost:3000/api/blogs", newBlog) // Use the correct backend URL
    .then((response) => {
      setBlogs((prevBlogs) => [...prevBlogs, response.data.blog]); // Add new blog to state
      setNewBlog({ title: "", content: "", author: "" }); // Clear form
    })
    .catch((error) => console.error("Error posting blog:", error));
};

  return (
    
    
    <div className="container mx-auto p-6">
      
      <h1 className="text-3xl font-bold mb-4">Community Blogs</h1>

      {/* Blog Form */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Post a Blog</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-lg">Title</label>
            <input
              type="text"
              name="title"
              value={newBlog.title}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="content" className="block text-lg">Content</label>
            <textarea
              name="content"
              value={newBlog.content}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="author" className="block text-lg">Author</label>
            <input
              type="text"
              name="author"
              value={newBlog.author}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <button type="submit" className="bg-teal-600 text-white py-2 px-4 rounded-lg">
            Post Blog
          </button>
        </form>
      </div>

      {/* Display Blogs */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Latest Blogs</h2>
        <div className="space-y-4">
          {blogs.map((blog, index) => (
  <div key={blog._id || index} className="bg-white p-4 rounded-lg shadow-md">
    <h3 className="text-2xl font-semibold text-teal-600">{blog.title}</h3>
    <p className="text-sm text-gray-600">By {blog.author}</p>
    <p className="mt-2 text-gray-800">{blog.content}</p>
  </div>
))}

        </div>
      </div>
    </div>
  );
};

export default CommunityPage;
