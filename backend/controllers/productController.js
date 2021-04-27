import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

//  @desc   Fetch all products
//  @route  GET /api/products
//  @access public
const getProducts = asyncHandler(async(req, res) => {
    const products = await Product.find({})

    res.json(products)
})

//  @desc   Fetch one product
//  @route  GET /api/product/:id
//  @access public
const getProductById = asyncHandler(async(req, res) => {
    const product = await Product.findById(req.params.id)

    if(product) {
        res.json(product)
    } 
    else {
        //500 by default...
        res.status(404)
        throw new Error('Product not found')
    }
})

//  @desc   Delete one product
//  @route  DELETE /api/product/:id
//  @access private/admin
const deleteProduct = asyncHandler(async(req, res) => {
    const product = await Product.findById(req.params.id)

    if(product) {
        await product.remove()
        res.json({message: 'Product removed.'})
    } 
    else {
        //500 by default...
        res.status(404)
        throw new Error('Product not found')
    }
})

//  @desc   Create a product
//  @route  POST /api/products
//  @access private/admin
const createProduct = asyncHandler(async(req, res) => {
    const product = new Product({
        name: 'sample name',
        price: 0,
        user: req.user._id,
        image: '/images/sample.jpg',
        brand: 'sample brand',
        category: 'sample category',
        countInStock: 0,
        numReviews: 0,
        description: 'sample description',
    })

    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
})

//  @desc   Update a product
//  @route  PUT /api/products/:id
//  @access private/admin
const updateProduct = asyncHandler(async(req, res) => {
    const { name, price, image, brand, category, countInStock, description } = req.body
    const product = await Product.findById(req.params.id)
    
    if(product) {
        product.name = name
        product.price = price
        product.image = image
        product.brand = brand
        product.category = category
        product.countInStock = countInStock
        product.description = description
        
        const updatedProduct = await product.save()
        res.status(201).json(updatedProduct)
    } 
    else {
        //500 by default...
        res.status(404)
        throw new Error('Product not found')
    }


})

export {
    getProducts,
    getProductById,
    deleteProduct,
    createProduct,
    updateProduct
}