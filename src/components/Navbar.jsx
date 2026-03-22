import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useFavorites } from '../context/FavoritesContext'
import useAuthStore from '../store/authStore'
import UserProfileCard from './UserProfileCard'

function Navbar() {
  const [search, setSearch] = useState('')
  const { favorites } = useFavorites()
  const { isAuthenticated, logout } = useAuthStore()
  const navigate = useNavigate()

  function handleSearch(e){
    e.preventDefault()
    if (search.trim()){
      navigate(`/?search=${search}`)
    }
  }

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl  mx-auto px-4 py-3 flex items-center  justify-between gap-4">
         
        <Link to="/" className="flex items-center   gap-2 shrink-0">
          <div className="w-8 h-8 bg-rose-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">S</span>
          </div>
          <span className="text-rose-500 font-bold text-xl hidden sm:block">
            SmartStay
          </span>
        </Link>

          <form
          onSubmit={handleSearch}
          className="flex-1 max-w-xl flex items-center gap-2 border border-gray-300 rounded-full px-4 py-2 hover:shadow-md transition-shadow"
        >
          <input
            type="text"
            value={search}
            onChange={function(e) { setSearch(e.target.value) }}
            placeholder="Search destinations..."
            className="flex-1 outline-none text-sm text-gray-700 bg-transparent"
          />
          <button
            type="submit"
            className="w-8 h-8 bg-rose-500 rounded-full flex items-center justify-center shrink-0 hover:bg-rose-600 transition-colors"
          >
            <span className="text-white text-xs">→</span>
          </button>
        </form>

        <div className="flex items-center gap-2 shrink-0">
          <Link to="/favorites" className="relative flex items-center gap-1 px-3 py-2 rounded-full hover:bg-gray-100  transition-colors text-sm text-gray-700">
           <span>♡</span>
           <span className="hidden sm:block">Saved</span>

            {favorites.length > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white text-xs rounded-full flex items-center justify-center">
                {favorites.length}
              </span>
            )}



          </Link>

          <Link
            to="/bookings"
            className="px-3 py-2 rounded-full hover:bg-gray-100 transition-colors text-sm text-gray-700 hidden sm:block"
          >
            Trips
          </Link>

          {isAuthenticated ? (
            <UserProfileCard />
          ) : (
            <Link
              to="/login"
              className="px-4 py-2 border border-gray-300 rounded-full text-sm text-gray-700 hover:shadow-md transition-shadow"
            >
              Login
            </Link>
          )}

        </div>
        


      </div>

    </nav>
  )
}
export default Navbar