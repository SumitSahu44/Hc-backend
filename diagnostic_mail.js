require('dotenv').config();
const { sendEmail } = require('./utils/mailService');
const { getTargetEmail } = require('./utils/emailMapper');

async function testDiagnostics() {
  console.log("--- Email Diagnostics ---");
  console.log("EMAIL_USER:", process.env.EMAIL_USER);
  console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "PRESENT" : "MISSING");

  const siteId = 'ParekhChamberofTextile01';
  const targetEmail = getTargetEmail(siteId, 'trade-enquiry');
  console.log("Target Email for Chamber3 Trade Enquiry:", targetEmail);

  const mailOptions = {
    from: `"Diagnostic Bot" <${process.env.EMAIL_USER}>`,
    to: 'sumitofficial444@gmail.com', // Test recipient
    subject: "Diagnostic Test",
    text: "This is a test to verify mailService functionality."
  };

  try {
    console.log("Attempting to send test email...");
    await sendEmail(mailOptions);
    console.log("✅ Diagnostics passed!");
  } catch (error) {
    console.error("❌ Diagnostics failed:", error.message);
  }
}

testDiagnostics();
