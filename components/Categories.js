import Link from 'next/link'

const CategoryItem = ({ category }) => (
  <Link href={`/posts/${category}`}>
    <span className="group mt-8 flex justify-between border-b border-grey-dark pb-4">
      <p className="font-hk text-base capitalize text-secondary transition-colors group-hover:font-bold group-hover:text-primary">
        {category}
      </p>
      <span className="font-hk text-base text-secondary transition-colors group-hover:font-bold group-hover:text-primary">
        {category}
      </span>
    </span>
  </Link>
)

export default function Categories({ allCategories }) {
  if (!allCategories || allCategories.length === 0) {
    return <p>No categories available.</p>
  }
  return (
    <div className="mb-16">
      <h4 className="border-b border-grey-dark pb-2 text-center font-butler text-xl text-secondary sm:text-left md:text-2xl lg:text-3xl">
        Categories
      </h4>
      {allCategories?.map((category, index) => (
        <CategoryItem key={index} category={category} />
      ))}
    </div>
  )
}
