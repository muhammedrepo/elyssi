import ProductItem from '@/components/ProductItem'

export default function ProductsScreen({ products }) {
  if (products.length === 0) {
    return <h1>No products found</h1>
  }
  return (
    <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductItem key={product.slug} product={product} />
      ))}
    </div>
  )
}
