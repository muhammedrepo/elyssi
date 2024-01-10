import Link from 'next/link'
import PostWidget from './PostWidget'
import Categories from './Categories'

const BlogSidebar = ({ recentPosts, allCategories }) => (
  <div className="mx-auto mt-16 w-3/4 sm:w-1/2 lg:mx-0 lg:mt-0 lg:w-1/4">
    <PostWidget recentPosts={recentPosts} />
    <Categories allCategories={allCategories} />

    {/* Follow Us section */}
    <div className="text-center sm:text-left">
      <h4 className="border-b border-grey-dark pb-2 font-butler text-xl text-secondary md:text-2xl lg:text-3xl">
        Follow Us
      </h4>
      <div className="flex justify-center pt-8 sm:justify-start">
        <Link
          href="https://www.google.com"
          className="mr-2 flex items-center justify-center rounded-full bg-secondary-lighter px-3 py-3 transition-colors hover:bg-primary">
          <i className="bx bxl-facebook text-white"></i>
        </Link>
        <Link
          href="https://www.google.com"
          className="mr-2 flex items-center justify-center rounded-full bg-secondary-lighter px-3 py-3 transition-colors hover:bg-primary">
          <i className="bx bxl-twitter text-white"></i>
        </Link>
        <Link
          href="https://www.google.com"
          className="mr-2 flex items-center justify-center rounded-full bg-secondary-lighter px-3 py-3 transition-colors hover:bg-primary">
          <i className="bx bxl-instagram text-white"></i>
        </Link>
        <Link
          href="https://www.google.com"
          className="mr-2 flex items-center justify-center rounded-full bg-secondary-lighter px-3 py-3 transition-colors hover:bg-primary">
          <i className="bx bxl-pinterest text-white"></i>
        </Link>
      </div>
    </div>
  </div>
)

export default BlogSidebar
