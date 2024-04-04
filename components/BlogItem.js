import Link from 'next/link'
import Image from 'next/image'

const BlogItem = ({ post }) => {
  return (
    <div className="mx-auto mb-10 w-full md:mx-0">
      <Link href={`/posts/${post.slug}`}>
        <span className="group block rounded-lg border border-grey shadow">
          <div className="aspect-w-16 aspect-h-8 overflow-hidden rounded-t-lg">
            <Image
              src={post.image}
              alt={post.altText}
              className="object-cover"
              width={0}
              height={500}
              sizes="100vw"
              style={{
                width: '100%',
                height: '500px',
                maxWidth: '100%',
              }}
            />
          </div>
          <div className="relative px-8 pt-6 pb-5 md:pb-8">
            <Image
              src={post.authorImage}
              alt="author image"
              width={80}
              height={80}
              className="border-6 -mt-16 mb-5 h-20 w-20 rounded-full border-white"
              style={{
                maxWidth: '100%',
                height: 'auto',
              }}
            />
            <div className="flex items-center font-hk text-sm text-secondary md:text-base">
              <span>
                By <span className="font-hk font-bold">{post.author}</span>
              </span>
              <span className="px-3">|</span>
              <span>{post.createdAt.substring(0, 10)}</span>
            </div>
            <div className="sm:w-5/6 lg:w-full">
              <h4 className="pt-5 pb-5 font-butler text-xl font-medium text-secondary md:text-2xl">
                {post.title}
              </h4>
            </div>
            <div className="sm:w-5/6 md:w-full">
              <p className="pb-6 font-hk text-sm text-secondary-lighter sm:pb-8 md:text-base">
                {post.excerpt}
              </p>
            </div>
            <div className="flex items-center">
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-grey-darkest bg-white transition-colors group-hover:border-primary group-hover:bg-primary">
                <i className="bx bx-chevron-right text-xl text-grey-darkest transition-colors group-hover:text-white"></i>
              </span>
              <span className="-mt-1 pl-3 font-hk font-semibold text-grey-darkest transition-colors group-hover:text-primary sm:pl-4 sm:text-lg">
                Read more
              </span>
            </div>
          </div>
        </span>
      </Link>
    </div>
  )
}

export default BlogItem
