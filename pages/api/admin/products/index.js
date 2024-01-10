import Product from '@/models/Product'
import db from '@/utils/db'

const { getToken } = require('next-auth/jwt')

const handler = async (req, res) => {
  const user = await getToken({ req })
  if (!user || !user.isAdmin) {
    return res.status(401).send({ message: 'Admin signin required' })
  }
  if (req.method === 'GET') {
    return getHandler(req, res)
  } else if (req.method === 'POST') {
    return postHandler(req, res)
  } else {
    return res.status(405).send({ message: 'Method not allowed' })
  }
}

const postHandler = async (req, res) => {
  await db.connect()
  const product = new Product({
    name: 'sample name',
    slug: 'sample-slug-' + Math.random(),
    price: 0,
    category: 'sample category',
    image: '/images/sample.jpg',
    brand: 'sample brand',
    countInStock: 0,
    description: 'sample description',
    rating: 0,
    numReviews: 0,
  })
  const createdProduct = await product.save()
  await db.disconnect()
  res.send({ message: 'Product Created', product: createdProduct })
}

const getHandler = async (req, res) => {
  await db.connect()
  const products = await Product.find({}).lean()
  await db.disconnect()
  res.send(products)
}

export default handler
