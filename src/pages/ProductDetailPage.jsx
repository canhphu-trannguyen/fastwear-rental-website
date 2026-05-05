import { Link, useParams } from 'react-router-dom'
import products from '../data/products.mock.json'
import { formatVnd } from '../utils/formatCurrency'

function ProductDetailPage() {
  const { slug } = useParams()
  const product = products.find((item) => item.slug === slug)

  if (!product) {
    return (
      <section className="mx-auto max-w-6xl px-4 py-12">
        <Link
          to="/products/categories/all"
          className="text-sm font-semibold text-emerald-800 hover:text-emerald-950"
        >
          Back to Catalog
        </Link>
        <h1 className="mt-6 text-3xl font-bold text-stone-950">Product Not Found</h1>
        <p className="mt-3 text-stone-600">
          This rental item is not available in the FASTWear mock catalog.
        </p>
      </section>
    )
  }

  const [mainImage, ...galleryImages] = product.images

  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <Link
        to={`/products/categories/${product.category.slug}`}
        className="text-sm font-semibold text-emerald-800 hover:text-emerald-950"
      >
        Back to Catalog
      </Link>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-4">
          <div className="overflow-hidden rounded-lg bg-stone-100">
            <img
              src={mainImage}
              alt={product.name}
              className="aspect-[4/5] w-full object-cover"
            />
          </div>

          {galleryImages.length > 0 && (
            <div className="grid grid-cols-2 gap-4">
              {galleryImages.map((image) => (
                <div key={image} className="overflow-hidden rounded-lg bg-stone-100">
                  <img
                    src={image}
                    alt={`${product.name} gallery view`}
                    className="aspect-[4/3] w-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-800">
            {product.category.name}
          </p>
          <h1 className="mt-2 text-4xl font-bold text-stone-950">{product.name}</h1>
          <p className="mt-4 text-stone-600">{product.description}</p>

          <div className="mt-8 grid gap-4 border-y border-stone-200 py-6 sm:grid-cols-2">
            <DetailItem
              label="Rental Price"
              value={`${formatVnd(product.rental_price_per_day)}/day`}
            />
            <DetailItem label="Retail Price" value={formatVnd(product.retail_price)} />
            <DetailItem label="Condition" value={product.condition} />
            <DetailItem label="Material" value={product.material} />
          </div>

          <div className="mt-8 space-y-6">
            <BadgeGroup label="Sizes Available" items={product.sizes} />
            <BadgeGroup label="Occasions" items={product.occasions} />
            <BadgeGroup label="Colors" items={product.colors} />
            <BadgeGroup
              label="Unavailable Dates"
              items={
                product.unavailable_dates.length > 0
                  ? product.unavailable_dates
                  : ['No unavailable dates listed']
              }
            />
          </div>
        </div>
      </div>
    </section>
  )
}

function DetailItem({ label, value }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">{label}</p>
      <p className="mt-1 font-medium text-stone-950">{value}</p>
    </div>
  )
}

function BadgeGroup({ label, items }) {
  return (
    <div>
      <h2 className="text-sm font-semibold uppercase tracking-wide text-stone-500">{label}</h2>
      <div className="mt-3 flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item}
            className="rounded-full border border-emerald-900/15 bg-emerald-50 px-3 py-1 text-sm text-emerald-950"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

export default ProductDetailPage
