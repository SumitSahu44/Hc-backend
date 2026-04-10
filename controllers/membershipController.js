const MembershipEnquiry = require('../models/MembershipEnquiry');
const nodemailer = require('nodemailer');

const targetEmail = "sumitofficial444@gmail.com";

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

exports.submitMembership = async (req, res) => {
    try {
        const body = req.body || {};
        const file = req.file ? req.file.path.replace(/\\/g, "/") : null;
        
        const { 
            authorizedOfficialName, officialCodeNo,
            applicantName, businessTitle, businessAddress, mobileNo, emailId, websiteUrl,
            natureOfBusiness, categoryOfBusiness, siteId
        } = body;

        const newEntry = await MembershipEnquiry.create({
            authorizedOfficialName, officialCodeNo,
            applicantName, businessTitle, businessAddress, mobileNo, emailId, websiteUrl,
            natureOfBusiness, categoryOfBusiness,
            uploadedDocument: file,
            siteId: siteId || "ParekhChamberofTextile01"
        });

        const transporter = createTransporter();
        const attachments = file ? [{
            filename: req.file.originalname,
            path: file
        }] : [];

        const mailOptions = {
            from: `"Chamber Membership Portal" <sumitkumarsahu141@gmail.com>`,
            to: targetEmail,
            subject: `New Membership Application | ${applicantName}`,
            html: `
                <h2>Membership Enrollment Request</h2>
                <div style="background:#f9f9f9; padding:20px; border-radius:10px; border-left:5px solid #d97706;">
                    <h3>Chamber Official Details</h3>
                    <p><strong>Official name:</strong> ${authorizedOfficialName}</p>
                    <p><strong>Official Code:</strong> ${officialCodeNo}</p>
                    <hr/>
                    <h3>Applicant Information</h3>
                    <p><strong>Name:</strong> ${applicantName}</p>
                    <p><strong>Business Title:</strong> ${businessTitle}</p>
                    <p><strong>Address:</strong> ${businessAddress}</p>
                    <p><strong>Contact:</strong> ${mobileNo} | ${emailId}</p>
                    <p><strong>Website:</strong> ${websiteUrl || 'N/A'}</p>
                    <p><strong>Nature of Bus:</strong> ${natureOfBusiness}</p>
                    <p><strong>Category:</strong> ${categoryOfBusiness}</p>
                </div>
            `,
            attachments
        };

        transporter.sendMail(mailOptions).catch(err => console.error("Email Error:", err.message));

        return res.status(201).json({ success: true, message: "Membership application submitted successfully.", data: newEntry });
    } catch (error) {
        console.error("Submit Membership Error:", error);
        return res.status(500).json({ success: false, message: "Internal server error." });
    }
};

exports.getMemberships = async (req, res) => {
    try {
        const { siteId } = req.query;
        const filter = siteId ? { siteId } : {};
        const data = await MembershipEnquiry.find(filter).sort({ createdAt: -1 });
        return res.status(200).json({ success: true, data });
    } catch (error) {
        console.error("Get Memberships Error:", error);
        return res.status(500).json({ success: false, message: "Internal server error." });
    }
};
