import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../hooks/useCart'
import { formatVnd } from '../utils/formatCurrency'

const latestOrderKey = 'fastwear_latest_order'

const initialForm = {
  customer_name: '',
  phone: '',
  email: '',
  delivery_address: '',
  delivery_method: 'standard_delivery',
  payment_method: 'cash_on_delivery',
  note: '',
}

function CheckoutPage() {
  const navigate = useNavigate()
  const { cartItems, clearCart } = useCart()
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const orderTotals = useMemo(
    () => calculateOrderTotals(cartItems, form.delivery_method),
    [cartItems, form.delivery_method],
  )

  function updateField(event) {
    const { name, value } = event.target
    setForm((currentForm) => ({ ...currentForm, [name]: value }))
    setErrors((currentErrors) => ({ ...currentErrors, [name]: '' }))
  }

  function validateForm() {
    const nextErrors = {}

    if (cartItems.length === 0) {
      nextErrors.cart = 'Your cart is empty. Add a rental item before checkout.'
    }

    for (const field of ['customer_name', 'phone', 'email', 'delivery_address']) {
      if (!form[field].trim()) {
        nextErrors[field] = 'This field is required.'
      }
    }

    return nextErrors
  }

  function handleSubmit(event) {
    event.preventDefault()
    const nextErrors = validateForm()

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }

    const order = {
      id: `FW-${Date.now()}`,
      created_at: new Date().toISOString(),
      customer: {
        customer_name: form.customer_name,
        phone: form.phone,
        email: form.email,
        delivery_address: form.delivery_address,
      },
      delivery_method: form.delivery_method,
      payment_method: form.payment_method,
      note: form.note,
      items: cartItems,
      totals: orderTotals,
    }

    localStorage.setItem(latestOrderKey, JSON.stringify(order))
    clearCart()
    navigate('/order-success')
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-emerald-800">
          FASTWear Checkout
        </p>
        <h1 className="mt-2 text-3xl font-bold text-stone-950">Confirm your rental</h1>
        <p className="mt-3 text-stone-600">
          Review your order details and add the delivery information for this mock checkout.
        </p>
      </div>

      {errors.cart && (
        <div className="mt-8 rounded-lg border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-800">
          {errors.cart}{' '}
          <Link to="/products/categories/all" className="underline">
            Continue browsing
          </Link>
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
        <div className="space-y-6">
          <section className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm">
            <h2 className="text-xl font-semibold text-stone-950">Customer information</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <TextField
                label="Customer name"
                name="customer_name"
                value={form.customer_name}
                onChange={updateField}
                error={errors.customer_name}
              />
              <TextField
                label="Phone"
                name="phone"
                value={form.phone}
                onChange={updateField}
                error={errors.phone}
              />
              <TextField
                label="Email"
                name="email"
                type="email"
                value={form.email}
                onChange={updateField}
                error={errors.email}
              />
              <SelectField
                label="Delivery method"
                name="delivery_method"
                value={form.delivery_method}
                onChange={updateField}
                options={[
                  { value: 'standard_delivery', label: 'Standard delivery' },
                  { value: 'store_pickup', label: 'Store pickup' },
                ]}
              />
              <div className="sm:col-span-2">
                <TextField
                  label="Delivery address"
                  name="delivery_address"
                  value={form.delivery_address}
                  onChange={updateField}
                  error={errors.delivery_address}
                />
              </div>
              <SelectField
                label="Payment method"
                name="payment_method"
                value={form.payment_method}
                onChange={updateField}
                options={[
                  { value: 'cash_on_delivery', label: 'Cash on delivery' },
                  { value: 'bank_transfer', label: 'Bank transfer' },
                ]}
              />
              <label className="grid gap-2 text-sm font-medium text-stone-700 sm:col-span-2">
                Note
                <textarea
                  name="note"
                  value={form.note}
                  onChange={updateField}
                  rows="4"
                  className="rounded-md border border-stone-300 bg-white px-3 py-2 text-stone-950 outline-none transition focus:border-emerald-900 focus:ring-2 focus:ring-emerald-900/10"
                />
              </label>
            </div>
          </section>

          <section className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm">
            <h2 className="text-xl font-semibold text-stone-950">Cart items</h2>
            <div className="mt-5 space-y-4">
              {cartItems.length === 0 ? (
                <p className="text-sm text-stone-600">No items in cart.</p>
              ) : (
                cartItems.map((item) => <CheckoutItem key={item.id} item={item} />)
              )}
            </div>
          </section>
        </div>

        <aside className="h-fit rounded-lg border border-stone-200 bg-stone-50 p-5">
          <h2 className="text-xl font-semibold text-stone-950">Payment summary</h2>
          <div className="mt-5 space-y-3 text-sm text-stone-600">
            <SummaryRow label="Rental subtotal" value={formatVnd(orderTotals.rentalSubtotal)} />
            <SummaryRow label="Deposit required" value={formatVnd(orderTotals.depositRequired)} />
            <SummaryRow label="Shipping fee" value={formatVnd(orderTotals.shippingFee)} />
          </div>
          <div className="mt-5 border-t border-stone-200 pt-5">
            <SummaryRow label="Total payable" value={formatVnd(orderTotals.totalPayable)} strong />
          </div>
          <button
            type="submit"
            className="mt-6 w-full rounded-md bg-emerald-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-stone-900"
          >
            Place mock order
          </button>
        </aside>
      </form>
    </section>
  )
}

function calculateOrderTotals(items, deliveryMethod) {
  const itemTotals = items.reduce(
    (totals, item) => ({
      rentalSubtotal: totals.rentalSubtotal + item.rentalDays * item.rentalPricePerDay,
      depositRequired: totals.depositRequired + item.retailPriceNumeric * 0.5,
    }),
    { rentalSubtotal: 0, depositRequired: 0 },
  )
  const shippingFee = deliveryMethod === 'standard_delivery' ? 30000 : 0

  return {
    ...itemTotals,
    shippingFee,
    totalPayable: itemTotals.rentalSubtotal + itemTotals.depositRequired + shippingFee,
  }
}

function CheckoutItem({ item }) {
  return (
    <article className="grid gap-4 rounded-md bg-stone-50 p-4 sm:grid-cols-[88px_1fr]">
      <img
        src={item.image}
        alt={item.name}
        className="aspect-[4/5] w-full rounded-md object-cover sm:w-[88px]"
      />
      <div>
        <h3 className="font-semibold text-stone-950">{item.name}</h3>
        <p className="mt-1 text-sm text-stone-600">
          Size {item.selectedSize} · {item.rentalDays} days
        </p>
        <p className="mt-1 text-sm text-stone-600">
          {item.pickupDate} to {item.returnDate}
        </p>
      </div>
    </article>
  )
}

function TextField({ label, name, value, onChange, error, type = 'text' }) {
  return (
    <label className="grid gap-2 text-sm font-medium text-stone-700">
      {label}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="rounded-md border border-stone-300 bg-white px-3 py-2 text-stone-950 outline-none transition focus:border-emerald-900 focus:ring-2 focus:ring-emerald-900/10"
      />
      {error && <span className="text-xs text-red-700">{error}</span>}
    </label>
  )
}

function SelectField({ label, name, value, onChange, options }) {
  return (
    <label className="grid gap-2 text-sm font-medium text-stone-700">
      {label}
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="rounded-md border border-stone-300 bg-white px-3 py-2 text-stone-950 outline-none transition focus:border-emerald-900 focus:ring-2 focus:ring-emerald-900/10"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
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

export default CheckoutPage
