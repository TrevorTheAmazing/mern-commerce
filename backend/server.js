import express from 'express'
import dotenv  from 'dotenv'
import colors from 'colors'
import connectDB from './config/db.js'

import productRoutes from './routes/productRoutes.js'

dotenv.config()

connectDB()

const app = express()

app.get('/', (request, response) => {
    response.send('API is running...')
})

app.use('/api/products', productRoutes)

// app.listen(5000, console.log('server running on port 5000'))
const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`server running in ${process.env.NODE_ENV} on port ${PORT}` .yellow.bold))