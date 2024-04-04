import Post from '@/models/Post'
import db from '@/utils/db'
import { getToken } from 'next-auth/jwt'

const handler = async (req, res) => {
  const user = await getToken({ req })
  if (!user || !user.isAdmin) {
    return res.status(401).send({ message: 'Invalid or not authorized token' })
  }

  if (req.method === 'GET') {
    return getHandler(req, res)
  } else if (req.method === 'POST') {
    return postHandler(req, res)
  } else {
    res.status(405).send({ message: `Method ${req.method} is not allowed` })
  }
}

const postHandler = async (req, res) => {
  await db.connect()
  const newPost = new Post({
    slug: 'sample-post-' + Math.random(),
    title: 'Sample Post ' + Date.now(),
    author: 'Sample Author',
    image: '/images/blog-author.jpg',
    authorImage: '/images/blog-author.jpg',
    excerpt: 'This is a sample post excerpt',
    content: ['<p>This is a sample post content</p>'],
    featuredImage: '/images/blog-1.jpg',
    altText: 'This is a sample alt text',
    excerptImage: '/images/blog-1.jpg',
    category: 'sample category',
  })

  const post = await newPost.save()
  await db.disconnect()
  res.send({ message: 'Post created successfully', post })
}

const getHandler = async (req, res) => {
  await db.connect()
  const posts = await Post.find({})
  await db.disconnect()
  res.send(posts)
}

export default handler
