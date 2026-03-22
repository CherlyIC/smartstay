function ErrorState({ message, onRetry }) {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="flex flex-col items-center gap-4 text-center max-w-md">
        <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center">
          <span className="text-rose-500 text-2xl">!</span>
        </div>

        <h2 className="text-xl font-semibold text-gray-800">
          Something went wrong
        </h2>

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