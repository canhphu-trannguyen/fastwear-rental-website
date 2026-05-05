import { formatVnd } from '../../utils/formatCurrency'

const priceRanges = [
  { value: 'all', label: 'Any price' },
  { value: 'under-150000', label: `Under ${formatVnd(150000)}/day` },
  { value: '150000-300000', label: `${formatVnd(150000)} - ${formatVnd(300000)}/day` },
  { value: '300000-450000', label: `${formatVnd(300000)} - ${formatVnd(450000)}/day` },
  { value: 'over-450000', label: `Over ${formatVnd(450000)}/day` },
]

function ProductFilter({ filters, options, onFilterChange, onClearFilters }) {
  return (
    <aside className="rounded-lg border border-stone-200 bg-stone-50 p-5">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-lg font-semibold text-stone-950">Filters</h2>
        <button
          type="button"
          onClick={onClearFilters}
          className="text-sm font-semibold text-emerald-800 transition hover:text-emerald-950"
        >
          Clear filters
        </button>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
        <FilterSelect
          label="Category"
          name="category"
          value={filters.category}
          options={options.categories}
          onChange={onFilterChange}
        />
        <FilterSelect
          label="Size"
          name="size"
          value={filters.size}
          options={options.sizes}
          onChange={onFilterChange}
        />
        <FilterSelect
          label="Occasion"
          name="occasion"
          value={filters.occasion}
          options={options.occasions}
          onChange={onFilterChange}
        />
        <FilterSelect
          label="Price range"
          name="priceRange"
          value={filters.priceRange}
          options={priceRanges}
          onChange={onFilterChange}
        />
        <FilterSelect
          label="Color"
          name="color"
          value={filters.color}
          options={options.colors}
          onChange={onFilterChange}
        />
        <FilterSelect
          label="Gender"
          name="gender"
          value={filters.gender}
          options={options.genders}
          onChange={onFilterChange}
        />
      </div>
    </aside>
  )
}

function FilterSelect({ label, name, value, options, onChange }) {
  return (
    <label className="grid gap-2 text-sm font-medium text-stone-700">
      {label}
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="rounded-md border border-stone-300 bg-white px-3 py-2 text-stone-950 outline-none transition focus:border-emerald-900 focus:ring-2 focus:ring-emerald-900/10"
      >
        <option value="all">All</option>
        {options.map((option) => {
          if (typeof option === 'object' && Array.isArray(option.options)) {
            return (
              <optgroup key={option.label} label={option.label}>
                {option.options.map((groupOption) => (
                  <option key={groupOption} value={groupOption}>
                    {groupOption}
                  </option>
                ))}
              </optgroup>
            )
          }

          const value = typeof option === 'string' ? option : option.value
          const label = typeof option === 'string' ? option : option.label

          return (
            <option key={value} value={value}>
              {label}
            </option>
          )
        })}
      </select>
    </label>
  )
}

export default ProductFilter
