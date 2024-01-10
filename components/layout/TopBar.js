import Link from 'next/link'
import Image from 'next/image'

export default function TopBar() {
  return (
    <div
      className="flex items-center justify-center p-2"
      style={{ backgroundColor: '#24c790' }}>
      <Image
        src="/images/logo-r.svg"
        alt="red pixel themes logo"
        className="mr-4 h-7 w-auto md:h-10"
        height={28}
        width={100}
        style={{
          maxWidth: '100%',
          height: '28px',
        }}
      />
      <p className="font-body w-auto text-xs font-bold text-white md:text-xl">
        Like what you see? You can download it{' '}
        <Link
          className="inline-block text-white underline"
          href="https://redpixelthemes.com/templates/elyssi/"
          target="_blank">
          here
        </Link>
      </p>
    </div>
  )
}
