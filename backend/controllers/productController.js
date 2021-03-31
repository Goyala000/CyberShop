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


// @desc    Delete Product
// @route   GET /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if(product) {
        await product.remove()
        res.json({ message: 'Product deleted'})
    } else {
        res.status(404)
        throw new Error('Product not Found')
    }
});


// @desc    Create Product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
    const product = new Product({
        name: 'Sample name',
        price: 0,
        user: req.user._id,
        image: '/images/sample.jpg',
        brand: 'Sample brand',
        category: 'Sample Category',
        color: 'Sample Color',
        countInStock: 0,
        numReviews: 0,
        description: 'Sample Description'
    });
    const createdProduct = await product.save();
    res.status(201).json(createdProduct)
});


// @desc    UPDATE Product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
    const {
        name,
        price,
        description,
        image,
        brand,
        category,
        color,
        countInStock
    } = req.body;

    const product = await Product.findById(req.params.id)

    if(product) {
        product.name = name
        product.price = price
        product.description = description
        product.image = image
        product.brand = brand
        product.category = category
        product.color = color
        product.countInStock = countInStock

        const updatedProduct = await product.save();
        res.json(updatedProduct)
    } else {
        res.status(404)
        throw new Error('Product not Found')
    }
});


export {
    getProducts,
    getProductById,
    deleteProduct,
    createProduct,
    updateProduct
}