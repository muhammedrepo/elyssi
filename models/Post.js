import mongoose from 'mongoose'

const postSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    authorImage: {
      type: String,
      required: true,
    },
    excerpt: {
      type: String,
      required: true,
    },
    content: {
      type: [String],
      required: true,
    },
    featuredImage: {
      type: String,
      required: true,
    },
    altText: {
      type: String,
      required: true,
    },
    excerptImage: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const Post = mongoose.models.Post || mongoose.model('Post', postSchema)
export default Post
