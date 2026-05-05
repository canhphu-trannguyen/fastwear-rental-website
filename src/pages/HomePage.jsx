import { Link } from 'react-router-dom'

const featuredCategories = [
  { name: "Women's Dresses", href: '/products/categories/womens-dresses' },
  { name: 'Áo Dài', href: '/products/categories/ao-dai' },
  { name: "Men's Suits", href: '/products/categories/mens-suits' },
  { name: 'Shoes & Accessories', href: '/products/categories/shoes' },
]

const rentalSteps = [
  'Choose a garment for your occasion.',
  'Select size, pickup date, and return date.',
  'Pay the rental fee, deposit, and delivery fee.',
  'Return the item after your event for deposit review.',
]

function HomePage() {
  return (
    <main className="bg-stone-50">
      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-800">
            FASTWear Rental
          </p>
          <h1 className="mt-3 text-5xl font-bold leading-tight text-stone-950">
            Occasion wear without the one-time purchase.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-stone-600">
            FASTWear helps students and young professionals rent polished outfits for
            graduations, ceremonies, interviews, parties, and formal events.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/products/categories/all"
              className="rounded-md bg-emerald-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-stone-900"
            >
              Browse Catalog
            </Link>
            <Link
              to="/rental-policy"
              className="rounded-md border border-amber-700/30 bg-white px-5 py-3 text-sm font-semibold text-emerald-950 transition hover:border-amber-700 hover:bg-amber-50"
            >
              View Rental Policy
            </Link>
          </div>
        </div>

        <div className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm">
          <div className="rounded-md bg-emerald-950 p-8 text-white">
            <p className="text-sm font-semibold uppercase tracking-wide text-amber-200">
              Eco-Luxury Wardrobe
            </p>
            <h2 className="mt-4 text-3xl font-bold">Rent better. Own less. Dress fully.</h2>
            <p className="mt-4 text-emerald-50">
              Curated dresses, Áo Dài, suits, shoes, and accessories for moments that matter.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="rounded-lg border border-stone-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-wide text-amber-700">
            Value Proposition
          </p>
          <h2 className="mt-2 text-3xl font-bold text-stone-950">
            Affordable access to premium looks, with less fashion waste.
          </h2>
          <p className="mt-4 max-w-3xl text-stone-600">
            Instead of buying expensive occasion wear for a single event, FASTWear gives customers
            flexible short-term rentals with clear deposits, simple delivery, and curated styling
            categories.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-800">
              Featured Categories
            </p>
            <h2 className="mt-2 text-3xl font-bold text-stone-950">Start with the occasion.</h2>
          </div>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featuredCategories.map((category) => (
            <Link
              key={category.name}
              to={category.href}
              className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-emerald-900/25 hover:shadow-md"
            >
              <span className="text-sm font-semibold text-amber-700">FASTWear</span>
              <h3 className="mt-3 text-xl font-semibold text-stone-950">{category.name}</h3>
              <p className="mt-2 text-sm text-stone-600">Explore rental-ready pieces.</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="rounded-lg border border-stone-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-800">
            How Renting Works
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-4">
            {rentalSteps.map((step, index) => (
              <div key={step} className="rounded-md bg-stone-50 p-4">
                <span className="text-sm font-bold text-amber-700">0{index + 1}</span>
                <p className="mt-3 text-sm font-medium text-stone-800">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

export default HomePage
