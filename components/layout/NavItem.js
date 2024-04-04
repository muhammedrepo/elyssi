import Link from 'next/link'

export default function NavItem({ item }) {
  return (
    <li
      className={`mr-10 ${item.dropdown && 'group hidden lg:block'}`}
      key={item.text}>
      {item.dropdown ? (
        <>
          <div className="flex items-center border-b-2 border-white transition-colors group-hover:border-primary">
            <span className="cursor-pointer px-2 font-hk text-lg text-secondary transition-all group-hover:font-bold group-hover:text-primary">
              {item.text}
            </span>
            <i className="bx bx-chevron-down px-2 pl-2 text-secondary transition-colors group-hover:text-primary"></i>
          </div>
          <div className="pointer-events-none absolute top-0 left-0 right-0 z-50 mx-auto mt-40 w-2/3 pt-10 opacity-0 group-hover:pointer-events-auto group-hover:opacity-100">
            <div className="relative flex rounded-b bg-white p-8 shadow-lg transition-all">
              {item.submenu.map((subitem) => (
                <div className="relative z-20 flex-1" key={subitem.text}>
                  <h4 className="font-hkbold mb-2 text-base text-secondary">
                    {subitem.text}
                  </h4>
                  <ul>
                    {subitem.links.map((link) => (
                      <li key={link.text}>
                        <Link
                          href={link.path}
                          className="border-b border-transparent font-hk text-sm leading-loose text-secondary-lighter hover:border-secondary-lighter">
                          {link.text}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <div className="flex-1">
                <div
                  className="absolute inset-0 z-0 bg-contain bg-right-bottom bg-no-repeat"
                  style={{
                    backgroundImage: `url(/assets/img/unlicensed/bg-mega-menu.png)`,
                  }}></div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <Link
          href={item.path}
          className="block border-b-2 border-white px-2 font-hk text-lg text-secondary transition-all hover:border-primary hover:font-bold hover:text-primary">
          {item.text}
        </Link>
      )}
    </li>
  )
}
