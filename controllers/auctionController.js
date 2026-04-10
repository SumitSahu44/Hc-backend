const Auction = require('../models/Auction');
const nodemailer = require('nodemailer');

const submitAuction = async (req, res) => {
    try {
        const body = req.body || {};
        const { siteId, participantName, legalBusinessName, businessAddress, gstNo, mobileNo, email } = body;
        const file = req.file;

        if (!siteId) {
            return res.status(400).json({ message: "siteId is missing!" });
        }

        // Target Email Configured For Testing
        const targetEmail = "sumitofficial444@gmail.com";

        const newAuction = new Auction({
            siteId,
            participantName,
            legalBusinessName,
            businessAddress,
            gstNo,
            mobileNo,
            email,
            gstCertificate: file ? file.path : null
        });

        await newAuction.save();

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
            subject: `New e-Auction Participation | ${legalBusinessName} | ${siteId}`,
            html: `
                <h2>New e-Auction Participation Request</h2>
                <p><strong>Source Website:</strong> ${siteId}</p>
                <hr/>
                <p><strong>Participant Name:</strong> ${participantName}</p>
                <p><strong>Business:</strong> ${legalBusinessName}</p>
                <p><strong>GST No:</strong> ${gstNo}</p>
                <p><strong>Contact:</strong> ${mobileNo} | ${email}</p>
                <p><strong>Address:</strong> ${businessAddress}</p>
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

        res.status(200).json({
            success: true,
            message: "Auction participation submitted successfully."
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

const getAuctions = async (req, res) => {
    try {
        const auctions = await Auction.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: auctions });
    } catch (error) {
        console.error("Get Auctions Error:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

module.exports = { submitAuction, getAuctions };

