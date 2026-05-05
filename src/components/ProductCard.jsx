import { Link } from 'react-router-dom'

function ProductCard({ product }) {
  const [mainImage] = product.images

  return (
    <Link
      to={`/products/${product.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-lg border border-stone-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
    >
      <div className="aspect-[4/5] overflow-hidden bg-stone-100">
        <img
          src={mainImage}
          alt={product.name}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-800">
            {product.category}
          </p>
          <h2 className="mt-1 text-lg font-semibold text-stone-950">{product.name}</h2>
        </div>

        <div className="mt-auto space-y-2 text-sm text-stone-600">
          <p>
            <span className="font-medium text-stone-900">${product.rentalPricePerDay}</span>
            /day
          </p>
          <p>Condition: {product.condition}</p>
          <p>Sizes: {product.sizes.join(', ')}</p>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard
