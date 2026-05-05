import { useParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import products from '../data/products.mock.json'

const categoryLabels = {
  all: 'All Rentals',
  'womens-dresses': "Women's Dresses",
  'ao-dai': 'Áo Dài',
  'mens-suits': "Men's Suits",
  shoes: 'Shoes',
  accessories: 'Accessories',
}

function CatalogPage() {
  const { category = 'all' } = useParams()
  const activeCategory = categoryLabels[category] ?? 'All Rentals'
  const visibleProducts =
    activeCategory === 'All Rentals'
      ? products
      : products.filter((product) => product.category === activeCategory)

  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-emerald-800">
          FASTWear Catalog
        </p>
        <h1 className="mt-2 text-3xl font-bold text-stone-950">{activeCategory}</h1>
        <p className="mt-3 text-stone-600">
          Browse rental-ready pieces selected for polished occasions and mindful reuse.
        </p>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {visibleProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}

export default CatalogPage
