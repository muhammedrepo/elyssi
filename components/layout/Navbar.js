import data from '@/utils/data'
import NavItem from './NavItem'

export default function Navbar() {
  return (
    <div className="hidden justify-center lg:flex lg:pt-8">
      <ul className="flex items-center">
        {data.menuItems.map((item) => (
          <NavItem item={item} key={item.text} />
        ))}
      </ul>
    </div>
  )
}
