const Blog = require("../models/Blog");
const fs = require("fs");
const path = require("path");

// @desc Get all blogs (optionally filtered by siteId and/or status)
// @route GET /api/blogs
exports.getBlogs = async (req, res) => {
  try {
    const { siteId, status } = req.query;
    const query = {};
    if (siteId) query.siteId = siteId;
    if (status) query.status = status;

    const blogs = await Blog.find(query).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: blogs
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc Add a new blog
// @route POST /api/blogs
exports.addBlog = async (req, res) => {
  try {
    const { title, content, author, status, siteId, date } = req.body;
    
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a thumbnail image."
      });
    }

    const thumbnail = req.file.path;

    const newBlog = new Blog({
      title,
      content,
      author: author || "Admin",
      thumbnail,
      status: status || "Draft",
      siteId,
      date: date || Date.now()
    });

    await newBlog.save();

    res.status(201).json({
      success: true,
      data: newBlog
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc Delete a blog
// @route DELETE /api/blogs/:id
exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found."
      });
    }

    // Delete logic for Cloudinary could be added here

    await Blog.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Blog deleted successfully."
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc Update a blog
// @route PUT /api/blogs/:id
exports.updateBlog = async (req, res) => {
    try {
      const { title, content, author, status, siteId, date } = req.body;
      const blog = await Blog.findById(req.params.id);
      
      if (!blog) {
        return res.status(404).json({
          success: false,
          message: "Blog not found."
        });
      }
  
      let thumbnail = blog.thumbnail;
      if (req.file) {
        thumbnail = req.file.path;
      }
  
      const updatedBlog = await Blog.findByIdAndUpdate(
        req.params.id,
        {
          title,
          content,
          author,
          status,
          siteId,
          thumbnail,
          date: date || blog.date
        },
        { returnDocument: "after" }
      );
  
      res.status(200).json({
        success: true,
        data: updatedBlog
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  };
