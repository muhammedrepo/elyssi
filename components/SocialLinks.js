import data from '@/utils/data'
import Link from 'next/link'

const SocialLinks = ({ bgDark }) => {
  const renderedLinks = data.socialIcons.map((socialIcon) => (
    <Link key={socialIcon.url} href={socialIcon.url} className="group">
      <div
        className={`flex items-center rounded-full transition-colors ${
          bgDark
            ? 'bg-secondary-lighter mr-2 p-3 hover:bg-primary text-white'
            : 'mr-5 bg-white text-secondary group-hover:bg-primary group-hover:text-white p-2'
        }    `}>
        {socialIcon.icon}
      </div>
    </Link>
  ))
  return (
    <div
      className={`flex items-center justify-center pt-5 ${
        bgDark ? 'sm:justify-start pt-8' : ''
      }`}>
      {renderedLinks}
    </div>
  )
}
export default SocialLinks
