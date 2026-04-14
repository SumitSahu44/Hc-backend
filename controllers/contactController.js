// controllers/contactController.js
const Contact = require("../models/Contact");

exports.createContact = async (req, res) => {
  try {
    const { name, email, message, website } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "name, email, and message are required fields."
      });
    }

    console.log("📩 Contact Form Data Received:");
    console.log({ name, email, message, website });

    const newContact = await Contact.create({ 
      name, 
      email, 
      message, 
      website,
      siteId: website // Use website as siteId for consistency
    });

    return res.status(200).json({
      success: true,
      message: "Contact form received successfully.",
      data: newContact
    });

  } catch (error) {
    console.error("❌ Contact Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error."
    });
  }
};
exports.deleteContact = async (req, res) => {
    try {
        const contact = await Contact.findByIdAndDelete(req.params.id);
        if (!contact) {
            return res.status(404).json({ success: false, message: "Contact entry not found" });
        }
        res.status(200).json({ success: true, message: "Contact entry deleted successfully" });
    } catch (error) {
        console.error("Delete Contact Error:", error);
        res.status(500).json({ success: false, message: "Internal server error." });
    }
};

exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: contacts });
  } catch (error) {
    console.error("Get Contacts Error:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};