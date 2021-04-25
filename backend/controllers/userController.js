import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import User from '../models/userModel.js'

//  @desc   Authenticate user, get token
//  @route  POST /api/users/login
//  @access public
const authenticateUser = asyncHandler(async(req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        })
    } else {
        res.status(401)
        throw new Error('Invalid email or password')
    }
})

//  @desc   Register a new user
//  @route  POST /api/users
//  @access public
const registerNewUser = asyncHandler(async(req, res) => {
    const { name, email, password } = req.body

    const userExists = await User.findOne({ email })

    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    }

    const user = await User.create({
        name,
        email, 
        password
    })

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
    
})

//  @desc   Get user profile
//  @route  GET /api/users/profile
//  @access private
const getUserProfile = asyncHandler(async(req, res) => {
    const user = await User.findById( req.user._id )
    //res.send('Success')
    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

//  @desc   Update user profile
//  @route  PUT /api/users/profile
//  @access private
const updateUserProfile = asyncHandler(async(req, res) => {
    const user = await User.findById( req.user._id )

    if (user) {
        
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        if (req.body.password) {
            user.password = req.body.password
        }

        const updatedUser = await user.save()
        
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(updatedUser._id),
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})


//  @desc   Get all users
//  @route  GET /api/users
//  @access private/admin
const getUsers = asyncHandler(async(req, res) => {
    const users = await User.find( {} )
    //res.send('Success')
    if (users) {
        res.json(users)
    } else {
        res.status(404)
        throw new Error('Users not found')
    }
})

export {
    authenticateUser, getUserProfile, registerNewUser, updateUserProfile, getUsers
}