import { useEffect, useState } from 'react'
import Confetti from 'react-confetti'
import { Link } from 'react-router-dom'
import { formatVnd } from '../utils/formatCurrency'

const latestOrderKey = 'fastwear_latest_order'

function OrderSuccessPage() {
  const [order] = useState(() => {
    const storedOrder = localStorage.getItem(latestOrderKey)
    return storedOrder ? JSON.parse(storedOrder) : null
  })
  const [showConfetti, setShowConfetti] = useState(true)

  useEffect(() => {
    const timer = window.setTimeout(() => setShowConfetti(false), 4500)
    return () => window.clearTimeout(timer)
  }, [])

  if (!order) {
    return (
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="rounded-lg border border-stone-200 bg-stone-50 px-6 py-12 text-center">
          <h1 className="text-3xl font-bold text-stone-950">No recent order found</h1>
          <p className="mx-auto mt-3 max-w-xl text-stone-600">
            Complete a mock checkout to see the order success details here.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <ActionLink to="/" label="Back to Home" />
            <ActionLink to="/products/categories/all" label="Continue Browsing" variant="dark" />
          </div>
        </div>
      </section>
    )
  }

  const firstItem = order.items[0]

  return (
    <section className="relative mx-auto max-w-6xl px-4 py-12">
      {showConfetti && <Confetti recycle={false} numberOfPieces={220} />}

      <div className="rounded-lg border border-emerald-900/15 bg-emerald-50 px-6 py-10 text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-emerald-800">
          Order Confirmed
        </p>
        <h1 className="mt-2 text-4xl font-bold text-stone-950">
          Your FASTWear rental is reserved
        </h1>
        <p className="mt-3 text-stone-600">
          Mock order <span className="font-semibold text-stone-950">{order.id}</span> has been
          saved locally.
        </p>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-semibold text-stone-950">Order details</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <Detail label="Customer name" value={order.customer.customer_name} />
            <Detail label="Mock order ID" value={order.id} />
            <Detail label="Pickup date" value={firstItem?.pickupDate ?? '-'} />
            <Detail label="Return date" value={firstItem?.returnDate ?? '-'} />
          </div>

          <div className="mt-8">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-stone-500">
              Products
            </h3>
            <div className="mt-3 space-y-3">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between gap-4 rounded-md bg-stone-50 p-4"
                >
                  <div>
                    <p className="font-semibold text-stone-950">{item.name}</p>
                    <p className="mt-1 text-sm text-stone-600">
                      Size {item.selectedSize} · {item.rentalDays} days
                    </p>
                  </div>
                  <p className="text-sm font-medium text-stone-700">
                    {formatVnd(item.rentalDays * item.rentalPricePerDay)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <aside className="h-fit rounded-lg border border-stone-200 bg-stone-50 p-5">
          <h2 className="text-xl font-semibold text-stone-950">Payment summary</h2>
          <div className="mt-5 space-y-3 text-sm text-stone-600">
            <SummaryRow label="Rental subtotal" value={formatVnd(order.totals.rentalSubtotal)} />
            <SummaryRow label="Deposit required" value={formatVnd(order.totals.depositRequired)} />
            <SummaryRow label="Shipping fee" value={formatVnd(order.totals.shippingFee)} />
          </div>
          <div className="mt-5 border-t border-stone-200 pt-5">
            <SummaryRow
              label="Total payable"
              value={formatVnd(order.totals.totalPayable)}
              strong
            />
          </div>
          <div className="mt-6 grid gap-3">
            <ActionLink to="/" label="Back to Home" />
            <ActionLink to="/products/categories/all" label="Continue Browsing" variant="dark" />
          </div>
        </aside>
      </div>
    </section>
  )
}

function Detail({ label, value }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">{label}</p>
      <p className="mt-1 font-medium text-stone-950">{value}</p>
    </div>
  )
}

function SummaryRow({ label, value, strong = false }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className={strong ? 'font-semibold text-stone-950' : ''}>{label}</span>
      <span className={strong ? 'font-semibold text-stone-950' : 'text-stone-700'}>{value}</span>
    </div>
  )
}

function ActionLink({ to, label, variant = 'light' }) {
  const classes =
    variant === 'dark'
      ? 'rounded-md bg-emerald-950 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-stone-900'
      : 'rounded-md border border-emerald-900/20 bg-white px-4 py-3 text-center text-sm font-semibold text-emerald-950 transition hover:border-emerald-950 hover:bg-emerald-50'

  return (
    <Link to={to} className={classes}>
      {label}
    </Link>
  )
}

export default OrderSuccessPage
