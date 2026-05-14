const ManagementContent = require('../models/ManagementContent');
const ManagementMember = require('../models/ManagementMember');

// Content Controllers
const getManagementContent = async (req, res) => {
    try {
        const { siteId } = req.query;
        if (!siteId) return res.status(400).json({ success: false, message: "siteId is required" });
        
        let content = await ManagementContent.findOne({ siteId });
        if (!content) {
            content = { title: 'OUR MANAGEMENT', description: '', siteId };
        }

        res.status(200).json({ success: true, data: content });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const updateManagementContent = async (req, res) => {
    try {
        const { siteId, title, description } = req.body;
        if (!siteId) return res.status(400).json({ success: false, message: "siteId is required" });

        const content = await ManagementContent.findOneAndUpdate(
            { siteId },
            { title, description },
            { new: true, upsert: true }
        );

        res.status(200).json({ success: true, data: content });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Member Controllers
const getManagementMembers = async (req, res) => {
    try {
        const { siteId } = req.query;
        const query = siteId && siteId !== 'all' ? { siteId } : {};
        const members = await ManagementMember.find(query).sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: members });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const addManagementMember = async (req, res) => {
    try {
        const { siteId, name, role } = req.body;
        const image = req.file ? req.file.path : null;

        if (!siteId || !name || !role || !image) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        const member = new ManagementMember({ siteId, name, role, image });
        await member.save();

        res.status(201).json({ success: true, data: member });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const updateManagementMember = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = { ...req.body };
        if (req.file) {
            updateData.image = req.file.path;
        }

        const member = await ManagementMember.findByIdAndUpdate(id, updateData, { new: true });
        if (!member) return res.status(404).json({ success: false, message: "Member not found" });

        res.status(200).json({ success: true, data: member });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const deleteManagementMember = async (req, res) => {
    try {
        const { id } = req.params;
        const member = await ManagementMember.findByIdAndDelete(id);
        if (!member) return res.status(404).json({ success: false, message: "Member not found" });

        res.status(200).json({ success: true, message: "Member deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    getManagementContent,
    updateManagementContent,
    getManagementMembers,
    addManagementMember,
    updateManagementMember,
    deleteManagementMember
};
