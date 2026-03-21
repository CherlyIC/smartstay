import { Link } from 'react-router-dom'
import { useFavorites } from '../context/FavoritesContext'

function ListingCard({ listing }) {
  const { toggleFavorite, isFavorited } = useFavorites()
  const favorited = isFavorited(listing.id)

  const name = listing.name || 'No name available'
  const price = listing.price?.total || listing.price?.rate || 'N/A'
  const rating = listing.avgRating || listing.rating || null
  const reviewCount = listing.reviewsCount || 0
  const image = listing.images?.[0] || listing.picture?.url || null
  const city = listing.city || listing.locationTitle || ''

  return (
    <div className="group cursor-pointer">
      <div className="relative overflow-hidden rounded-2xl aspect-square bg-gray-100">
        {image ? (
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <span className="text-gray-400 text-sm">No image</span>
          </div>
        )}
        <button
          onClick={function(e) {
            e.preventDefault()
            toggleFavorite(listing)
          }}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/70 hover:bg-white transition-colors"
        >
          <span className={`text-lg ${favorited ? 'text-rose-500' : 'text-gray-400'}`}>
            {favorited ? '♥' : '♡'}
          </span>
        </button>
      </div>

      <Link to={`/listing/${listing.id}`}>
        <div className="mt-3 space-y-1">
          <div className="flex items-center justify-between">
            <p className="font-semibold text-gray-800 text-sm truncate flex-1">
              {city || name}
            </p>
            {rating && (
              <div className="flex items-center gap-1 shrink-0 ml-2">
                <span className="text-xs">★</span>
                <span className="text-xs text-gray-700">{Number(rating).toFixed(1)}</span>
              </div>
            )}
          </div>

          <p className="text-gray-500 text-sm truncate">{name}</p>

          {reviewCount > 0 && (
            <p className="text-gray-400 text-xs">{reviewCount} reviews</p>
          )}

          <p className="text-gray-800 text-sm">
            <span className="font-semibold">${price}</span>
            <span className="text-gray-500"> / night</span>
          </p>
        </div>
      </Link>
    </div>
  )
}

export default ListingCard