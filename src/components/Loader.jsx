function Loader() {
  return (
    <div className="flex items-center  justify-center min-h-[400px]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-rose-200 border-t-rose-500 rounded-full animate-spin"></div>
        <p className="text-sm text-gray-500">Loading...</p>

      </div>
    

    </div>
  )
}

export default Loader