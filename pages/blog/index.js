import Breadcrumb from '@/components/Breadcrumb'
import Layout from '@/components/layout/Layout'
import BlogItem from '@/components/BlogItem'
import db from '@/utils/db'
import Post from '@/models/Post'
import BlogSidebar from '@/components/BlogSidebar'

export default function BlogPageScreen({ posts, recentPosts, allCategories }) {
  const breadcrumbItems = [
    {
      label: 'Home',
      url: '/',
    },
    {
      label: 'Blog',
    },
  ]

  return (
    <Layout title="Blog Page">
      <div className="relative flex">
        <div
          className="ml-auto h-56 w-3/4 bg-cover bg-center bg-no-repeat lg:h-68"
          style={{ backgroundImage: 'url(/images/hero-image-01.jpg)' }}></div>
        <div className="c-hero-gradient-bg absolute top-0 left-0 h-56 w-full bg-cover bg-no-repeat lg:h-68">
          <div className="py-20 px-6 sm:px-12 lg:px-20">
            <h1 className="font-butler text-2xl text-white sm:text-3xl md:text-4.5xl lg:text-5xl">
              Blog
            </h1>
            <Breadcrumb items={breadcrumbItems} />
          </div>
        </div>
      </div>

      <div className="border-b border-grey-dark pt-16 pb-8 sm:pb-12 md:pt-20 lg:pt-24 xl:pb-16">
        <h2 className="text-center font-butler text-2xl text-secondary sm:text-3xl md:text-4.5xl lg:text-5xl">
          Top Feature Blog
        </h2>
        <div className="grid grid-cols-1 gap-10 pt-12 lg:grid-cols-2 lg:pt-16">
          {posts?.slice(0, 2).map((post) => (
            <BlogItem key={post.slug} post={post} />
          ))}
        </div>
      </div>

      <div className="flex flex-col justify-between pt-12 pb-16 sm:pt-16 lg:flex-row lg:pt-20 lg:pb-24">
        <div className="lg:w-2/3">
          <h2 className="text-center font-butler text-2xl text-secondary sm:text-3xl md:text-4.5xl lg:text-left lg:text-5xl">
            Our Blog
          </h2>

          {posts?.map((post) => (
            <BlogItem key={post.slug} post={post} />
          ))}

          <div className="mx-auto flex justify-center pt-12">
            <span className="cursor-pointer pr-5 font-hk font-semibold text-grey-darkest transition-colors hover:text-black">
              Previous
            </span>
            <span className="mr-3 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full font-hk text-sm font-semibold text-black transition-colors hover:bg-primary hover:text-white">
              1
            </span>
            <span className="mr-3 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full font-hk text-sm font-semibold text-black transition-colors hover:bg-primary hover:text-white">
              2
            </span>
            <span className="mr-3 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full font-hk text-sm font-semibold text-black transition-colors hover:bg-primary hover:text-white">
              3
            </span>
            <span className="cursor-pointer pl-2 font-hk font-semibold text-grey-darkest transition-colors hover:text-black">
              Next
            </span>
          </div>
        </div>
        <BlogSidebar recentPosts={recentPosts} allCategories={allCategories} />
      </div>
    </Layout>
  )
}

export async function getServerSideProps() {
  await db.connect()
  const posts = await Post.find().lean()
  const recentPosts = await Post.find().sort({ createdAt: -1 }).lean()
  const allCategories = await Post.distinct('category').lean()

  await db.disconnect()

  return {
    props: {
      posts: posts.map(db.convertDocToObj),
      recentPosts: recentPosts.map(db.convertDocToObj),
      allCategories,
    },
  }
}
