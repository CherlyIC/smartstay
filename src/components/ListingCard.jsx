// src/components/ListingCard.jsx
import { Link } from 'react-router-dom'
import { useFavorites } from '../context/FavoritesContext'

function ListingCard({ listing }) {
  const { toggleFavorite, isFavorited } = useFavorites()

  // ── All data lives inside listing.listing ──────────
  const innerListing = listing.listing || listing

  const id = innerListing.id || innerListing.listingId
  const favorited = isFavorited(id)

  // Name is inside listing.listing.name
  const name = innerListing.name
    || innerListing.title
    || listing.title
    || 'No name available'

  // City is inside listing.listing.legacyCity
  const city = innerListing.legacyCity
    || innerListing.city
    || ''

  // Pictures are in listing.listing.contextualPictures
  const pictures = innerListing.contextualPictures
    || listing.contextualPictures
    || []
  const image = pictures[0]?.picture || null

  // Price is in listing.structuredDisplayPrice
  const price = listing.structuredDisplayPrice?.primaryLine?.price
    || listing.structuredDisplayPrice?.primaryLine?.displayComponentPrices?.[0]?.amount
    || 'N/A'

  // Rating
  const rating = listing.avgRatingLocalized !== 'New'
    ? listing.avgRatingLocalized
    : null

  return (
    <div className="group cursor-pointer">

      {/* Image */}
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

        {/* Favorite button */}
        <button
          onClick={function(e) {
            e.preventDefault()
            toggleFavorite({ ...listing, id })
          }}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/70 hover:bg-white transition-colors"
        >
          <span className={`text-lg ${favorited ? 'text-rose-500' : 'text-gray-400'}`}>
            {favorited ? '♥' : '♡'}
          </span>
        </button>
      </div>

      {/* Info */}
      <Link to={`/listing/${id}`}>
        <div className="mt-3 space-y-1">
          <div className="flex items-center justify-between">
            <p className="font-semibold text-gray-800 text-sm truncate flex-1">
              {city || name}
            </p>
            {rating && (
              <div className="flex items-center gap-1 shrink-0 ml-2">
                <span className="text-xs">★</span>
                <span className="text-xs text-gray-700">{rating}</span>
              </div>
            )}
          </div>
          <p className="text-gray-500 text-sm truncate">{name}</p>
          <p className="text-gray-800 text-sm">
            <span className="font-semibold">{price}</span>
            <span className="text-gray-500"> / night</span>
          </p>
        </div>
      </Link>
    </div>
  )
}

export default ListingCard