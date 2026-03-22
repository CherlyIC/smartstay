import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useBookingStore = create(
  persist(
    function(set, get) {
      return {
        bookings: [],

        addBooking: function(listing, checkIn, checkOut) {
          const newBooking = {
            id: Date.now(),
            listing,
            checkIn,
            checkOut,
            status: 'confirmed',
            createdAt: new Date().toISOString()
          }
          set(function(state) {
            return { bookings: [...state.bookings, newBooking] }
          })
        },

        cancelBooking: function(bookingId) {
          set(function(state) {
            return {
              bookings: state.bookings.map(function(b) {
                return b.id === bookingId
                  ? { ...b, status: 'cancelled' }
                  : b
              })
            }
          })
        },

        isBooked: function(listingId) {
          return get().bookings.some(function(b) {
            return b.listing.id === listingId
              && b.status === 'confirmed'
          })
        }
      }
    },
    { name: 'smartstay-bookings' }
  )
)

export default useBookingStore