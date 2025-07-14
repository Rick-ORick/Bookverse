import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const { pathname } = useLocation()

  const navLink = (to, label) => (
    <Link
      to={to}
      className={`text-sm uppercase tracking-widest px-3 py-2 rounded 
        ${pathname === to ? 'text-yellow-400 border-b border-yellow-400' : 'text-white hover:text-yellow-300'}`}
    >
      {label}
    </Link>
  )

  return (
    <nav className="w-full p-4 bg-black fixed top-0 left-0 z-40 border-b border-neutral-800 flex justify-center">
      <div className="max-w-5xl w-full flex justify-between items-center px-4">
        <h1 className="text-lg font-bold text-yellow-400 tracking-tight">BookVerse</h1>
        <div className="flex gap-4">
          {navLink('/', 'Home')}
          {navLink('/search', 'Search')}
          {navLink('/library', 'Library')}
        </div>
      </div>
    </nav>
  )
}
