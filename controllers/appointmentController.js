// controllers/appointmentController.js
const Appointment = require("../models/Appointment");
const { getTargetEmail } = require("../utils/emailMapper");
const { sendEmail } = require("../utils/mailService");

exports.createAppointment = async (req, res) => {
  try {
    const body = req.body || {};
    console.log(`📩 New [Appointment] request for site: ${body.siteId}`);
    const { siteId, visitorName, businessName, visitorAddress, mobileNo, email, proofType, reasonForVisit } = body;
    const file = req.file;

    if (!siteId || !visitorName || !mobileNo || !email || !reasonForVisit) {
      return res.status(400).json({
        success: false,
        message: "Required fields are missing."
      });
    }

    // Dynamic Email Routing
    const targetEmail = getTargetEmail(siteId, 'appointment');

    const newAppointment = new Appointment({
      siteId,
      visitorName,
      businessName,
      visitorAddress,
      mobileNo,
      email,
      proofType,
      proofFile: file ? file.path : null,
      reasonForVisit
    });

    await newAppointment.save();

    const mailOptions = {
      from: `"${siteId} Portal" <sumitkumarsahu141@gmail.com>`,
      to: targetEmail,
      subject: `New Visit Appointment | ${visitorName} | ${siteId}`,
      html: `
          <h2>New Visit Appointment Request</h2>
          <p><strong>Source Website:</strong> ${siteId}</p>
          <hr/>
          <p><strong>Visitor Name:</strong> ${visitorName}</p>
          <p><strong>Business:</strong> ${businessName}</p>
          <p><strong>Contact:</strong> ${mobileNo} | ${email}</p>
          <p><strong>Address:</strong> ${visitorAddress}</p>
          <p><strong>Proof Type:</strong> ${proofType}</p>
          <p><strong>Reason for Visit:</strong> ${reasonForVisit}</p>
          <br/>
          <br/>
          <p><i>Data has been saved to MongoDB.</i></p>
      `,
      attachments: file ? [{ 
          filename: file.originalname, 
          content: require('fs').readFileSync(file.path) 
      }] : []
    };

    // Send email in background
    sendEmail(mailOptions).catch((emailError) => console.error("Email Error:", emailError.message));

    return res.status(201).json({
      success: true,
      message: "Appointment booked successfully.",
      data: newAppointment
    });

  } catch (error) {
    console.error("❌ Appointment Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later."
    });
  }
};

exports.getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: appointments });
  } catch (error) {
    console.error("Get Appointments Error:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};