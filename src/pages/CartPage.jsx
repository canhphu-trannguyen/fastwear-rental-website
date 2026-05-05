import { Link } from 'react-router-dom'
import { useCart } from '../hooks/useCart'
import { calculateRentalTotals } from '../hooks/useRentalMath'
import { formatVnd } from '../utils/formatCurrency'

function CartPage() {
  const { cartItems, removeCartItem } = useCart()
  const cartTotals = cartItems.reduce(
    (totals, item) => {
      const itemTotals = calculateRentalTotals({
        rentalDays: item.rentalDays,
        rentalPricePerDay: item.rentalPricePerDay,
        retailPriceNumeric: item.retailPriceNumeric,
        shippingMethod: item.shippingMethod,
      })

      return {
        rentalSubtotal: totals.rentalSubtotal + itemTotals.rentalSubtotal,
        depositRequired: totals.depositRequired + itemTotals.depositRequired,
        shippingFee: totals.shippingFee + itemTotals.shippingFee,
        totalPayable: totals.totalPayable + itemTotals.totalPayable,
      }
    },
    {
      rentalSubtotal: 0,
      depositRequired: 0,
      shippingFee: 0,
      totalPayable: 0,
    },
  )

  if (cartItems.length === 0) {
    return (
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="rounded-lg border border-stone-200 bg-stone-50 px-6 py-12 text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-800">
            FASTWear Cart
          </p>
          <h1 className="mt-2 text-3xl font-bold text-stone-950">Your cart is empty</h1>
          <p className="mx-auto mt-3 max-w-xl text-stone-600">
            Choose a rental piece, select your size and rental dates, then add it here.
          </p>
          <Link
            to="/products/categories/all"
            className="mt-6 inline-flex rounded-md bg-emerald-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-stone-900"
          >
            Browse catalog
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-emerald-800">
          FASTWear Cart
        </p>
        <h1 className="mt-2 text-3xl font-bold text-stone-950">Your rental cart</h1>
        <p className="mt-3 text-stone-600">
          Review selected items, rental windows, deposits, and delivery fees.
        </p>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="space-y-4">
          {cartItems.map((item) => (
            <CartItem key={item.id} item={item} onRemove={removeCartItem} />
          ))}
        </div>

        <aside className="h-fit rounded-lg border border-stone-200 bg-stone-50 p-5">
          <h2 className="text-lg font-semibold text-stone-950">Order summary</h2>
          <div className="mt-5 space-y-3 text-sm text-stone-600">
            <SummaryRow label="Rental subtotal" value={formatVnd(cartTotals.rentalSubtotal)} />
            <SummaryRow label="Deposit required" value={formatVnd(cartTotals.depositRequired)} />
            <SummaryRow label="Shipping fee" value={formatVnd(cartTotals.shippingFee)} />
          </div>
          <div className="mt-5 border-t border-stone-200 pt-5">
            <SummaryRow
              label="Total payable"
              value={formatVnd(cartTotals.totalPayable)}
              strong
            />
          </div>
        </aside>
      </div>
    </section>
  )
}

function CartItem({ item, onRemove }) {
  const totals = calculateRentalTotals({
    rentalDays: item.rentalDays,
    rentalPricePerDay: item.rentalPricePerDay,
    retailPriceNumeric: item.retailPriceNumeric,
    shippingMethod: item.shippingMethod,
  })

  return (
    <article className="grid gap-4 rounded-lg border border-stone-200 bg-white p-4 shadow-sm sm:grid-cols-[140px_1fr]">
      <img
        src={item.image}
        alt={item.name}
        className="aspect-[4/5] w-full rounded-md bg-stone-100 object-cover sm:w-[140px]"
      />

      <div className="grid gap-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-800">
              {item.category.name}
            </p>
            <h2 className="mt-1 text-xl font-semibold text-stone-950">{item.name}</h2>
          </div>
          <button
            type="button"
            onClick={() => onRemove(item.id)}
            className="w-fit rounded-md border border-stone-300 px-3 py-2 text-sm font-semibold text-stone-700 transition hover:border-red-700 hover:bg-red-50 hover:text-red-800"
          >
            Remove
          </button>
        </div>

        <div className="grid gap-3 text-sm text-stone-600 sm:grid-cols-2">
          <CartMeta label="Selected size" value={item.selectedSize} />
          <CartMeta label="Rental days" value={`${item.rentalDays} days`} />
          <CartMeta label="Pickup date" value={item.pickupDate} />
          <CartMeta label="Return date" value={item.returnDate} />
        </div>

        <div className="grid gap-3 rounded-md bg-stone-50 p-4 text-sm text-stone-600 sm:grid-cols-2">
          <CartMeta label="Rental subtotal" value={formatVnd(totals.rentalSubtotal)} />
          <CartMeta label="Deposit" value={formatVnd(totals.depositRequired)} />
          <CartMeta label="Shipping fee" value={formatVnd(totals.shippingFee)} />
          <CartMeta label="Total payable" value={formatVnd(totals.totalPayable)} strong />
        </div>
      </div>
    </article>
  )
}

function CartMeta({ label, value, strong = false }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">{label}</p>
      <p className={`mt-1 ${strong ? 'font-semibold text-stone-950' : 'text-stone-700'}`}>
        {value}
      </p>
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

export default CartPage
