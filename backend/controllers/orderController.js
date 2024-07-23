import orderModel from '../models/orderModel.js'
import userModel from '../models/userModel'
import Stripe from 'stripe'

// eslint-disable-next-line no-undef
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

// placing user model from front-end
const placeOrder = async (req, res) => {
  const frontend_url = 'http://localhost:5173'

  try {
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    })
    await newOrder.save()
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} })

    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: 'inr',
        product_data: { name: item.name },
        unit_amount: item.price * 100 * 80,
      },

      quantity: item.quantity,
    }))

    line_items.push({
      price_data: {
        currency: 'inr',
        product_data: { name: 'Delivary Charges' },
        unit_amount: 2 * 100 * 80,
      },

      quantity: 1,
    })

    const session = await stripe.Checkout.session.create({
      line_items: line_items,
      mode: 'payment',
      success_url: `${frontend_url}/varify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/varify?success=false&orderId=${newOrder._id}`,
    })

    res.json({ success: true, session_url: session.url })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: 'Error' })
  }
}

export { placeOrder }
