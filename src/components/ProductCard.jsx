import { Link } from 'react-router-dom'
import { formatVnd } from '../utils/formatCurrency'

function ProductCard({ product }) {
  const [mainImage] = product.images

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-stone-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-900/25 hover:shadow-xl hover:shadow-stone-200/70">
      <Link to={`/products/${product.slug}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden bg-stone-100">
          <img
            src={mainImage}
            alt={product.name}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-stone-950/50 to-transparent p-4 opacity-0 transition duration-300 group-hover:opacity-100">
            <span className="inline-flex rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-emerald-950">
              {product.condition}
            </span>
          </div>
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-800">
            {product.category.name}
          </p>
          <Link to={`/products/${product.slug}`} className="block">
            <h2 className="text-lg font-semibold leading-snug text-stone-950 transition group-hover:text-emerald-950">
              {product.name}
            </h2>
          </Link>
        </div>

        <div className="grid gap-2 text-sm text-stone-600">
          <p>
            <span className="text-base font-semibold text-stone-950">
              {formatVnd(product.rental_price_per_day)}
            </span>
            <span className="text-stone-500">/day</span>
          </p>
          <p>
            <span className="font-medium text-stone-800">Condition:</span>{' '}
            {product.condition}
          </p>
          <p className="line-clamp-1">
            <span className="font-medium text-stone-800">Sizes:</span>{' '}
            {product.sizes.join(', ')}
          </p>
        </div>

        <div className="mt-auto grid grid-cols-2 gap-2 pt-2">
          <Link
            to={`/products/${product.slug}`}
            className="rounded-md border border-emerald-900/20 px-3 py-2 text-center text-sm font-semibold text-emerald-950 transition hover:border-emerald-950 hover:bg-emerald-50"
          >
            View details
          </Link>
          <button
            type="button"
            className="rounded-md bg-emerald-950 px-3 py-2 text-sm font-semibold text-white transition hover:bg-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-900 focus:ring-offset-2"
          >
            Add to cart
          </button>
        </div>
      </div>
    </article>
  )
}

export default ProductCard
