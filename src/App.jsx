import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import ListingDetails from './pages/ListingDetails'
import Bookings from './pages/Bookings'
import Favorites from './pages/Favorites'
import Login from './pages/Login'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <div>
      
      <Navbar />
      <Routes>
        <Route path="/"            element={<Home />} />
        <Route path="/listing/:id" element={<ListingDetails />} />
        <Route path="/favorites"   element={<Favorites />} />
        <Route path="/login"       element={<Login />} />
        <Route path="/bookings" element={
          <ProtectedRoute>
            <Bookings />
          </ProtectedRoute>
        }/>
      </Routes>
    </div>
  )
}

export default App