// Import necessary modules
const mongoose = require('mongoose');

// Define schema for product
const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        offerPrice: {
            type: Number,
            default: 0,
        },
        categories: {
            type: String,
            required: true,
        },
        images: [
            {
                type: String, // Assuming storing image URLs for simplicity
            },
        ],
    },
    {
        timestamps: true, // Automatically add createdAt and updatedAt fields
    },
);

// Create and export Product model
module.exports = mongoose.model('Product', productSchema);
