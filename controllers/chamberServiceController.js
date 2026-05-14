const ChamberService = require('../models/ChamberService');

const getChamberServices = async (req, res) => {
    try {
        const { siteId } = req.query;
        const query = siteId && siteId !== 'all' ? { siteId } : { siteId: 'ParekhChamberofTextile01' };
        const services = await ChamberService.find(query).sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: services });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const addChamberService = async (req, res) => {
    try {
        const { title, icon, siteId } = req.body;
        if (!title || !icon) {
            return res.status(400).json({ success: false, message: "Title and icon are required" });
        }

        const service = new ChamberService({ 
            title, 
            icon, 
            siteId: siteId || 'ParekhChamberofTextile01' 
        });
        await service.save();

        res.status(201).json({ success: true, data: service });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const updateChamberService = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, icon } = req.body;

        const service = await ChamberService.findByIdAndUpdate(
            id, 
            { title, icon }, 
            { new: true }
        );
        if (!service) return res.status(404).json({ success: false, message: "Service not found" });

        res.status(200).json({ success: true, data: service });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const deleteChamberService = async (req, res) => {
    try {
        const { id } = req.params;
        const service = await ChamberService.findByIdAndDelete(id);
        if (!service) return res.status(404).json({ success: false, message: "Service not found" });

        res.status(200).json({ success: true, message: "Service deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    getChamberServices,
    addChamberService,
    updateChamberService,
    deleteChamberService
};
