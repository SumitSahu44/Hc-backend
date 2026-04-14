// routes/contactRoutes.js
const router = require("express").Router();
const { createContact, getContacts, deleteContact } = require("../controllers/contactController");

router.post("/", createContact);
router.get("/", getContacts);
router.delete("/:id", deleteContact);

module.exports = router;