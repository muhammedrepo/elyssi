import React from 'react'
import Link from 'next/link'
export default function Breadcrumb({ items }) {
  return (
    <div className="flex pt-2">
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && (
            <span className="px-2 font-hk text-base text-white">.</span>
          )}
          {item.url ? (
            <Link
              href={item.url}
              className="font-hk text-base text-white transition-colors hover:text-primary">
              {item.label}
            </Link>
          ) : (
            <span className="font-hk text-base text-white">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </div>
  )
}
