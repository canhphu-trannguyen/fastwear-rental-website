import { NavLink } from 'react-router-dom'

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Catalog', to: '/products/categories/all' },
  { label: 'Rental Policy', to: '/rental-policy' },
  { label: 'About Us', to: '/about-us' },
  { label: 'Cart', to: '/cart' },
]

function Header() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-5 sm:flex-row sm:items-center sm:justify-between">
        <NavLink to="/" className="text-xl font-bold tracking-wide text-slate-950">
          FASTWear
        </NavLink>

        <nav className="flex flex-wrap gap-3 text-sm font-medium text-slate-700">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `rounded px-2 py-1 transition hover:text-slate-950 ${
                  isActive ? 'text-slate-950' : ''
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}

export default Header
