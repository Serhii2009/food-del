import express from 'express'
import authMiddlevare from '../middleware/auth.js'

import {
  addToCart,
  removeFromCart,
  getCart,
} from '../controllers/cartController.js'

const cartRouter = express.Router()

cartRouter.post('/add', authMiddlevare, addToCart)
cartRouter.post('/remove', authMiddlevare, removeFromCart)
cartRouter.post('/get', authMiddlevare, getCart)

export default cartRouter
