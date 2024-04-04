import Order from '@/models/Order'
import db from '@/utils/db'
import { getToken } from 'next-auth/jwt'

const handler = async (req, res) => {
  try {
    const user = await getToken({ req })
    if (!user) {
      return res.status(401).send({ message: 'signin required' })
    }

    await db.connect()
    const newOrder = new Order({
      ...req.body,
      user: user._id,
    })

    const order = await newOrder.save()
    res.status(201).send(order)
  } catch (error) {
    if (error.name === 'ValidationError') {
      console.error('Validation Error:', error.errors)
      return res
        .status(400)
        .send({ message: 'Validation failed', errors: error.errors })
    }
    console.error('Internal Server Error:', error)
    res.status(500).send({ message: 'Internal Server Error' })
  }
}

export default handler
