// PostExcerpt.js
import Image from 'next/image'
import React from 'react'

export default function PostExcerpt({ title, content, excerptImage, altText }) {
  return (
    <div className="prose prose-sm sm:prose sm:max-w-none lg:w-2/3">
      <h1 className="font-butler font-thin text-3xl mb-8">{title}</h1>
      <div className="content">
        {Array.isArray(content) ? (
          content.map((paragraph, index) => (
            <React.Fragment key={index}>
              <p className="mb-6">{paragraph}</p>
              {index === Math.floor(content.length / 3) && (
                <Image
                  src={excerptImage}
                  alt={altText}
                  className="my-6"
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{
                    display: 'block',
                    margin: 'auto',
                    marginBottom: '2rem',
                    marginLeft: '0',
                    width: '80%',
                    height: 'auto',
                    maxWidth: '100%',
                  }}
                />
              )}
            </React.Fragment>
          ))
        ) : (
          <p>{content}</p>
        )}
      </div>
    </div>
  )
}
