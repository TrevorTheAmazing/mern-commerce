import express from 'express'
import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

const router = express.Router()

//  @desc   Fetch all products
//  @route  GET /api/products
//  @access public

router.get('/', asyncHandler(async (request, response) => {
    const products = await Product.find({})

    response.json(products)
}))

//  @desc   Fetch one product
//  @route  GET /api/product/:id
//  @access public

router.get('/:id', asyncHandler( async (request, response) => {
    // const product = products.find(p => p._id === request.params.id)
    const product = await Product.findById(request.params.id)

    if(product) {
        response.json(product)
    } else {
        response.status(404).json({ messsage: 'Product not found'})
    }
    
}))

export default router