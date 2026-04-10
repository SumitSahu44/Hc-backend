const Product = require("../models/Product");
const fs = require("fs");
const path = require("path");

exports.getProducts = async (req, res) => {
  try {
    const { siteId } = req.query;
    const filter = siteId ? { siteId } : {};
    
    const products = await Product.find(filter).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error("Get Products Error:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

exports.addProduct = async (req, res) => {
  try {
    const { title, category, siteId } = req.body;
    const image = req.file ? req.file.path.replace(/\\/g, "/") : null;

    if (!title || !category || !siteId || !image) {
      if (image) fs.unlinkSync(image); // Delete uploaded file if validation fails
      return res.status(400).json({ success: false, message: "All fields and image are required." });
    }

    const newProduct = await Product.create({
      title,
      category,
      siteId,
      image
    });

    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.error("Add Product Error:", error);
    if (req.file) fs.unlinkSync(req.file.path);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found." });
    }

    // Delete image file from server
    if (product.image && fs.existsSync(product.image)) {
      fs.unlinkSync(product.image);
    }

    await Product.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Product deleted successfully." });
  } catch (error) {
    console.error("Delete Product Error:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, category, siteId } = req.body;
    const product = await Product.findById(id);

    if (!product) {
      if (req.file) fs.unlinkSync(req.file.path);
      return res.status(404).json({ success: false, message: "Product not found." });
    }

    let image = product.image;
    if (req.file) {
      // Delete old image
      if (product.image && fs.existsSync(product.image)) {
        fs.unlinkSync(product.image);
      }
      image = req.file.path.replace(/\\/g, "/");
    }

    product.title = title || product.title;
    product.category = category || product.category;
    product.siteId = siteId || product.siteId;
    product.image = image;

    await product.save();

    res.status(200).json({ success: true, message: "Product updated successfully.", data: product });
  } catch (error) {
    console.error("Update Product Error:", error);
    if (req.file) fs.unlinkSync(req.file.path);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};
