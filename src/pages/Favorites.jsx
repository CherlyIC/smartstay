import { useNavigate } from 'react-router-dom'
import { useFavorites } from '../context/FavoritesContext'
import ListingCard from '../components/ListingCard'

function Favorites() {
  const { favorites } = useFavorites()
  const navigate = useNavigate()

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Your Favorites</h1>
      
      {favorites.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-2xl">
          <div className="text-4xl mb-4">♥️</div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">No favorites yet</h2>
          <p className="text-gray-500 mb-6">Browse listings and click the heart icon to save your favorites.</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-rose-500 text-white rounded-full hover:bg-rose-600 transition-colors"
          >
            Explore properties
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favorites.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Favorites