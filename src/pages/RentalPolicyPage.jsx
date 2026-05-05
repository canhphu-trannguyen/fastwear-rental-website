const policies = [
  {
    question: 'What is the minimum rental duration?',
    answer: 'The minimum rental duration is 2 days.',
  },
  {
    question: 'What is the maximum rental duration?',
    answer: 'The maximum rental duration is 7 days.',
  },
  {
    question: 'How is the deposit calculated?',
    answer: 'FASTWear requires a deposit equal to 50% of the item retail price.',
  },
  {
    question: 'How much is standard delivery?',
    answer: 'Standard delivery has a fixed shipping fee of 30,000 VND.',
  },
  {
    question: 'What happens if an item is returned late or damaged?',
    answer:
      'Late returns or damage may reduce the refundable deposit after FASTWear reviews the item condition.',
  },
  {
    question: 'How does the refund process work?',
    answer:
      'After the item is returned and inspected, the remaining deposit is processed back to the customer through the selected refund method.',
  },
]

function RentalPolicyPage() {
  return (
    <main className="bg-stone-50">
      <section className="mx-auto max-w-6xl px-4 py-16">
        <p className="text-sm font-semibold uppercase tracking-wide text-emerald-800">
          Rental Policy
        </p>
        <h1 className="mt-3 max-w-4xl text-5xl font-bold leading-tight text-stone-950">
          Clear rental rules for a simple FASTWear checkout.
        </h1>
        <p className="mt-5 max-w-3xl text-lg text-stone-600">
          These policy notes explain the current front-end rental calculation and customer
          expectations for the mid-term demo.
        </p>
      </section>

      <section className="mx-auto grid max-w-6xl gap-4 px-4 py-6 sm:grid-cols-2 lg:grid-cols-4">
        <PolicyStat label="Minimum rental" value="2 days" />
        <PolicyStat label="Maximum rental" value="7 days" />
        <PolicyStat label="Deposit" value="50%" />
        <PolicyStat label="Standard delivery" value="30,000 VND" />
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="rounded-lg border border-stone-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-wide text-amber-700">
            FAQ Layout
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {policies.map((policy) => (
              <article key={policy.question} className="rounded-md bg-stone-50 p-5">
                <h2 className="text-lg font-semibold text-stone-950">{policy.question}</h2>
                <p className="mt-3 text-sm leading-6 text-stone-600">{policy.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

function PolicyStat({ label, value }) {
  return (
    <div className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-wide text-emerald-800">{label}</p>
      <p className="mt-3 text-2xl font-bold text-stone-950">{value}</p>
    </div>
  )
}

export default RentalPolicyPage
