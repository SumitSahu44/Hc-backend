const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

const tenantHandler = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || "hc_secret_key_2024");
      
      const admin = await Admin.findById(decoded.id).select("-password");
      if (admin) {
        req.admin = admin;
        // Multi-tenancy logic: Force siteId if not 'all'
        if (admin.siteId !== 'all') {
          req.query.siteId = admin.siteId;
          // For POST/PUT requests, also inject siteId into body
          if (req.method === 'POST' || req.method === 'PUT') {
            req.body.siteId = admin.siteId;
          }
        }
      }
    } catch (error) {
      // If token is invalid, we don't necessarily stop the request (it could be public)
      // but we log it.
      console.log("Tenant Middleware: Invalid or expired token");
    }
  }

  next();
};

module.exports = { tenantHandler };
