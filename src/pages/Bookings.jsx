import useBookingStore from '../store/bookingStore'
import { useNavigate } from 'react-router-dom'

function Bookings() {
  const { bookings, cancelBooking } = useBookingStore()
  const navigate = useNavigate()

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Your Trips</h1>

      {bookings.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-2xl">
          <div className="text-4xl mb-4">🧳</div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">No trips booked yet</h2>
          <p className="text-gray-500 mb-6">Time to dust off your bags and start planning your next adventure.</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-rose-500 text-white rounded-full hover:bg-rose-600 transition-colors"
          >
            Start searching
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {bookings.map((booking) => {
            const innerListing = booking.listing.listing || booking.listing
            const name = innerListing.name || innerListing.title || booking.listing.title || 'Unknown Property'
            const city = innerListing.legacyCity || innerListing.city || ''
            
            const pictures = innerListing.contextualPictures || booking.listing.contextualPictures || []
            const image = pictures[0]?.picture || 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800'

            const isCancelled = booking.status === 'cancelled'

            return (
              <div 
                key={booking.id} 
                className={`flex flex-col md:flex-row gap-6 p-4 rounded-2xl border ${isCancelled ? 'bg-gray-50 border-gray-200' : 'bg-white border-gray-200 hover:shadow-md transition-shadow'}`}
              >
                <div className="w-full md:w-64 h-40 shrink-0 rounded-xl overflow-hidden">
                  <img src={image} alt={name} className={`w-full h-full object-cover ${isCancelled ? 'grayscale opacity-60' : ''}`} />
                </div>
                
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className={`text-lg font-semibold ${isCancelled ? 'text-gray-500 line-through' : 'text-gray-800'}`}>
                        {name}
                      </h3>
                      {isCancelled ? (
                        <span className="px-3 py-1 bg-gray-200 text-gray-600 text-xs font-semibold rounded-full">
                          Cancelled
                        </span>
                      ) : (
                        <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                          Confirmed
                        </span>
                      )}
                    </div>
                    <p className="text-gray-500 text-sm">{city}</p>
                    
                    <div className="mt-4 flex gap-6 text-sm">
                      <div className="bg-gray-50 p-3 rounded-lg flex-1">
                        <p className="text-gray-500 text-xs font-medium uppercase tracking-wider mb-1">Check-in</p>
                        <p className={`font-medium ${isCancelled ? 'text-gray-400' : 'text-gray-800'}`}>{booking.checkIn}</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg flex-1">
                        <p className="text-gray-500 text-xs font-medium uppercase tracking-wider mb-1">Check-out</p>
                        <p className={`font-medium ${isCancelled ? 'text-gray-400' : 'text-gray-800'}`}>{booking.checkOut}</p>
                      </div>
                    </div>
                  </div>
                  
                  {!isCancelled && (
                    <div className="mt-4 flex justify-end">
                      <button
                        onClick={() => {
                          if (confirm('Are you sure you want to cancel this booking?')) {
                            cancelBooking(booking.id)
                          }
                        }}
                        className="text-red-500 text-sm font-semibold hover:text-red-600 hover:underline"
                      >
                        Cancel Booking
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default Bookings