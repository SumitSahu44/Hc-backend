const fs = require('fs');
const csvParser = require('csv-parser');
const AuthorizedPerson = require('../models/AuthorizedPerson');

exports.addAuthorizedPerson = async (req, res) => {
  try {
    const { name, code } = req.body;

    if (!name || !code) {
      return res.status(400).json({ success: false, message: "Name and Code are required." });
    }

    const existingPerson = await AuthorizedPerson.findOne({ code });
    if (existingPerson) {
      return res.status(400).json({ success: false, message: "Code already exists." });
    }

    const newPerson = await AuthorizedPerson.create({ name, code });
    return res.status(201).json({ success: true, message: "Authorized person added successfully.", data: newPerson });
  } catch (error) {
    console.error("Add Authorized Person Error:", error);
    return res.status(500).json({ success: false, message: "Internal server error." });
  }
};

exports.validateAuthorizedPerson = async (req, res) => {
  try {
    const { name, code } = req.body;

    if (!name || !code) {
      return res.status(400).json({ success: false, message: "Name and Code are required." });
    }

    // Case-insensitive matching for name just in case, but code is strict
    const person = await AuthorizedPerson.findOne({
      name: { $regex: new RegExp("^" + name + "$", "i") },
      code
    });

    if (!person) {
      return res.status(401).json({ success: false, message: "Invalid credentials. Authorized person not found." });
    }

    return res.status(200).json({ success: true, message: "Validation successful.", data: person });
  } catch (error) {
    console.error("Validate Authorized Person Error:", error);
    return res.status(500).json({ success: false, message: "Internal server error." });
  }
};

exports.bulkUploadAuthorizedPersons = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "Please upload a CSV file." });
    }

    const results = [];
    fs.createReadStream(req.file.path)
      .pipe(csvParser())
      .on('data', (data) => results.push(data))
      .on('end', async () => {
        let addedCount = 0;
        let skippedCount = 0;

        for (const row of results) {
          // Assuming CSV headers are exactly 'name' and 'code'
          const name = row.name || row.Name || row.NAME;
          const code = row.code || row.Code || row.CODE;

          if (name && code) {
            const existing = await AuthorizedPerson.findOne({ code });
            if (!existing) {
              await AuthorizedPerson.create({ name, code });
              addedCount++;
            } else {
              skippedCount++;
            }
          } else {
             skippedCount++;
          }
        }

        fs.unlinkSync(req.file.path); // remove the file after parsing

        return res.status(200).json({
          success: true,
          message: `Bulk upload completed. Added: ${addedCount}, Skipped/Duplicates: ${skippedCount}`
        });
      });
  } catch (error) {
    console.error("Bulk Upload Error:", error);
    return res.status(500).json({ success: false, message: "Internal server error." });
  }
};

exports.getAuthorizedPersons = async (req, res) => {
  try {
    const persons = await AuthorizedPerson.find().sort({ createdAt: -1 });
    return res.status(200).json({ success: true, data: persons });
  } catch (error) {
    console.error("Get Authorized Persons Error:", error);
    return res.status(500).json({ success: false, message: "Internal server error." });
  }
};

exports.updateAuthorizedPerson = async (req, res) => {
  try {
    const { name, code } = req.body;
    const { id } = req.params;

    const person = await AuthorizedPerson.findById(id);
    if (!person) {
      return res.status(404).json({ success: false, message: "Authorized person not found." });
    }

    if (code !== person.code) {
      const existing = await AuthorizedPerson.findOne({ code });
      if (existing) {
        return res.status(400).json({ success: false, message: "Code already exists." });
      }
    }

    person.name = name || person.name;
    person.code = code || person.code;
    await person.save();

    return res.status(200).json({ success: true, message: "Authorized person updated successfully.", data: person });
  } catch (error) {
    console.error("Update Authorized Person Error:", error);
    return res.status(500).json({ success: false, message: "Internal server error." });
  }
};

exports.deleteAuthorizedPerson = async (req, res) => {
  try {
    const { id } = req.params;
    const person = await AuthorizedPerson.findByIdAndDelete(id);
    if (!person) {
      return res.status(404).json({ success: false, message: "Authorized person not found." });
    }
    return res.status(200).json({ success: true, message: "Authorized person deleted successfully." });
  } catch (error) {
    console.error("Delete Authorized Person Error:", error);
    return res.status(500).json({ success: false, message: "Internal server error." });
  }
};
