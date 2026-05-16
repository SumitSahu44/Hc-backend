const EQuotation = require('../models/EQuotation');

const getEQuotations = async (req, res) => {
    try {
        const { siteId } = req.query;
        const query = siteId ? { siteId } : {};
        const quotations = await EQuotation.find(query).sort({ date: -1, createdAt: -1 });

        res.status(200).json({
            success: true,
            data: quotations
        });
    } catch (error) {
        console.error("Get e-Quotations Error:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

const addEQuotation = async (req, res) => {
    try {
        const { title, description, siteId, status, date } = req.body;
        const image = req.file ? req.file.path : null;

        if (!title || !description || !siteId) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields (title, description, siteId)"
            });
        }

        const newQuotation = new EQuotation({
            title,
            description,
            image,
            siteId,
            status: status || 'active',
            date: date || Date.now()
        });

        await newQuotation.save();

        res.status(201).json({
            success: true,
            message: "e-Quotation created successfully",
            data: newQuotation
        });
    } catch (error) {
        console.error("Add e-Quotation Error:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
};

const updateEQuotation = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = { ...req.body };

        if (req.file) {
            updateData.image = req.file.path;
        }

        const updatedQuotation = await EQuotation.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        );

        if (!updatedQuotation) {
            return res.status(404).json({
                success: false,
                message: "e-Quotation not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "e-Quotation updated successfully",
            data: updatedQuotation
        });
    } catch (error) {
        console.error("Update e-Quotation Error:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
};

const deleteEQuotation = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedQuotation = await EQuotation.findByIdAndDelete(id);

        if (!deletedQuotation) {
            return res.status(404).json({
                success: false,
                message: "e-Quotation not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "e-Quotation deleted successfully"
        });
    } catch (error) {
        console.error("Delete e-Quotation Error:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

module.exports = {
    getEQuotations,
    addEQuotation,
    updateEQuotation,
    deleteEQuotation
};
