import { useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import ProductFilter from '../components/ProductFilter/ProductFilter'
import products from '../data/products.mock.json'

const categoryLabels = {
  all: 'All Rentals',
  'womens-dresses': "Women's Dresses",
  'ao-dai': 'Áo Dài',
  'mens-suits': "Men's Suits",
  shoes: 'Shoes',
  accessories: 'Accessories',
}

const categorySizeOptions = {
  'womens-dresses': ['XS', 'S', 'M', 'L', 'XL'],
  'ao-dai': ['XS', 'S', 'M', 'L', 'XL'],
  'mens-suits': ['S', 'M', 'L', 'XL'],
  shoes: ['35', '36', '37', '38', '39', '40', '41', '42', '43'],
  accessories: ['One Size'],
}

const groupedAllSizeOptions = [
  { label: 'Clothing Sizes', options: ['XS', 'S', 'M', 'L', 'XL'] },
  { label: 'Shoe Sizes', options: ['35', '36', '37', '38', '39', '40', '41', '42', '43'] },
  { label: 'Accessories', options: ['One Size'] },
]

const initialFilters = {
  category: 'all',
  size: 'all',
  occasion: 'all',
  priceRange: 'all',
  color: 'all',
  gender: 'all',
}

function CatalogPage() {
  const { category = 'all' } = useParams()
  const [filters, setFilters] = useState(initialFilters)
  const activeCategory = categoryLabels[category] ?? 'All Rentals'
  const routeProducts = useMemo(
    () =>
      category === 'all'
        ? products
        : products.filter((product) => product.category.slug === category),
    [category],
  )
  const filterOptions = useMemo(() => buildFilterOptions(routeProducts), [routeProducts])
  const activeFilterCategory =
    category !== 'all' ? category : filters.category !== 'all' ? filters.category : 'all'
  const sizeOptions = useMemo(() => getSizeOptions(activeFilterCategory), [activeFilterCategory])
  const validSizes = useMemo(() => getFlatSizeOptions(activeFilterCategory), [activeFilterCategory])
  const safeFilters = useMemo(
    () => ({
      ...filters,
      size: filters.size === 'all' || validSizes.includes(filters.size) ? filters.size : 'all',
    }),
    [filters, validSizes],
  )
  const visibleProducts = useMemo(
    () => routeProducts.filter((product) => productMatchesFilters(product, safeFilters)),
    [safeFilters, routeProducts],
  )

  function handleFilterChange(event) {
    const { name, value } = event.target
    setFilters((currentFilters) => {
      const nextFilters = { ...currentFilters, [name]: value }

      if (name === 'category') {
        const nextCategory = category !== 'all' ? category : value
        const nextValidSizes = getFlatSizeOptions(nextCategory)

        if (nextFilters.size !== 'all' && !nextValidSizes.includes(nextFilters.size)) {
          nextFilters.size = 'all'
        }
      }

      return nextFilters
    })
  }

  function clearFilters() {
    setFilters(initialFilters)
  }

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

      <div className="mt-8 grid gap-8 lg:grid-cols-[280px_1fr]">
        <ProductFilter
          filters={safeFilters}
          options={{ ...filterOptions, sizes: sizeOptions }}
          onFilterChange={handleFilterChange}
          onClearFilters={clearFilters}
        />

        <div>
          <p className="text-sm text-stone-600">
            Showing {visibleProducts.length} of {routeProducts.length} products
          </p>

          {visibleProducts.length > 0 ? (
            <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {visibleProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="mt-4 rounded-lg border border-stone-200 bg-stone-50 px-6 py-12 text-center">
              <h2 className="text-2xl font-semibold text-stone-950">No rentals found</h2>
              <p className="mx-auto mt-3 max-w-lg text-stone-600">
                Try clearing filters or choosing a broader size, occasion, color, or price range.
              </p>
              <button
                type="button"
                onClick={clearFilters}
                className="mt-6 rounded-md bg-emerald-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-stone-900"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

function buildFilterOptions(productList) {
  return {
    categories: uniqueBy(
      productList.map((product) => ({
        value: product.category.slug,
        label: product.category.name,
      })),
      'value',
    ),
    occasions: uniqueValues(productList.flatMap((product) => product.occasions ?? [])),
    colors: uniqueValues(productList.flatMap((product) => product.colors ?? [])),
    genders: uniqueValues(productList.map((product) => getProductGender(product))),
  }
}

function productMatchesFilters(product, filters) {
  const productSizes = getProductSizes(product)
  const productGender = getProductGender(product)

  return (
    (filters.category === 'all' || product.category.slug === filters.category) &&
    (filters.size === 'all' || productSizes.includes(filters.size)) &&
    (filters.occasion === 'all' || product.occasions?.includes(filters.occasion)) &&
    (filters.priceRange === 'all' ||
      priceMatchesRange(product.rental_price_per_day, filters.priceRange)) &&
    (filters.color === 'all' || product.colors?.includes(filters.color)) &&
    (filters.gender === 'all' || productGender === filters.gender)
  )
}

function getProductSizes(product) {
  return product.specifications?.sizes_available ?? product.sizes ?? []
}

function getSizeOptions(categorySlug) {
  if (categorySlug === 'all') {
    return groupedAllSizeOptions
  }

  return categorySizeOptions[categorySlug] ?? groupedAllSizeOptions
}

function getFlatSizeOptions(categorySlug) {
  const options = getSizeOptions(categorySlug)

  if (options.length > 0 && typeof options[0] === 'object') {
    return options.flatMap((group) => group.options)
  }

  return options
}

function getProductGender(product) {
  if (product.gender) {
    return product.gender
  }

  if (product.category.slug === 'mens-suits') {
    return 'Men'
  }

  if (['womens-dresses', 'ao-dai'].includes(product.category.slug)) {
    return 'Women'
  }

  return 'Unisex'
}

function priceMatchesRange(price, range) {
  if (range === 'under-150000') {
    return price < 150000
  }

  if (range === '150000-300000') {
    return price >= 150000 && price <= 300000
  }

  if (range === '300000-450000') {
    return price >= 300000 && price <= 450000
  }

  if (range === 'over-450000') {
    return price > 450000
  }

  return true
}

function uniqueValues(values) {
  return [...new Set(values.filter(Boolean))].sort((first, second) =>
    first.localeCompare(second),
  )
}

function uniqueBy(items, key) {
  const seen = new Set()
  return items.filter((item) => {
    if (seen.has(item[key])) {
      return false
    }

    seen.add(item[key])
    return true
  })
}

export default CatalogPage
