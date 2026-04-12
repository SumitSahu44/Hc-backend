const nodemailer = require('nodemailer');

const createTransporter = () => {
  return nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    },
    tls: {
      rejectUnauthorized: false
    }
  });
};

/**
 * Common sendMail function to avoid repetition.
 * @param {Object} mailOptions - Nodemailer mail options
 */
exports.sendEmail = async (mailOptions) => {
  try {
    const transporter = createTransporter();
    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email Notification Sent Successfully! Message ID:", info.messageId);
    return info;
  } catch (error) {
    console.error("❌ Email Error:", error.message);
    throw error;
  }
};
