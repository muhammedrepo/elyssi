import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide'
import '@splidejs/react-splide/css'
import '@splidejs/react-splide/css/core'
import Image from 'next/image'
import Link from 'next/link'

export default function RelatedPosts({ relatedPosts }) {
  if (!relatedPosts || relatedPosts.length === 0) {
    return <p>No related Posts available.</p>
  }

  const slideOptions = {
    type: 'loop',
    start: 1,
    perPage: 4,
    gap: 0,
    perMove: 1,
    rewind: true,
    pagination: false,
    padding: {
      left: 50,
      right: 50,
    },
    breakpoints: {
      1024: {
        perPage: 3,
        padding: {
          left: 20,
          right: 20,
        },
      },
      768: {
        perPage: 2,
        padding: {
          left: 10,
          right: 10,
        },
      },
      600: {
        perPage: 1,
        padding: {
          left: 0,
          right: 0,
        },
      },
    },
  }

  return (
    <Splide
      options={slideOptions}
      hasTrack={false}
      className="relative mt-6 md:mt-12 splide--loop is-active is-initialized">
      <SplideTrack className="px-12">
        {relatedPosts.map((relatedPost) => (
          <SplideSlide
            key={relatedPost.slug}
            className="splide__slide px-2 xl:px-4 "
            style={{ width: 'calc(33.3333%)' }}>
            <div class="mt-12 rounded-lg border border-grey shadow sm:mt-3 md:mt-0">
              <div class="aspect-w-16 aspect-h-9">
                <Image
                  src={relatedPost.image}
                  alt={relatedPost.altText}
                  className="object-cover"
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{
                    width: '100%',
                    height: 'auto',
                    maxWidth: '100%',
                  }}
                />
              </div>
              <div className="px-8 pt-6 pb-5 md:pb-8">
                <div className="flex items-center font-hk text-sm text-secondary md:text-base">
                  <span>
                    By <span className="font-hkbold">{relatedPost.author}</span>
                  </span>
                  <span className="px-3">|</span>
                  <span>{relatedPost.createdAt.substring(0, 10)}</span>
                </div>
                <h4 className="pt-5 pb-8 font-butler text-xl font-medium text-secondary md:text-2xl">
                  {relatedPost.title}
                </h4>
                <Link
                  href={`/posts/${relatedPost.slug}`}
                  className="group flex items-center"
                  tabindex="-1">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-grey-darkest bg-white transition-colors group-hover:border-primary group-hover:bg-primary">
                    <i className="bx bx-chevron-right text-xl text-grey-darkest group-hover:text-white"></i>
                  </span>
                  <span className="pl-3 font-hk font-semibold text-grey-darkest transition-colors group-hover:text-primary sm:pl-5 sm:text-lg">
                    Read more
                  </span>
                </Link>
              </div>
            </div>
          </SplideSlide>
        ))}
      </SplideTrack>
    </Splide>
  )
}
