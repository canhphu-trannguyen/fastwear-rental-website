import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import products from '../data/products.mock.json'
import { useCart } from '../hooks/useCart'
import { useRentalMath } from '../hooks/useRentalMath'
import { formatVnd } from '../utils/formatCurrency'

function ProductDetailPage() {
  const { slug } = useParams()
  const { addCartItem } = useCart()
  const product = products.find((item) => item.slug === slug)
  const [selectedSize, setSelectedSize] = useState('')
  const [pickupDate, setPickupDate] = useState('')
  const [returnDate, setReturnDate] = useState('')
  const [message, setMessage] = useState('')

  const rentalMath = useRentalMath({
    pickupDate,
    returnDate,
    rentalPricePerDay: product?.rental_price_per_day ?? 0,
    retailPriceNumeric: product?.retail_price ?? 0,
    shippingMethod: 'standard_delivery',
  })

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

  const unavailableDates = new Set(product.unavailable_dates)
  const isPickupUnavailable = unavailableDates.has(pickupDate)
  const isReturnUnavailable = unavailableDates.has(returnDate)
  const hasSelectedDates = Boolean(pickupDate && returnDate)
  const canAddToCart =
    selectedSize &&
    hasSelectedDates &&
    rentalMath.isDurationValid &&
    !isPickupUnavailable &&
    !isReturnUnavailable
  const [mainImage, ...galleryImages] = product.images

  function handleAddToCart() {
    if (!canAddToCart) {
      setMessage('Select a size and a valid 2-7 day rental window before adding this item.')
      return
    }

    addCartItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      category: product.category,
      image: mainImage,
      selectedSize,
      pickupDate,
      returnDate,
      rentalDays: rentalMath.rentalDays,
      rentalPricePerDay: product.rental_price_per_day,
      retailPriceNumeric: product.retail_price,
      shippingMethod: 'standard_delivery',
    })
    setMessage('Added to cart.')
  }

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

          <div className="mt-8 rounded-lg border border-stone-200 bg-stone-50 p-5">
            <h2 className="text-lg font-semibold text-stone-950">Rental details</h2>

            <div className="mt-5 grid gap-4">
              <label className="grid gap-2 text-sm font-medium text-stone-700">
                Size
                <select
                  value={selectedSize}
                  onChange={(event) => setSelectedSize(event.target.value)}
                  className="rounded-md border border-stone-300 bg-white px-3 py-2 text-stone-950 outline-none transition focus:border-emerald-900 focus:ring-2 focus:ring-emerald-900/10"
                >
                  <option value="">Select size</option>
                  {product.sizes.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </label>

              <div className="grid gap-4 sm:grid-cols-2">
                <DateField
                  label="Pickup date"
                  value={pickupDate}
                  onChange={setPickupDate}
                  isUnavailable={isPickupUnavailable}
                />
                <DateField
                  label="Return date"
                  value={returnDate}
                  onChange={setReturnDate}
                  isUnavailable={isReturnUnavailable}
                />
              </div>
            </div>

            <div className="mt-5 grid gap-2 text-sm text-stone-600">
              <p>Rental duration: {rentalMath.rentalDays || '-'} days</p>
              <p>Rental subtotal: {formatVnd(rentalMath.rentalSubtotal)}</p>
              <p>Deposit required: {formatVnd(rentalMath.depositRequired)}</p>
              <p>Standard delivery: {formatVnd(rentalMath.shippingFee)}</p>
              <p className="text-base font-semibold text-stone-950">
                Total payable: {formatVnd(rentalMath.totalPayable)}
              </p>
            </div>

            {hasSelectedDates && !rentalMath.isDurationValid && (
              <p className="mt-4 text-sm font-medium text-red-700">
                Rental duration must be between 2 and 7 days.
              </p>
            )}
            {(isPickupUnavailable || isReturnUnavailable) && (
              <p className="mt-4 text-sm font-medium text-red-700">
                Selected dates cannot be in the unavailable dates list.
              </p>
            )}
            {message && <p className="mt-4 text-sm font-medium text-emerald-900">{message}</p>}

            <button
              type="button"
              disabled={!canAddToCart}
              onClick={handleAddToCart}
              className="mt-5 w-full rounded-md bg-emerald-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-stone-900 disabled:cursor-not-allowed disabled:bg-stone-300 disabled:text-stone-600"
            >
              Add to cart
            </button>
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

function DateField({ label, value, onChange, isUnavailable }) {
  return (
    <label className="grid gap-2 text-sm font-medium text-stone-700">
      {label}
      <input
        type="date"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="rounded-md border border-stone-300 bg-white px-3 py-2 text-stone-950 outline-none transition focus:border-emerald-900 focus:ring-2 focus:ring-emerald-900/10"
      />
      {isUnavailable && <span className="text-xs text-red-700">This date is unavailable.</span>}
    </label>
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
