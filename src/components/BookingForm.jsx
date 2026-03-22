import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useBookingStore from '../store/bookingStore'

function BookingForm({ listing }) {
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const navigate = useNavigate()
  const { addBooking, isBooked } = useBookingStore()

  const alreadyBooked = isBooked(listing.id)
  const price = listing.price?.total || listing.price?.rate || 0

  function handleBooking() {
    if (!checkIn || !checkOut) {
      setError('Please select both check-in and check-out dates')
      return
    }
    if (new Date(checkIn) >= new Date(checkOut)) {
      setError('Check-out must be after check-in')
      return
    }

    setError('')
    addBooking(listing, checkIn, checkOut)
    setSubmitted(true)
  }

  if (submitted || alreadyBooked) {
    return (
      <div className="border border-gray-200 rounded-2xl p-6 shadow-md text-center space-y-3">
        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto">
          <span className="text-green-500 text-xl">✓</span>
        </div>
        <h3 className="font-semibold text-gray-800">Booking confirmed!</h3>
        <p className="text-gray-500 text-sm">
          Your stay has been saved to your trips
        </p>
        <button
          onClick={function() { navigate('/bookings') }}
          className="w-full py-2 bg-rose-500 text-white rounded-xl hover:bg-rose-600 transition-colors text-sm"
        >
          View my trips
        </button>
      </div>
    )
  }

  return (
    <div className="border border-gray-200 rounded-2xl p-6 shadow-md space-y-4">
      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-bold text-gray-800">${price}</span>
        <span className="text-gray-500 text-sm">/ night</span>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="border border-gray-300 rounded-xl p-3">
          <p className="text-xs font-semibold text-gray-500 uppercase mb-1">
            Check in
          </p>
          <input
            type="date"
            value={checkIn}
            min={new Date().toISOString().split('T')[0]}
            onChange={function(e) { setCheckIn(e.target.value) }}
            className="w-full text-sm text-gray-800 outline-none"
          />
        </div>
        <div className="border border-gray-300 rounded-xl p-3">
          <p className="text-xs font-semibold text-gray-500 uppercase mb-1">
            Check out
          </p>
          <input
            type="date"
            value={checkOut}
            min={checkIn || new Date().toISOString().split('T')[0]}
            onChange={function(e) { setCheckOut(e.target.value) }}
            className="w-full text-sm text-gray-800 outline-none"
          />
        </div>
      </div>

      {error && (
        <p className="text-rose-500 text-xs">{error}</p>
      )}

      <button
        onClick={handleBooking}
        className="w-full py-3 bg-rose-500 text-white rounded-xl font-semibold hover:bg-rose-600 transition-colors"
      >
        Reserve
      </button>

      <p className="text-center text-gray-400 text-xs">
        You won't be charged yet
      </p>
    </div>
  )
}

export default BookingForm