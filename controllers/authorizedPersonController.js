const csvParser = require('csv-parser');
const axios = require('axios');
const AuthorizedPerson = require('../models/AuthorizedPerson');

exports.addAuthorizedPerson = async (req, res) => {
  try {
    const { name, code } = req.body;

    if (!name || !code || !req.body.siteId) {
      return res.status(400).json({ success: false, message: "Name, Code, and siteId are required." });
    }

    const existingPerson = await AuthorizedPerson.findOne({ code, siteId: req.body.siteId });
    if (existingPerson) {
      return res.status(400).json({ success: false, message: "Code already exists for this site." });
    }

    const newPerson = await AuthorizedPerson.create({ name, code, siteId: req.body.siteId });

    return res.status(201).json({ success: true, message: "Authorized person added successfully.", data: newPerson });
  } catch (error) {
    console.error("Add Authorized Person Error:", error);
    return res.status(500).json({ success: false, message: "Internal server error." });
  }
};

exports.validateAuthorizedPerson = async (req, res) => {
  try {
    let { name, code, siteId } = req.body;

    if (!name || !code) {
      return res.status(400).json({ success: false, message: "Name and Code are required." });
    }

    // Trim whitespace to prevent validation failures due to accidental spaces
    name = name.trim();
    code = code.trim();

    // Use a safer regex that escapes special characters and matches the full string case-insensitively
    const person = await AuthorizedPerson.findOne({
      name: { $regex: new RegExp("^" + name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + "$", "i") },
      code,
      siteId
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

    const response = await axios({
      method: "get",
      url: req.file.path,
      responseType: "stream"
    });

    const results = [];
    response.data
      .pipe(csvParser())
      .on('data', (data) => results.push(data))
      .on('error', (error) => {
        console.error("CSV Parse Error:", error);
        return res.status(500).json({ success: false, message: "Error parsing CSV file." });
      })
      .on('end', async () => {
        let addedCount = 0;
        let skippedCount = 0;

        for (const row of results) {
          const name = row.name || row.Name || row.NAME;
          const code = row.code || row.Code || row.CODE;

          if (name && code && req.body.siteId) {
            const existing = await AuthorizedPerson.findOne({ code, siteId: req.body.siteId });
            if (!existing) {
              await AuthorizedPerson.create({ name, code, siteId: req.body.siteId });

              addedCount++;
            } else {
              skippedCount++;
            }
          } else {
             skippedCount++;
          }
        }

        // Cloudinary file cleanup is optional/handled via dashboard
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
    const { siteId } = req.query;
    const query = siteId ? { siteId } : {};
    const persons = await AuthorizedPerson.find(query).sort({ createdAt: -1 });

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
      const existing = await AuthorizedPerson.findOne({ code, siteId: person.siteId });
      if (existing) {
        return res.status(400).json({ success: false, message: "Code already exists for this site." });
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
