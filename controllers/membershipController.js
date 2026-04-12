const MembershipEnquiry = require('../models/MembershipEnquiry');
const { getTargetEmail } = require('../utils/emailMapper');
const { sendEmail } = require('../utils/mailService');

exports.submitMembership = async (req, res) => {
    try {
        const body = req.body || {};
        console.log(`📩 New [Membership] request for site: ${body.siteId || "ParekhChamberofTextile01"}`);
        const file = req.file ? req.file.path.replace(/\\/g, "/") : null;
        
        const { 
            authorizedOfficialName, officialCodeNo,
            applicantName, businessTitle, businessAddress, mobileNo, emailId, websiteUrl,
            natureOfBusiness, categoryOfBusiness, siteId
        } = body;

        const currentSiteId = siteId || "ParekhChamberofTextile01";

        const newEntry = await MembershipEnquiry.create({
            authorizedOfficialName, officialCodeNo,
            applicantName, businessTitle, businessAddress, mobileNo, emailId, websiteUrl,
            natureOfBusiness, categoryOfBusiness,
            uploadedDocument: file,
            siteId: currentSiteId
        });

        // Dynamic Email Routing
        const targetEmail = getTargetEmail(currentSiteId, 'membership');

        const attachments = file ? [{
            filename: req.file.originalname,
            path: file
        }] : [];

        const mailOptions = {
            from: `"${currentSiteId} Portal" <${process.env.EMAIL_USER}>`,
            to: targetEmail,
            subject: `New Membership Application | ${applicantName} | ${currentSiteId}`,
            html: `
                <h2>Membership Enrollment Request</h2>
                <div style="background:#f9f9f9; padding:20px; border-radius:10px; border-left:5px solid #d97706;">
                    <p><strong>Source Website:</strong> ${currentSiteId}</p>
                    <hr/>
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

        sendEmail(mailOptions).catch(err => console.error("Email Error:", err.message));

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
