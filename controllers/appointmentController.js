// controllers/appointmentController.js
const Appointment = require("../models/Appointment");
const nodemailer = require("nodemailer");

exports.createAppointment = async (req, res) => {
  try {
    const body = req.body || {};
    const { siteId, visitorName, businessName, visitorAddress, mobileNo, email, proofType, reasonForVisit } = body;
    const file = req.file;

    if (!siteId || !visitorName || !mobileNo || !email || !reasonForVisit) {
      return res.status(400).json({
        success: false,
        message: "Required fields are missing."
      });
    }

    // Target Email Configured For Testing
    const targetEmail = "sumitofficial444@gmail.com";

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

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
          user: process.env.EMAIL_USER, // sumitkumarsahu141@gmail.com
          pass: process.env.EMAIL_PASS
      },
      tls: {
          rejectUnauthorized: false
      }
    });

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

    // Send email in background to avoid long waiting time for the user (Thoda fast krne ke liye)
    transporter.sendMail(mailOptions)
      .then(() => console.log("Email Notification Sent Successfully!"))
      .catch((emailError) => console.error("Email Error:", emailError.message));

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