const Quotation = require('../models/Quotation');
const nodemailer = require('nodemailer');

const submitQuotation = async (req, res) => {
    try {
        const body = req.body || {};
        const { siteId, traderName, businessName, businessAddress, gstNo, mobileNo, email, quotationType, particulars } = body;
        const file = req.file;

        if (!siteId) {
            return res.status(400).json({ message: "siteId is missing!" });
        }

        // Domain based target email mapping (Testing purpose hardcoded)
        const targetEmail = "sumitofficial444@gmail.com";

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
            subject: `New Quotation Request | ${businessName} | ${siteId}`,
            html: `
                <h2>New Quotation Request Received</h2>
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

        // Send email in background to avoid long waiting time for the user (Thoda fast krne ke liye)
        transporter.sendMail(mailOptions)
            .then(() => console.log("Email Notification Sent Successfully!"))
            .catch((emailError) => console.error("Email Error:", emailError.message));

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

module.exports = { submitQuotation, getQuotations };

