export default function MovieDetailsLoading() {
  return (
    <div className="flex flex-col items-center justify-center py-8 min-h-[60vh]">
      <div className="w-12 h-12 mb-4 border-4 border-gray-200 rounded-full animate-spin border-t-blue-500 n-12"></div>
      <div className="text-lg text-gray-600">Loading Movies</div>
    </div>
  );
}
