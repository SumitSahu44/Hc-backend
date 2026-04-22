const TradeEnquiry = require('../models/TradeEnquiry'); // Model import
const { getTargetEmail } = require('../utils/emailMapper');
const { sendEmail } = require('../utils/mailService');

const submitTradeEnquiry = async (req, res) => {
    try {
        const body = req.body || {};
        console.log(`📩 New [Trade Enquiry] request for site: ${body.siteId}`);
        // 1. Data Extract karo (Frontend se FormData ya JSON aayega)
        const { siteId, traderName, businessName, businessAddress, gstNo, mobileNo, email, enquiryType, gstCertificate } = body;
        const file = req.file; // Multer handled file

        if (!siteId) {
            return res.status(400).json({ message: "siteId is missing!" });
        }

        // 2. Routing Logic
        const targetEmail = getTargetEmail(siteId, 'trade-enquiry');

        if (!targetEmail) {
            console.error(`Alert: No email configured for Site ID: ${siteId}`);
        }

        // 3. MongoDB Compass mein Store karo
        const newEnquiry = new TradeEnquiry({
            siteId,
            traderName,
            businessName,
            businessAddress,
            gstNo,
            mobileNo,
            email,
            enquiryType,
            gstCertificate: file ? file.path : (gstCertificate || null)
        });

        await newEnquiry.save();

        // 4. Email Notification bhejo
        const mailOptions = {
            from: `"${siteId} Portal" <${process.env.EMAIL_USER}>`,
            to: targetEmail,
            subject: `New Trade Enquiry | ${businessName} | ${siteId}`,
            html: `
                <h2>New Business Enquiry Received</h2>
                <p><strong>Source Website:</strong> ${siteId}</p>
                <hr/>
                <p><strong>Trader Name:</strong> ${traderName}</p>
                <p><strong>Business:</strong> ${businessName}</p>
                <p><strong>GST No:</strong> ${gstNo}</p>
                <p><strong>Contact:</strong> ${mobileNo} | ${email}</p>
                <p><strong>Type:</strong> ${enquiryType}</p>
                <p><strong>Address:</strong> ${businessAddress}</p>
                ${file ? `<p><strong>Uploaded Document:</strong> <a href="${file.path}">View Attachment</a></p>` : ''}
                <br/>
                <br/>
                <p><i>Data has been saved to MongoDB Compass.</i></p>
            `,
            attachments: file ? [{ 
                filename: file.originalname, 
                path: file.path 
            }] : []
        };

        // Send email in background
        sendEmail(mailOptions).catch((emailError) => console.error("Email Error:", emailError.message));

        // 5. Final Response
        res.status(200).json({
            success: true,
            message: "Enquiry submitted successfully and recorded in DB."
        });

    } catch (error) {
        console.error("Controller Error:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
};

const getTradeEnquiries = async (req, res) => {
    try {
        const enquiries = await TradeEnquiry.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: enquiries });
    } catch (error) {
        console.error("Get Trade Enquiries Error:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

const deleteTradeEnquiry = async (req, res) => {
    try {
        const enquiry = await TradeEnquiry.findByIdAndDelete(req.params.id);
        if (!enquiry) {
            return res.status(404).json({ success: false, message: "Enquiry not found" });
        }
        res.status(200).json({ success: true, message: "Enquiry deleted successfully" });
    } catch (error) {
        console.error("Delete Trade Enquiry Error:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

module.exports = { submitTradeEnquiry, getTradeEnquiries, deleteTradeEnquiry };
