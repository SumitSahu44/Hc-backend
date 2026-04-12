const EtradeBuyer = require('../models/EtradeBuyer');
const EtradeSeller = require('../models/EtradeSeller');
const nodemailer = require('nodemailer');
const { getTargetEmail } = require('../utils/emailMapper');

// Setup mailer - reuse environment variables like other controllers
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

        const transporter = createTransporter();
        const attachments = files.map(file => ({
            filename: file.originalname,
            content: require('fs').readFileSync(file.path)
        }));

        const mailOptions = {
            from: `"etrade Buyer Portal" <${process.env.EMAIL_USER}>`,
            to: getTargetEmail(siteId, 'buyer'),
            subject: `New etrade Buyer Registration | ${buyerName}`,
            html: `
                <h2>New etrade Buyer Application</h2>
                <p><strong>Admin Validator:</strong> ${newBuyer.authorizedPerson ? newBuyer.authorizedPerson.name + ' (' + newBuyer.authorizedPerson.code + ')' : 'N/A (Orphaned Record)'}</p>
                <hr/>
                <p><strong>Buyer Name:</strong> ${buyerName}</p>
                <p><strong>Business Title:</strong> ${businessTitle}</p>
                <p><strong>Address:</strong> ${businessAddress}</p>
                <p><strong>Contact:</strong> ${mobileNo} | ${emailId}</p>
                <p><strong>Nature of Bus:</strong> ${natureOfBusiness}</p>
                <p><strong>Category:</strong> ${categoryOfBusiness}</p>
                <p><strong>Chamber Mem:</strong> ${chamberMembership}</p>
                <hr/>
                <p><strong>Item to Buy:</strong> ${textileItemsToBuy}</p>
                <p><strong>Description:</strong> ${itemDescription}</p>
                <p><strong>Quantity:</strong> ${requiredQuantity}</p>
                <p><strong>Budget:</strong> ${tentativeBudget}</p>
            `,
            attachments
        };

        transporter.sendMail(mailOptions).catch(err => console.error("Email Error:", err.message));

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

        const transporter = createTransporter();
        const attachments = files.map(file => ({
            filename: file.originalname,
            content: require('fs').readFileSync(file.path)
        }));

        const mailOptions = {
            from: `"etrade Seller Portal" <${process.env.EMAIL_USER}>`,
            to: getTargetEmail(siteId, 'seller'),
            subject: `New etrade Seller Registration | ${sellerName}`,
            html: `
                <h2>New etrade Seller Application</h2>
                <p><strong>Admin Validator:</strong> ${newSeller.authorizedPerson ? newSeller.authorizedPerson.name + ' (' + newSeller.authorizedPerson.code + ')' : 'N/A (Orphaned Record)'}</p>
                <hr/>
                <p><strong>Seller Name:</strong> ${sellerName}</p>
                <p><strong>Business Name:</strong> ${businessName}</p>
                <p><strong>Address:</strong> ${businessAddress}</p>
                <p><strong>Contact:</strong> ${mobileNo} | ${emailId}</p>
                <p><strong>Nature of Bus:</strong> ${natureOfBusiness}</p>
                <p><strong>Category:</strong> ${categoryOfBusiness}</p>
                <hr/>
                <p><strong>Item to Sell:</strong> ${textileItemsToSell}</p>
                <p><strong>Description:</strong> ${itemDescription}</p>
                <p><strong>Quantity:</strong> ${totalQuantity}</p>
                <p><strong>Expected Rate:</strong> ${expectedRate}</p>
            `,
            attachments
        };

        transporter.sendMail(mailOptions).catch(err => console.error("Email Error:", err.message));

        return res.status(201).json({ success: true, message: "Seller form submitted successfully.", data: newSeller });
    } catch (error) {
        console.error("Submit Seller Error:", error);
        return res.status(500).json({ success: false, message: "Internal server error." });
    }
};

exports.getPlatformSubmissions = async (req, res) => {
    try {
        const type = req.query.type; // 'buyer' or 'seller'
        let data = [];
        if (type === 'buyer') {
            data = await EtradeBuyer.find().populate('authorizedPerson').sort({ createdAt: -1 });
        } else if (type === 'seller') {
            data = await EtradeSeller.find().populate('authorizedPerson').sort({ createdAt: -1 });
        } else {
            return res.status(400).json({ success: false, message: "Type query param must be 'buyer' or 'seller'." });
        }
        return res.status(200).json({ success: true, data });
    } catch (error) {
        console.error("Get Submissions Error:", error);
        return res.status(500).json({ success: false, message: "Internal server error." });
    }
};
