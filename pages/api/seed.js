import db from '@/utils/db'
import User from '@/models/User'
import data from '@/utils/data'
import Product from '@/models/Product'
import Post from '@/models/Post'

const handler = async (req, res) => {
  try {
    await db.connect()

    // Delete existing users and insert new ones
    await User.deleteMany()
    await User.insertMany(data.users)

    // Delete existing products and insert new ones
    await Product.deleteMany()

    // Modify product data to match the expected structure
    const productsToSeed = data.products.map((product) => ({
      ...product,
      images: product.images.map((imageUrl) => ({ url: imageUrl })),
    }))

    await Product.insertMany(productsToSeed)

    await Post.deleteMany()
    await Post.insertMany(data.posts)

    await db.disconnect()

    res.send('Seeded successfully')
  } catch (error) {
    console.error('Error seeding data:', error)
    res.status(500).send('Internal Server Error')
  }
}

export default handler
