import { useNavigate } from 'react-router-dom'

function Login() {
  const navigate = useNavigate()

  return (
    <div className="max-w-md mx-auto px-4 py-20">
      <div className="bg-white border text-center border-gray-200 rounded-3xl p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Welcome to SmartStay</h1>
        <p className="text-gray-500 text-sm mb-8">Log in to view your bookings and saved properties.</p>
        
        <form onSubmit={(e) => {
          e.preventDefault()
          // Mock login -> redirect to home
          navigate('/')
        }}>
          <div className="space-y-4">
            <div>
              <input 
                type="email" 
                placeholder="Email address" 
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all"
                required
                defaultValue="student@example.com"
              />
            </div>
            <div>
              <input 
                type="password" 
                placeholder="Password" 
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all"
                required
                defaultValue="password123"
              />
            </div>
            <button 
              type="submit"
              className="w-full py-3 bg-rose-500 text-white font-semibold rounded-xl hover:bg-rose-600 transition-colors"
            >
              Sign In
            </button>
          </div>
        </form>
        
        <div className="mt-6 pt-6 border-t border-gray-100 flex justify-center gap-4">
          <button className="flex-1 py-2 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            Google
          </button>
          <button className="flex-1 py-2 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            Apple
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login