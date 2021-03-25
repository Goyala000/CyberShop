import Product from '../models/productModel.js'; 
import asyncHandler from 'express-async-handler';

// @desc    FETCH all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
    const product = await Product.find({})
    res.json(product);
});


// @desc    FETCH individual product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if(product) {
        res.json(product)
    } else {
        res.statusCode(400).json({message: 'Product not Found'})
    }
});

export {
    getProducts,
    getProductById
}