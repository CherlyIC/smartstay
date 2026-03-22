import useAuthStore from '../store/authStore'
import { useNavigate } from 'react-router-dom'

function UserProfileCard() {
  const { user, isAuthenticated, logout } = useAuthStore()
  const navigate = useNavigate()

  if (!isAuthenticated || !user) return null

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-full border border-gray-200">
      <div className="w-7 h-7 bg-rose-500 text-white rounded-full flex items-center justify-center font-bold text-xs uppercase">
        {user.name ? user.name.charAt(0) : 'U'}
      </div>
      <span className="text-sm font-medium text-gray-700 hidden md:block capitalize truncate max-w-[100px]">
        {user.name}
      </span>
      <div className="w-px h-4 bg-gray-300 mx-1"></div>
      <button 
        onClick={handleLogout}
        className="text-xs font-semibold text-gray-500 hover:text-rose-500 transition-colors"
      >
        Logout
      </button>
    </div>
  )
}

export default UserProfileCard
