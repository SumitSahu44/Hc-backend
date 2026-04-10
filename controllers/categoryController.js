const Category = require("../models/Category");

exports.getCategories = async (req, res) => {
  try {
    const { siteId } = req.query;
    const filter = siteId ? { siteId } : {};
    
    const categories = await Category.find(filter).sort({ name: 1 });
    res.status(200).json({ success: true, data: categories });
  } catch (error) {
    console.error("Get Categories Error:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

exports.addCategory = async (req, res) => {
  try {
    const { name, siteId } = req.body;

    if (!name || !siteId) {
      return res.status(400).json({ success: false, message: "Name and Site ID are required." });
    }

    const newCategory = await Category.create({ name, siteId });
    res.status(201).json({ success: true, data: newCategory });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ success: false, message: "Category name already exists for this site." });
    }
    console.error("Add Category Error:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, siteId } = req.body;

    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { name, siteId },
      { new: true, runValidators: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ success: false, message: "Category not found." });
    }

    res.status(200).json({ success: true, data: updatedCategory });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ success: false, message: "Category name already exists for this site." });
    }
    console.error("Update Category Error:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCategory = await Category.findByIdAndDelete(id);

    if (!deletedCategory) {
      return res.status(404).json({ success: false, message: "Category not found." });
    }

    res.status(200).json({ success: true, message: "Category deleted successfully." });
  } catch (error) {
    console.error("Delete Category Error:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};
