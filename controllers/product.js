const Product = require('../models/product');
const logger = require('../config/winston');
const { errorMessages, successMessages } = require('../config/message');
const { QUERY_LIMIT, QUERY_SKIP } = require('../config/systemConfig');

const createProduct = async (req, res) => {
    try {
        const productData = req.body;
        const { images } = req.uploadedFiles || {};

        if (!images) {
            return res.status(404).json({ error: errorMessages.FILE_MISSING });
        }
        productData.images = images;
        const newProduct = new Product(productData);
        await newProduct.validate();
        await newProduct.save();

        return res.status(201).json({
            success: successMessages.DATA_UPLOADED_SUCCESSFUL,
            data: newProduct,
        });
    } catch (error) {
        if (error.name === 'ValidationError') {
            const validationErrors = Object.keys(error.errors).map((key) => `'${key}'`);
            logger.error(`Validation errors: ${validationErrors.join(', ')} - required`);
            return res
                .status(400)
                .json({ error: `Input errors: ${validationErrors.join(', ')} - required` });
        }
        if (error.code === 11000) {
            const duplicateField = Object.keys(error.keyPattern)[0];
            const duplicateValue = error.keyValue[duplicateField];
            logger.error(error.message);
            return res.status(400).json({
                error: `Duplicate error: ${duplicateField}: ${duplicateValue}`,
            });
        }
        logger.error(error.message);
        return res.status(500).json({ error: errorMessages.DATABASE_ERROR });
    }
};

const viewProducts = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit, 10) || QUERY_LIMIT;
        const skip = parseInt(req.query.skip, 10) || QUERY_SKIP;

        const products = await Product.find({}).skip(skip).limit(limit);
        return res.status(200).json({ success: successMessages.DATA_RETRIEVED, data: products });
    } catch (error) {
        logger.error(error.message);
        return res.status(500).json({ error: errorMessages.DATABASE_ERROR });
    }
};

const viewProductByID = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) {
            logger.info(errorMessages.DATA_NOT_FOUND);
            return res.status(404).json({ error: errorMessages.DATA_NOT_FOUND });
        }
        return res.status(200).json({ success: successMessages.DATA_RETRIEVED, data: product });
    } catch (error) {
        logger.error(error.message);
        return res.status(500).json({ error: errorMessages.DATABASE_ERROR });
    }
};

const updateProductByID = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedProductData = req.body;
        const { images } = req.uploadedFiles || {};

        if (images) {
            updatedProductData.images = images;
        }

        const product = await Product.findByIdAndUpdate(id, updatedProductData, {
            new: true,
            runValidators: true,
        });
        if (!product) {
            logger.info(errorMessages.DATA_NOT_FOUND);
            return res.status(404).json({ error: errorMessages.DATA_NOT_FOUND });
        }
        return res.status(200).json({ success: successMessages.UPDATE_SUCCESSFUL });
    } catch (error) {
        logger.error(error.message);
        return res.status(400).json({ error: errorMessages.DATABASE_ERROR });
    }
};

const deleteProductByID = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            logger.info(errorMessages.DATA_NOT_FOUND);
            return res.status(404).json({ error: errorMessages.DATA_NOT_FOUND });
        }
        return res.status(200).json({ success: successMessages.DELETE_SUCCESSFUL });
    } catch (error) {
        logger.error(error.message);
        return res.status(500).json({ error: errorMessages.DATABASE_ERROR });
    }
};

module.exports = {
    createProduct,
    viewProducts,
    viewProductByID,
    updateProductByID,
    deleteProductByID,
};
