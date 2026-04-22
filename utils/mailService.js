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
    console.log(`📤 Attempting to send email to: ${mailOptions.to} | Subject: ${mailOptions.subject}`);

    // Attempt to send email
    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email Notification Sent Successfully! Message ID:", info.messageId);
    return info;
  } catch (error) {
    if (error.code === 'ESTREAM') {
      console.warn("⚠️ Attachment fetch failed (likely Cloudinary 401). Retrying without attachment...");
      const fallbackOptions = { ...mailOptions, attachments: [] };
      try {
        const info = await createTransporter().sendMail(fallbackOptions);
        console.log("✅ Email sent successfully (WITHOUT attachment fallback).");
        return info;
      } catch (fallbackError) {
        console.error("❌ Fallback Email Error:", fallbackError.message);
        throw fallbackError;
      }
    }

    console.error("❌ Email Error Details:", {
      message: error.message,
      code: error.code,
      responseCode: error.responseCode,
      command: error.command
    });
    throw error;
  }
};
