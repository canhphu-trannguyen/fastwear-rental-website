const conceptCards = [
  {
    title: 'The Problem',
    text: 'Occasion wear is often expensive, rarely reused, and hard to store after a single event.',
  },
  {
    title: 'The Solution',
    text: 'FASTWear offers a curated rental catalog where customers can access polished garments for short rental windows.',
  },
  {
    title: 'The Model',
    text: 'A hybrid showroom and online rental experience helps customers browse digitally and rent with confidence.',
  },
]

function AboutUsPage() {
  return (
    <main className="bg-stone-50">
      <section className="mx-auto max-w-6xl px-4 py-16">
        <p className="text-sm font-semibold uppercase tracking-wide text-emerald-800">
          About FASTWear
        </p>
        <h1 className="mt-3 max-w-4xl text-5xl font-bold leading-tight text-stone-950">
          A front-end rental concept for smarter occasion dressing.
        </h1>
        <p className="mt-5 max-w-3xl text-lg text-stone-600">
          FASTWear is designed as a mid-term e-commerce rental website for customers who need
          event-ready fashion without committing to permanent ownership.
        </p>
      </section>

      <section className="mx-auto grid max-w-6xl gap-4 px-4 py-8 md:grid-cols-3">
        {conceptCards.map((card) => (
          <article key={card.title} className="rounded-lg border border-stone-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-stone-950">{card.title}</h2>
            <p className="mt-3 text-stone-600">{card.text}</p>
          </article>
        ))}
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-6 lg:grid-cols-2">
          <article className="rounded-lg border border-stone-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-wide text-amber-700">
              Sustainability Angle
            </p>
            <h2 className="mt-2 text-3xl font-bold text-stone-950">Wear more intentionally.</h2>
            <p className="mt-4 text-stone-600">
              Renting extends the practical life of occasion wear and reduces pressure to buy new
              garments for every ceremony, party, or photo session. FASTWear frames fashion as
              access, not accumulation.
            </p>
          </article>

          <article className="rounded-lg border border-stone-200 bg-emerald-950 p-6 text-white shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-wide text-amber-200">
              Showroom + Online
            </p>
            <h2 className="mt-2 text-3xl font-bold">A rental flow customers can understand.</h2>
            <p className="mt-4 text-emerald-50">
              Customers discover items online, review prices and policies, then rent through a
              structured cart and checkout flow. A showroom model can support fitting, pickup,
              returns, and garment care.
            </p>
          </article>
        </div>
      </section>
    </main>
  )
}

export default AboutUsPage
