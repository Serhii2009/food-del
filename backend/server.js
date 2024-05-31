import express from 'express'
import cors from 'cors'
import { connectDB } from './config/db.js'
import foodRouter from './routes/foodRoute.js'

// app config

const app = express()
const port = 4000

// maddliware

app.use(express.json())
app.use(cors())

// DB Connection
connectDB()

// api endpoints
app.use('/api/food', foodRouter)
app.use('/images', express.static('uploads'))

app.get('/', (req, res) => {
  res.send('API Working')
})

app.listen(port, () => {
  console.log(`Server Started on http://localhost:${port}`)
})

// mongodb+srv://serhiikravchenko:FPVrhxD9hSacxP@cluster0.db5nqhv.mongodb.net/?