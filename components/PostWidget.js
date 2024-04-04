import Link from 'next/link'

const BlogSidebarItem = ({ recentPosts }) =>
  recentPosts ? (
    <Link
      href={`/posts/${recentPosts.slug}`}
      className="group mt-8 block border-b border-grey-dark pb-5">
      <p className="font-hk text-base text-secondary transition-colors group-hover:text-primary">
        {recentPosts.title}
      </p>
      <p className="pt-4 font-hk text-base text-grey-darkest transition-all group-hover:font-bold group-hover:text-primary">
        {recentPosts.createdAt.substring(0, 10)}
      </p>
    </Link>
  ) : null

export default function PostWidget({ recentPosts }) {
  if (!recentPosts || recentPosts.length === 0) {
    return <p>No recent posts available.</p>
  }
  return (
    <div>
      <form className="relative mb-16 flex w-full items-center">
        <label
          htmlFor="search_form"
          className="relative block h-0 w-0 overflow-hidden">
          Search
        </label>
        <input
          type="text"
          id="search_form"
          placeholder="Search the Blog"
          className="form-input pr-10 text-base text-grey-darkest transition-all"
        />
        <button
          className="absolute right-0 top-0 mt-4 mr-3 focus:outline-none"
          aria-label="Search button">
          <i className="bx bx-search text-2xl"></i>
        </button>
      </form>
      <div className="mb-16 text-center sm:text-left">
        <h4 className="border-b border-grey-dark pb-2 font-butler text-xl text-secondary md:text-2xl lg:text-3xl">
          Recent Post
        </h4>
        <BlogSidebarItem recentPosts={recentPosts[0]} />
        <BlogSidebarItem recentPosts={recentPosts[1]} />
        <BlogSidebarItem recentPosts={recentPosts[2]} />
      </div>
    </div>
  )
}
