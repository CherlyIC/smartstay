import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { fetchListings } from '../services/api'
import ListingCard from '../components/ListingCard'
import Loader from '../components/Loader'
import ErrorState from '../components/ErrorState'

const DEFAULT_PLACE_ID = 'ChIJ7cv00DwsDogRAMDACa2m4K8'

function Home() {
  const [searchParams] = useSearchParams()
  const searchQuery = searchParams.get('search')

  const [maxPrice, setMaxPrice] = useState(500)
   const [minRating, setMinRating] = useState(0)

  const placeId = searchQuery || DEFAULT_PLACE_ID

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['listings', placeId],
    queryFn: function() {
      return fetchListings(placeId)
    },
    enabled: !!placeId,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: false,
    refetchOnWindowFocus: false
  })

  const listings = data?.data?.list || data?.results || data?.data || []



const filteredListings = listings.filter(function(listing) {
  const priceStr = listing.structuredDisplayPrice?.primaryLine?.price || '$0'
  const price = Number(priceStr.replace(/[^0-9]/g, ''))
  const rating = listing.avgRatingLocalized !== 'New'
    ? Number(listing.avgRatingLocalized) || 0
    : 0

  const inner = listing.listing || listing
  const name = inner.name || inner.title || ''
  const city = inner.legacyCity || inner.city || ''

  const matchesSearch = searchQuery 
    ? name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      city.toLowerCase().includes(searchQuery.toLowerCase())
    : true

  return price <= maxPrice && rating >= minRating && matchesSearch
})

  if (isLoading) return <Loader />

  if (isError) return (
    <ErrorState
      message={error?.message || 'Failed to load listings'}
      onRetry={refetch}
    />
  )

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          {searchQuery ? `Results for "${searchQuery}"` : 'Popular stays'}
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          {filteredListings.length} properties found
        </p>
      </div>

      <div className="mb-8 flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
        <span className="text-sm text-gray-600 shrink-0">
          Max price: <strong>${maxPrice}</strong> / night
        </span>
        <input
          type="range"
          min={50}
          max={1000}
          value={maxPrice}
          onChange={function(e) { setMaxPrice(Number(e.target.value)) }}
          className="flex-1 accent-rose-500"
        />
      </div>

      {filteredListings.length === 0 && (
        <div className="text-center py-20 text-gray-400">
          <p className="text-lg">No listings found</p>
          <p className="text-sm mt-1">Try adjusting your price filter or search</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredListings.map(function(listing, index) {
          return (
            <ListingCard
              key={listing.id || listing.listingId || index}
              listing={listing}
            />
          )
        })}
      </div>
    </div>
  )
}

export default Home