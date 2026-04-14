const Quotation = require('../models/Quotation');
const { getTargetEmail } = require('../utils/emailMapper');
const { sendEmail } = require('../utils/mailService');

const submitQuotation = async (req, res) => {
    try {
        const body = req.body || {};
        console.log(`📩 New [e-Quotation] request for site: ${body.siteId}`);
        const { siteId, traderName, businessName, businessAddress, gstNo, mobileNo, email, quotationType, particulars } = body;
        const file = req.file;

        if (!siteId) {
            return res.status(400).json({ message: "siteId is missing!" });
        }

        // Dynamic Email Routing
        const targetEmail = getTargetEmail(siteId, 'equotation');

        const newQuotation = new Quotation({
            siteId,
            traderName,
            businessName,
            businessAddress,
            gstNo,
            mobileNo,
            email,
            quotationType,
            particulars,
            gstCertificate: file ? file.path : null
        });

        await newQuotation.save();

        const mailOptions = {
            from: `"${siteId} Portal" <${process.env.EMAIL_USER}>`,
            to: targetEmail,
            subject: `New e-Quotation Request | ${businessName} | ${siteId}`,
            html: `
                <h2>New e-Quotation Request Received</h2>
                <p><strong>Source Website:</strong> ${siteId}</p>
                <hr/>
                <p><strong>Trader Name:</strong> ${traderName}</p>
                <p><strong>Business:</strong> ${businessName}</p>
                <p><strong>GST No:</strong> ${gstNo}</p>
                <p><strong>Contact:</strong> ${mobileNo} | ${email}</p>
                <p><strong>Type:</strong> ${quotationType}</p>
                <p><strong>Address:</strong> ${businessAddress}</p>
                <p><strong>Particulars:</strong> ${particulars}</p>
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

        res.status(200).json({
            success: true,
            message: "Quotation submitted successfully."
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

const getQuotations = async (req, res) => {
    try {
        const quotations = await Quotation.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: quotations });
    } catch (error) {
        console.error("Get Quotations Error:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

const deleteQuotation = async (req, res) => {
    try {
        const quotation = await Quotation.findByIdAndDelete(req.params.id);
        if (!quotation) {
            return res.status(404).json({ success: false, message: "Quotation not found" });
        }
        res.status(200).json({ success: true, message: "Quotation deleted successfully" });
    } catch (error) {
        console.error("Delete Quotation Error:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

module.exports = { submitQuotation, getQuotations, deleteQuotation };

