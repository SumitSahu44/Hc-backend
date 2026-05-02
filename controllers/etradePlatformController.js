const EtradeBuyer = require('../models/EtradeBuyer');
const EtradeSeller = require('../models/EtradeSeller');
const { getTargetEmail } = require('../utils/emailMapper');
const { sendEmail } = require('../utils/mailService');

exports.submitBuyerPlatform = async (req, res) => {
    try {
        const body = req.body || {};
        const files = req.files || []; // from multer's .array()

        const {
            authorizedPersonId,
            buyerName, businessTitle, businessAddress, mobileNo, emailId, websiteUrl,
            natureOfBusiness, categoryOfBusiness, chamberMembership,
            textileItemsToBuy, itemDescription, requiredQuantity, tentativeRate, tentativeBudget,
            siteId
        } = body;

        if (!authorizedPersonId) {
            return res.status(400).json({ success: false, message: "Authorized Person ID is required." });
        }

        const kycDocuments = files.map(file => file.path);

        const newBuyer = await EtradeBuyer.create({
            authorizedPerson: authorizedPersonId,
            buyerName, businessTitle, businessAddress, mobileNo, emailId, websiteUrl,
            natureOfBusiness, categoryOfBusiness, chamberMembership, kycDocuments,
            textileItemsToBuy, itemDescription, requiredQuantity, tentativeRate, tentativeBudget,
            siteId: siteId || websiteUrl // Consistent filtering
        });

        // Populate to get Authorized Person details for email
        await newBuyer.populate('authorizedPerson');

        const attachments = files.map(file => ({
            filename: file.originalname,
            path: file.path
        }));

        const mailOptions = {
            from: `"etrade Buyer Portal" <${process.env.EMAIL_USER}>`,
            to: getTargetEmail(siteId, 'buyer'),
            subject: `New etrade Buyer Registration | ${buyerName}`,
            html: `
                <div style="font-family: sans-serif; line-height: 1.5; color: #333;">
                    <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">New etrade Buyer Application</h2>
                    <p><strong>Admin Validator:</strong> ${newBuyer.authorizedPerson ? newBuyer.authorizedPerson.name + ' (' + newBuyer.authorizedPerson.code + ')' : 'N/A'}</p>
                    
                    <h3 style="background: #f0f4f8; padding: 8px; border-radius: 4px;">Business Details</h3>
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr><td style="width: 150px; font-weight: bold;">Buyer Name:</td><td>${buyerName}</td></tr>
                        <tr><td style="font-weight: bold;">Business Title:</td><td>${businessTitle}</td></tr>
                        <tr><td style="font-weight: bold;">Address:</td><td>${businessAddress}</td></tr>
                        <tr><td style="font-weight: bold;">Mobile No:</td><td>${mobileNo}</td></tr>
                        <tr><td style="font-weight: bold;">Email ID:</td><td>${emailId}</td></tr>
                        <tr><td style="font-weight: bold;">Website URL:</td><td>${websiteUrl || 'N/A'}</td></tr>
                        <tr><td style="font-weight: bold;">Nature of Bus:</td><td>${natureOfBusiness}</td></tr>
                        <tr><td style="font-weight: bold;">Category:</td><td>${categoryOfBusiness}</td></tr>
                        <tr><td style="font-weight: bold;">Chamber Mem:</td><td>${chamberMembership || 'N/A'}</td></tr>
                    </table>

                    <h3 style="background: #f0f4f8; padding: 8px; border-radius: 4px;">Requirement Details</h3>
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr><td style="width: 150px; font-weight: bold;">Items to Buy:</td><td>${textileItemsToBuy}</td></tr>
                        <tr><td style="font-weight: bold;">Description:</td><td>${itemDescription || 'N/A'}</td></tr>
                        <tr><td style="font-weight: bold;">Quantity:</td><td>${requiredQuantity}</td></tr>
                        <tr><td style="font-weight: bold;">Tentative Rate:</td><td>${tentativeRate || 'N/A'}</td></tr>
                        <tr><td style="font-weight: bold;">Tentative Budget:</td><td>${tentativeBudget || 'N/A'}</td></tr>
                    </table>
                    
                    <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
                    <p style="font-size: 12px; color: #666;">Site ID: ${siteId}</p>
                </div>
            `,
            attachments
        };

        sendEmail(mailOptions).catch(err => console.error("Email Error:", err.message));

        return res.status(201).json({ success: true, message: "Buyer form submitted successfully.", data: newBuyer });
    } catch (error) {
        console.error("Submit Buyer Error:", error);
        return res.status(500).json({ success: false, message: "Internal server error." });
    }
};

