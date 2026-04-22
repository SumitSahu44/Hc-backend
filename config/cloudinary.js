const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    // Dynamic folder logic: SiteID/EntityType
    const siteId = req.body.siteId || 'General';
    const cleanSiteId = siteId.replace('Parekh', ''); // cleaning name for folder

    // Determine entity type from URL or body
    let entityType = 'Misc';
    if (req.originalUrl.includes('product')) entityType = 'Products';
    else if (req.originalUrl.includes('blog')) entityType = 'Blogs';
    else if (req.originalUrl.includes('media-event')) entityType = 'MediaEvents';
    else if (req.originalUrl.includes('career')) entityType = 'Careers';
    else if (req.originalUrl.includes('appointment')) entityType = 'Appointments';
    else if (req.originalUrl.includes('auction')) entityType = 'Auctions';
    else if (req.originalUrl.includes('quotation')) entityType = 'Quotations';
    else if (req.originalUrl.includes('trade-enquiry')) entityType = 'TradeEnquiries';
    else if (req.originalUrl.includes('membership')) entityType = 'Memberships';

    const fileName = file.originalname.split('.')[0].replace(/[^a-z0-9_-]/gi, '_');
    const publicId = `${Date.now()}-${fileName}`;

    const extension = file.originalname.split('.').pop().toLowerCase();
    const isPDF = extension === 'pdf';

    return {
      folder: `HC_Ecosystem/${cleanSiteId}/${entityType}`,
      resource_type: isPDF ? 'image' : 'auto', // PDFs are best handled as 'image' resource_type in Cloudinary for viewing
      public_id: publicId,
      format: isPDF ? 'pdf' : undefined
    };
  },
});

module.exports = { cloudinary, storage };
