const EAuction = require('../models/EAuction');

const getEAuctions = async (req, res) => {
    try {
        const { siteId } = req.query;
        const query = siteId ? { siteId } : {};
        const auctions = await EAuction.find(query).sort({ date: -1, createdAt: -1 });

        res.status(200).json({ 
            success: true, 
            data: auctions 
        });
    } catch (error) {
        console.error("Get e-Auctions Error:", error);
        res.status(500).json({ 
            success: false, 
            message: "Internal Server Error" 
        });
    }
};

const addEAuction = async (req, res) => {
    try {
        const { title, description, siteId, status, date } = req.body;
        const image = req.file ? req.file.path : null;

        if (!title || !description || !siteId) {
            return res.status(400).json({ 
                success: false, 
                message: "Missing required fields (title, description, siteId)" 
            });
        }

        const newAuction = new EAuction({
            title,
            description,
            image,
            siteId,
            status: status || 'active',
            date: date || Date.now()
        });

        await newAuction.save();

        res.status(201).json({
            success: true,
            message: "e-Auction created successfully",
            data: newAuction
        });
    } catch (error) {
        console.error("Add e-Auction Error:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
};

const updateEAuction = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = { ...req.body };
        
        if (req.file) {
            updateData.image = req.file.path;
        }

        const updatedAuction = await EAuction.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        );

        if (!updatedAuction) {
            return res.status(404).json({
                success: false,
                message: "e-Auction not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "e-Auction updated successfully",
            data: updatedAuction
        });
    } catch (error) {
        console.error("Update e-Auction Error:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
};

const deleteEAuction = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedAuction = await EAuction.findByIdAndDelete(id);

        if (!deletedAuction) {
            return res.status(404).json({
                success: false,
                message: "e-Auction not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "e-Auction deleted successfully"
        });
    } catch (error) {
        console.error("Delete e-Auction Error:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

module.exports = {
    getEAuctions,
    addEAuction,
    updateEAuction,
    deleteEAuction
};
