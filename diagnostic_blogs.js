require("dotenv").config();
const mongoose = require("mongoose");
const Blog = require("./models/Blog");

async function checkBlogs() {
  await mongoose.connect(process.env.MONGO_URI);
  const blogs = await Blog.find({});
  console.log("Total Blogs:", blogs.length);
  blogs.forEach(b => {
    console.log(`ID: ${b._id}, Title: ${b.title}, Site: ${b.siteId}, Status: ${b.status}`);
  });
  process.exit();
}

checkBlogs();