exports.submitSellerPlatform = async (req, res) => {
    try {
        const body = req.body || {};
        const files = req.files || []; // from multer's .array()

        const {
            authorizedPersonId,
            sellerName, businessName, businessAddress, mobileNo, emailId, websiteUrl,
            natureOfBusiness, categoryOfBusiness, chamberMembership,
            textileItemsToSell, itemDescription, totalQuantity, expectedRate,
            siteId
        } = body;

        if (!authorizedPersonId) {
            return res.status(400).json({ success: false, message: "Authorized Person ID is required." });
        }

        const kycDocuments = files.map(file => file.path);

        const newSeller = await EtradeSeller.create({
            authorizedPerson: authorizedPersonId,
            sellerName, businessName, businessAddress, mobileNo, emailId, websiteUrl,
            natureOfBusiness, categoryOfBusiness, chamberMembership, kycDocuments,
            textileItemsToSell, itemDescription, totalQuantity, expectedRate,
            siteId: siteId || websiteUrl // Consistent filtering
        });

        await newSeller.populate('authorizedPerson');

        const attachments = files.map(file => ({
            filename: file.originalname,
            path: file.path
        }));

        const mailOptions = {
            from: `"etrade Seller Portal" <${process.env.EMAIL_USER}>`,
            to: getTargetEmail(siteId, 'seller'),
            subject: `New etrade Seller Registration | ${sellerName}`,
            html: `
                <div style="font-family: sans-serif; line-height: 1.5; color: #333;">
                    <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">New etrade Seller Application</h2>
                    <p><strong>Admin Validator:</strong> ${newSeller.authorizedPerson ? newSeller.authorizedPerson.name + ' (' + newSeller.authorizedPerson.code + ')' : 'N/A'}</p>
                    
                    <h3 style="background: #f0f4f8; padding: 8px; border-radius: 4px;">Business Details</h3>
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr><td style="width: 150px; font-weight: bold;">Seller Name:</td><td>${sellerName}</td></tr>
                        <tr><td style="font-weight: bold;">Business Name:</td><td>${businessName}</td></tr>
                        <tr><td style="font-weight: bold;">Address:</td><td>${businessAddress}</td></tr>
                        <tr><td style="font-weight: bold;">Mobile No:</td><td>${mobileNo}</td></tr>
                        <tr><td style="font-weight: bold;">Email ID:</td><td>${emailId}</td></tr>
                        <tr><td style="font-weight: bold;">Website URL:</td><td>${websiteUrl || 'N/A'}</td></tr>
                        <tr><td style="font-weight: bold;">Nature of Bus:</td><td>${natureOfBusiness}</td></tr>
                        <tr><td style="font-weight: bold;">Category:</td><td>${categoryOfBusiness}</td></tr>
                        <tr><td style="font-weight: bold;">Chamber Mem:</td><td>${chamberMembership || 'N/A'}</td></tr>
                    </table>

                    <h3 style="background: #f0f4f8; padding: 8px; border-radius: 4px;">Stock Details</h3>
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr><td style="width: 150px; font-weight: bold;">Items to Sell:</td><td>${textileItemsToSell}</td></tr>
                        <tr><td style="font-weight: bold;">Description:</td><td>${itemDescription || 'N/A'}</td></tr>
                        <tr><td style="font-weight: bold;">Total Quantity:</td><td>${totalQuantity}</td></tr>
                        <tr><td style="font-weight: bold;">Expected Rate:</td><td>${expectedRate || 'N/A'}</td></tr>
                    </table>
                    
                    <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
                    <p style="font-size: 12px; color: #666;">Site ID: ${siteId}</p>
                </div>
            `,
            attachments
        };

        sendEmail(mailOptions).catch(err => console.error("Email Error:", err.message));

        return res.status(201).json({ success: true, message: "Seller form submitted successfully.", data: newSeller });
    } catch (error) {
        console.error("Submit Seller Error:", error);
        return res.status(500).json({ success: false, message: "Internal server error." });
    }
};

exports.getPlatformSubmissions = async (req, res) => {
    try {
        const { type, siteId } = req.query; // 'buyer' or 'seller'
        const query = siteId ? { siteId } : {};
        let data = [];
        if (type === 'buyer') {
            data = await EtradeBuyer.find(query).populate('authorizedPerson').sort({ createdAt: -1 });
        } else if (type === 'seller') {
            data = await EtradeSeller.find(query).populate('authorizedPerson').sort({ createdAt: -1 });

        } else {
            return res.status(400).json({ success: false, message: "Type query param must be 'buyer' or 'seller'." });
        }
        return res.status(200).json({ success: true, data });
    } catch (error) {
        console.error("Get Submissions Error:", error);
        return res.status(500).json({ success: false, message: "Internal server error." });
    }
};

exports.deleteSubmission = async (req, res) => {
    try {
        const { id } = req.params;
        let deleted = await EtradeBuyer.findByIdAndDelete(id);
        if (!deleted) {
            deleted = await EtradeSeller.findByIdAndDelete(id);
        }
        if (!deleted) {
            return res.status(404).json({ success: false, message: "Submission not found" });
        }
        return res.status(200).json({ success: true, message: "Submission deleted successfully" });
    } catch (error) {
        console.error("Delete Submission Error:", error);
        return res.status(500).json({ success: false, message: "Internal server error." });
    }
};
