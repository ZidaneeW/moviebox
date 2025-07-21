import Link from "next/link";
import { FaHome, FaUserShield } from "react-icons/fa";

export default function DashboardPage() {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      {/* <aside className="w-64 bg-gradient-to-b from-blue-900 to-blue-700 text-white shadow-xl flex flex-col z-10">
        <div className="px-6 py-6 flex items-center gap-2 border-b border-blue-800">
          <span className="font-bold text-xl flex items-center gap-2">
            🎬 Movie App
          </span>
        </div>
        <nav className="flex-1 py-4">
          <ul className="flex flex-col gap-2">
            <li>
              <Link href="/dashboard">
                <span className="flex items-center gap-3 px-6 py-2 rounded bg-blue-800 font-semibold shadow hover:bg-blue-600 cursor-pointer">
                  <FaHome /> Dashboard
                </span>
              </Link>
            </li>
            <li>
              <Link href="/admin">
                <span className="flex items-center gap-3 px-6 py-2 rounded hover:bg-blue-600 cursor-pointer">
                  <FaUserShield /> Admin Page
                </span>
              </Link>
            </li>
          </ul>
        </nav>
      </aside> */}

      {/* Main Content */}
<main className="relative flex-1 flex items-center justify-center overflow-hidden">
  {/* Background Image */}
 <img
  src="/pictures/movie-9pvmdtvz4cb0xl37.jpg"
  alt="Movies Background"
  className="absolute inset-0 w-full h-full object-cover brightness-20"
/>
  {/* Slogan dan Tombol */}
  <div className="relative z-10 flex flex-col items-center text-center text-white">
    <h1 className="text-5xl font-extrabold mb-4 drop-shadow-lg">
      MovieBox: Discover, Collect, and Share Your Favorite Movies!
    </h1>
    <p className="text-xl font-medium mb-8 drop-shadow">
      All your movies in one place.<br /> 
      <span className="text-yellow-400 font-bold">Unlimited. Social. Fun.</span>
    </p>
    <div className="flex gap-8">
      <Link href="/movies">
        <button className="px-10 py-4 bg-red-600 rounded-lg text-xl font-bold hover:bg-red-700 transition drop-shadow-lg">
          Movie List
        </button>
      </Link>
      <Link href="/collections">
        <button className="px-10 py-4 bg-blue-500 bg-opacity-20 rounded-lg text-xl font-bold  border-b-blue-500 hover:bg-opacity-40 transition drop-shadow-lg">
          Collection List
        </button>
      </Link>
      <Link href="/admin">
        <button className="px-10 py-4 bg-yellow-500 bg-opacity-20 rounded-lg text-xl font-bold  border-b-blue-500 hover:bg-opacity-40 transition drop-shadow-lg">
          Admin Page
        </button>
      </Link>
    </div>
  </div>
</main>

    </div>
  );
}
