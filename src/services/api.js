import axios from 'axios'

const api = axios.create({
  baseURL: 'https://airbnb19.p.rapidapi.com',

  headers: {
    'x-rapidapi-key': import.meta.env.VITE_RAPIDAPI_KEY,
    'x-rapidapi-host': 'airbnb19.p.rapidapi.com',
    'Content-Type': 'application/json'
  }
})

export async function fetchListings(placeId) {
  const { data } = await api.get('/api/v2/searchPropertyByPlaceId', {
    params: { placeId }
  })
  return data
}

export async function fetchListingById(id) {
  const { data } = await api.get('/api/v2/searchPropertyByPlaceId', {
    params: { placeId: id }
  })
  return data
}

export default api