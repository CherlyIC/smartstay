import axios from 'axios'

const BASE_URL = 'https://airbnb19.p.rapidapi.com'

const options = {
  headers: {
    'X-RapidAPI-Key': import.meta.env.VITE_RAPID_API_KEY,
    'X-RapidAPI-Host': 'airbnb19.p.rapidapi.com',
    'Content-Type': 'application/json'
  },
}

export const fetchListings = async (PlaceId) => {
  const { data } = await axios.get(`${BASE_URL}/api/v2/searchPropertyByPlaceId`, { 
    ...options, 
    params: { PlaceId } 
  })
  return data
}