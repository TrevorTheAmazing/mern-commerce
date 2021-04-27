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

export {
    getProducts,
    getProductById,
    deleteProduct
}