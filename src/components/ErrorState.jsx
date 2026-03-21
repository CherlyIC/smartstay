function ErrorState() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center"> <h2 className="text-xl font-semibold  text-gray-800">Something went wrong </h2>
      <p className="text-gray-500 text-sm">
          {message || 'Failed to load listings. Please try again.'}
      </p>

       {onRetry && (
          <button
            onClick={onRetry}
            className="px-6 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors"
          >
            Try again
          </button>
        )}


      </div>

    </div>
  )

}
export default ErrorState