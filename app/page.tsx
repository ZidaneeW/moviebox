export default function HomePage() {
  return (
    <div className="p-8 flex flex-col items-center gap-4">
      <h1 className="text-3xl font-bold text-blue-700">Welcome to Movie Collection App 🎬</h1>
      <div className="flex gap-4 mt-4">
        <a href="/register" className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">Register</a>
        <a href="/login" className="px-4 py-2 rounded bg-gray-600 text-white hover:bg-gray-700">Login</a>
      </div>
    </div>
  );
}
