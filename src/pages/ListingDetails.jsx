import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { fetchListingById } from '../services/api'
import { useFavorites } from '../context/FavoritesContext'
import useBookingStore from '../store/bookingStore'
import Loader from '../components/Loader'
import ErrorState from '../components/ErrorState'
import BookingForm from '../components/BookingForm'

function ListingDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [activeImage, setActiveImage] = useState(0)

  const { toggleFavorite, isFavorited } = useFavorites()
  const { isBooked } = useBookingStore()

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['listing', id],
    queryFn: function() {
      return fetchListingById(id)
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: false,
  })

  const listing = data?.data?.list?.[0] || data?.data || data

  if (isLoading) return <Loader />

  if (isError) {
    return (
      <ErrorState
        message={error?.message}
        onRetry={refetch}
      />
    )
  }

  if (!listing) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p className="text-gray-500 text-lg">Listing not found</p>
        <button
          onClick={function() { navigate('/') }}
          className="mt-4 px-6 py-2 bg-rose-500 text-white rounded-full hover:bg-rose-600 transition-colors"
        >
          Back to listings
        </button>
      </div>
    )
  }

  const name = listing.name || 'No name available'
  const city = listing.city || listing.locationTitle || ''
  const rating = listing.avgRating || listing.rating || null
  const reviewCount = listing.reviewsCount || 0
  const price = listing.price?.total || listing.price?.rate || 'N/A'
  const images = listing.images?.length > 0
    ? listing.images
    : ['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800']
  const description = listing.description || 'A beautiful place to stay.'
  const amenities = listing.amenities || listing.previewAmenities || []
  const favorited = isFavorited(listing.id)
  const alreadyBooked = isBooked(listing.id)

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <button
        onClick={function() { navigate(-1) }}
        className="flex items-center gap-2 text-gray-500 hover:text-gray-800 transition-colors mb-6"
      >
        <span>←</span>
        <span className="text-sm">Back</span>
      </button>

      <div className="flex items-start justify-between mb-4 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{name}</h1>
          <div className="flex items-center gap-3 mt-1 flex-wrap">
            {rating && (
              <span className="flex items-center gap-1 text-sm text-gray-700">
                ★ <strong>{Number(rating).toFixed(1)}</strong>
                {reviewCount > 0 && (
                  <span className="text-gray-400">· {reviewCount} reviews</span>
                )}
              </span>
            )}
            {city && (
              <span className="text-sm text-gray-500">{city}</span>
            )}
          </div>
        </div>

        <button
          onClick={function() { toggleFavorite(listing) }}
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-full hover:shadow-md transition-shadow shrink-0"
        >
          <span className={favorited ? 'text-rose-500' : 'text-gray-400'}>
            {favorited ? '♥' : '♡'}
          </span>
          <span className="text-sm text-gray-700">
            {favorited ? 'Saved' : 'Save'}
          </span>
        </button>
      </div>

      <div className="mb-8">
        <div className="w-full h-96 rounded-2xl overflow-hidden bg-gray-100 mb-2">
          <img
            src={images[activeImage]}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>

        {images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-1">
            {images.map(function(img, index) {
              return (
                <button
                  key={index}
                  onClick={function() { setActiveImage(index) }}
                  className={`shrink-0 w-20 h-16 rounded-xl overflow-hidden border-2 transition-colors ${
                    activeImage === index
                      ? 'border-rose-500'
                      : 'border-transparent'
                  }`}
                >
                  <img
                    src={img}
                    alt={`view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              )
            })}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {alreadyBooked && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-2xl">
              <p className="text-green-700 font-semibold">
                ✓ You have booked this property
              </p>
              <p className="text-green-600 text-sm mt-1">
                View your booking in Trips
              </p>
            </div>
          )}

          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              About this place
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {description}
            </p>
          </div>

          {amenities.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-3">
                Amenities
              </h2>
              <div className="grid grid-cols-2 gap-2">
                {amenities.map(function(amenity, index) {
                  return (
                    <div
                      key={index}
                      className="flex items-center gap-2 text-sm text-gray-600"
                    >
                      <span className="w-1.5 h-1.5 bg-rose-400 rounded-full shrink-0"></span>
                      {amenity?.title || amenity}
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          <div className="p-4 bg-gray-50 rounded-2xl">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Price details
            </h2>
            <div className="flex justify-between text-sm text-gray-600">
              <span>${price} x 1 night</span>
              <span>${price}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600 mt-1">
              <span>Service fee</span>
              <span>${Math.round(Number(price) * 0.12)}</span>
            </div>
            <div className="border-t border-gray-200 mt-3 pt-3 flex justify-between font-semibold text-gray-800">
              <span>Total</span>
              <span>${Math.round(Number(price) * 1.12)}</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <BookingForm listing={listing} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ListingDetails