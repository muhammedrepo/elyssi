import Layout from '@/components/layout/Layout'
import Link from 'next/link'
import Image from 'next/image'
import PostExcerpt from '@/components/PostExcerpt'
import db from '@/utils/db'
import Post from '@/models/Post'
import BlogSidebar from '@/components/BlogSidebar'
import RelatedPosts from '@/components/RelatedPosts'

export default function PostDetailScreen(props) {
  const { post, recentPosts, relatedPosts } = props

  if (!post) {
    return <Layout>Post Not Found</Layout>
  }

  return (
    <Layout title={post.title}>
      <div className="py-2">
        <Link href="/blog">back to posts</Link>
      </div>
      <di>
        <div className="container mx-auto px-4">
          <div className="aspect-w-16 aspect-h-9 md:aspect-h-5">
            <Image
              src={post.featuredImage}
              alt="post image"
              className="object-cover"
              width={0}
              height={470}
              sizes="100vw"
              style={{
                width: '100%',
                height: '470px',
                maxWidth: '100%',
              }}
            />
          </div>
          <div className="relative flex flex-col sm:flex-row">
            <Image
              src={post.authorImage}
              alt="author image"
              className="border-6 -mt-16 mb-5 h-20 w-20 rounded-full border-white"
              width={80}
              height={80}
            />
            <div className="flex items-center justify-center py-3 font-hk text-base text-secondary sm:py-4 sm:pl-10 md:py-6 md:pl-12">
              <span>
                By
                <span className="font-hkbold">{post.author}</span>
              </span>
              <span className="px-3">|</span>
              <span>{post.createdAt.substring(0, 10)}</span>
            </div>
            <div className="hidden items-center justify-center py-3 sm:flex sm:flex-col sm:py-4 sm:pl-10 md:flex-row md:py-6 md:pl-16">
              <span className="font-hkbold text-base text-secondary">678</span>
              <span className="pl-3 font-hk text-base text-secondary sm:pl-0 md:pl-3">
                Share
              </span>
            </div>
            <div className="hidden items-center justify-center py-3 sm:flex sm:flex-col sm:py-4 sm:pl-10 md:flex-row md:py-6 md:pl-16">
              <span className="font-hkbold text-base text-secondary">30</span>
              <span className="pl-3 font-hk text-base text-secondary sm:pl-3">
                Comments
              </span>
            </div>
          </div>

          <div className="border-b border-grey-dark">
            <div className="flex flex-col justify-between pt-10 pb-20 lg:flex-row xl:w-11/12">
              <PostExcerpt
                title={post.title}
                content={post.content}
                excerptImage={post.excerptImage}
                altText={post.altText}
              />
              <BlogSidebar recentPosts={recentPosts} />
            </div>
          </div>
          <div className="pt-16 pb-16 sm:pb-20">
            <h2 className="pb-2 text-center font-butler text-3xl text-secondary sm:text-4xl md:pb-3 md:text-4.5xl lg:text-5xl">
              Related Post
            </h2>
            <p className="pb-5 text-center font-hk text-base text-secondary-lighter sm:pb-12 md:pb-0 md:text-lg">
              For powerful features, great design and support from the
              developer.
            </p>

            <RelatedPosts relatedPosts={relatedPosts} />
          </div>
        </div>
      </di>
    </Layout>
  )
}

export async function getServerSideProps(context) {
  const { params } = context
  const { slug } = params

  await db.connect()

  // Fetch the current post
  const post = await Post.findOne({ slug }).lean()

  // Fetch the recent posts
  const recentPosts = await Post.find().sort({ createdAt: -1 }).limit(3).lean()

  // Fetch the related posts based on the category of the current post
  const relatedPosts = await Post.find({
    category: post.category,
    slug: { $ne: post.slug },
  })
    .sort({ createdAt: -1 })
    .limit(8)
    .lean()

  await db.disconnect()

  return {
    props: {
      post: post ? db.convertDocToObj(post) : null,
      recentPosts: recentPosts.map(db.convertDocToObj),
      relatedPosts: relatedPosts.map(db.convertDocToObj),
    },
  }
}
