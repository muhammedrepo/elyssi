import Post from '@/models/Post'
import db from '@/utils/db'
import { getToken } from 'next-auth/jwt'

const handler = async (req, res) => {
  const user = await getToken({ req })
  if (!user || (user && !user.isAdmin)) {
    return res.status(401).send({ message: 'Invalid or not authorized token' })
  }

  if (req.method === 'GET') {
    return getHandler(req, res, user)
  } else if (req.method === 'PUT') {
    return putHandler(req, res, user)
  } else {
    res.status(405).send({ message: `Method ${req.method} is not allowed` })
  }
}

const getHandler = async (req, res) => {
  await db.connect()
  const post = await Post.findById(req.query.id)
  await db.disconnect()
  res.send(post)
}

const putHandler = async (req, res) => {
  await db.connect()
  const post = await Post.findById(req.query.id)
  if (post) {
    post.slug = req.body.slug
    post.title = req.body.title
    post.author = req.body.author
    post.image = req.body.image
    post.excerpt = req.body.excerpt
    post.content = req.body.content
    post.featuredImage = req.body.featuredImage
    post.altText = req.body.altText
    post.category = req.body.category

    const updatedPost = await post.save()
    await db.disconnect()
    res.send({ message: 'Post Updated', post: updatedPost })
  } else {
    await db.disconnect()
    res.status(404).send({ message: 'Post Not Found' })
  }
}

export default handler
