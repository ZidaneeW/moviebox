"use client";
import { useEffect, useState } from "react";
import { MOVIES as BASE_MOVIES, Movie } from "../data/movies";
import { useRouter } from "next/navigation";

const MOVIES_PER_PAGE = 8;

function getAdminMovies(): Movie[] {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem("adminMovies") || "[]");
}
function saveAdminMovies(movies: Movie[]) {
  localStorage.setItem("adminMovies", JSON.stringify(movies));
}
function getCollections() {
  return JSON.parse(localStorage.getItem("collections") || "[]");
}
function saveCollections(collections: any[]) {
  localStorage.setItem("collections", JSON.stringify(collections));
}

export default function AdminPage() {
  const [adminMovies, setAdminMovies] = useState<Movie[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [showRemove, setShowRemove] = useState<Movie | null>(null);
  const [page, setPage] = useState(1);

  // Add movie state
  const [form, setForm] = useState({
    title: "", poster: "", year: "", imdb: "", genre: "", director: "", cast: "", plot: "", trailer: ""
  });
  const [formError, setFormError] = useState("");

  useEffect(() => {
    setAdminMovies(getAdminMovies());
  }, []);

  // Combine: base (data/movies.ts) + adminMovies (added/removed)
  const movies: Movie[] = [...BASE_MOVIES, ...adminMovies];
  const startIdx = (page - 1) * MOVIES_PER_PAGE;
  const pagedMovies = movies.slice(startIdx, startIdx + MOVIES_PER_PAGE);
  const pageCount = Math.ceil(movies.length / MOVIES_PER_PAGE);

  // --- Add Movie
  function handleAddMovie() {
    // Validasi semua field harus diisi
    if (!form.title || !form.poster || !form.year || !form.imdb || !form.genre || !form.director || !form.cast || !form.plot || !form.trailer) {
      setFormError("All fields required");
      return;
    }
    // Check slug sudah ada
    const slug = form.title.toLowerCase().replace(/[^a-z0-9]/g, "");
    if (movies.some(m => m.slug === slug)) {
      setFormError("Movie with same title already exists");
      return;
    }
    // Cast parsing: name1,img1;name2,img2;...
    const castArr = form.cast.split(";").map(c => {
      const [name, img] = c.split(",");
      return { name: name?.trim() || "", img: img?.trim() || "" };
    });
    // Year & imdb parsing
    const year = parseInt(form.year, 10);
    const imdb = parseFloat(form.imdb);

    const newMovie: Movie = {
      title: form.title.trim(),
      slug,
      poster: form.poster.trim(),
      year,
      imdb,
      genre: form.genre.trim(),
      director: form.director.trim(),
      cast: castArr,
      plot: form.plot.trim(),
      trailer: form.trailer.trim()
    };
    const newMovies = [...adminMovies, newMovie];
    saveAdminMovies(newMovies);
    setAdminMovies(newMovies);
    setShowAdd(false);
    setForm({
      title: "", poster: "", year: "", imdb: "", genre: "", director: "", cast: "", plot: "", trailer: ""
    });
    setFormError("");
  }

  // --- Remove Movie
  function handleRemoveMovie() {
    if (!showRemove) return;
    // Hapus dari adminMovies (tidak bisa hapus default/base movies)
    const slug = showRemove.slug;
    const isAdminMovie = adminMovies.some(m => m.slug === slug);
    if (!isAdminMovie) {
      setShowRemove(null);
      return;
    }
    const newAdminMovies = adminMovies.filter(m => m.slug !== slug);
    saveAdminMovies(newAdminMovies);
    setAdminMovies(newAdminMovies);

    // Hapus juga dari setiap collection
    const collections = getCollections();
    const newCollections = collections.map((c: any) => ({
      ...c,
      movies: c.movies.filter((s: string) => s !== slug)
    }));
    saveCollections(newCollections);

    setShowRemove(null);
  }

  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black px-6 py-10">
      <div className="max-w-6xl mx-auto">
        {/* Back to Dashboard */}
        <button onClick={() => router.push("/dashboard")} className="mb-6 bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800">
          &larr; Back to Dashboard
        </button>

        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-white">Admin Movie List</h1>
          <button
            className="bg-green-600 text-white px-4 py-2 rounded font-bold hover:bg-green-700 transition"
            onClick={() => { setShowAdd(true); setFormError(""); }}
          >
            Add New Movie
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
          {pagedMovies.map(movie => (
            <div key={movie.slug} className="relative group rounded-2xl overflow-hidden shadow-xl bg-gray-800 border-2 border-gray-700 flex flex-col">
              <img
                src={movie.poster}
                alt={movie.title}
                className="w-full h-56 object-cover"
              />
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h2 className="text-lg font-bold text-white">{movie.title}</h2>
                  <div className="text-gray-400 text-xs mb-1">{movie.year} &middot; {movie.genre}</div>
                  <div className="text-gray-300 text-sm mb-2">{movie.plot.slice(0, 80)}...</div>
                  <div className="flex gap-2 text-xs text-gray-400 mb-2">
                    <span>IMDB: {movie.imdb}</span>
                    <span>Director: {movie.director}</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {movie.cast.map((actor, i) => (
                      <span key={actor.name + i} className="bg-gray-700 text-white text-xs rounded-full px-2 py-1">{actor.name}</span>
                    ))}
                  </div>
                </div>
                {/* Hapus tombol hanya movie yang bisa dihapus */}
                {adminMovies.some(m => m.slug === movie.slug) && (
                  <button
                    className="mt-3 bg-red-700 hover:bg-red-900 text-white px-3 py-1 rounded text-xs font-bold"
                    onClick={() => setShowRemove(movie)}
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-8 gap-4">
          <button
            className="px-4 py-2 rounded bg-gray-700 text-white"
            disabled={page === 1}
            onClick={() => setPage(p => p - 1)}
          >
            Previous
          </button>
          <span className="text-white">{page} / {pageCount}</span>
          <button
            className="px-4 py-2 rounded bg-gray-700 text-white"
            disabled={page === pageCount}
            onClick={() => setPage(p => p + 1)}
          >
            Next
          </button>
        </div>

        {/* ----- Modal Add Movie ----- */}
        {showAdd && (
          <Modal onClose={() => setShowAdd(false)}>
            <h2 className="text-xl font-bold mb-4 text-white">Add New Movie</h2>
            <div className="grid grid-cols-2 gap-2 mb-2">
              <input className="col-span-2 border px-3 py-2 rounded bg-gray-800 text-white"
                placeholder="Movie Title"
                value={form.title}
                onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                autoFocus
              />
              <input className="border px-3 py-2 rounded bg-gray-800 text-white"
                placeholder="Year"
                value={form.year}
                onChange={e => setForm(f => ({ ...f, year: e.target.value }))}
                type="number"
                min="1800"
              />
              <input className="border px-3 py-2 rounded bg-gray-800 text-white"
                placeholder="IMDB Rating"
                value={form.imdb}
                onChange={e => setForm(f => ({ ...f, imdb: e.target.value }))}
                type="number"
                step="0.1"
                min="0"
                max="10"
              />
              <input className="col-span-2 border px-3 py-2 rounded bg-gray-800 text-white"
                placeholder="Genres (comma separated)"
                value={form.genre}
                onChange={e => setForm(f => ({ ...f, genre: e.target.value }))}
              />
              <input className="col-span-2 border px-3 py-2 rounded bg-gray-800 text-white"
                placeholder="Director"
                value={form.director}
                onChange={e => setForm(f => ({ ...f, director: e.target.value }))}
              />
              <input className="col-span-2 border px-3 py-2 rounded bg-gray-800 text-white"
                placeholder="Movie Poster (URL /public/pictures/...jpg)"
                value={form.poster}
                onChange={e => setForm(f => ({ ...f, poster: e.target.value }))}
              />
              <input className="col-span-2 border px-3 py-2 rounded bg-gray-800 text-white"
                placeholder="Cast: name,img;name,img"
                value={form.cast}
                onChange={e => setForm(f => ({ ...f, cast: e.target.value }))}
              />
              <input className="col-span-2 border px-3 py-2 rounded bg-gray-800 text-white"
                placeholder="Trailer Youtube embed (https://...)"
                value={form.trailer}
                onChange={e => setForm(f => ({ ...f, trailer: e.target.value }))}
              />
              <textarea className="col-span-2 border px-3 py-2 rounded bg-gray-800 text-white"
                placeholder="Description / Plot"
                value={form.plot}
                onChange={e => setForm(f => ({ ...f, plot: e.target.value }))}
                rows={3}
              />
            </div>
            {formError && <div className="text-red-400 mb-2">{formError}</div>}
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowAdd(false)} className="px-4 py-2 bg-gray-700 text-white rounded">Cancel</button>
              <button onClick={handleAddMovie} className="px-4 py-2 bg-green-700 text-white rounded font-bold">Add</button>
            </div>
          </Modal>
        )}

        {/* ----- Modal Remove Movie ----- */}
        {showRemove && (
          <Modal onClose={() => setShowRemove(null)}>
            <h2 className="text-xl font-bold mb-4 text-white">Remove Movie</h2>
            <div className="mb-4 text-white">
              Remove <span className="font-bold text-red-400">{showRemove.title}</span>?
              <br />This will also remove the movie from all collections!
            </div>
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowRemove(null)} className="px-4 py-2 bg-gray-700 text-white rounded">Cancel</button>
              <button onClick={handleRemoveMovie} className="px-4 py-2 bg-red-700 text-white rounded font-bold">Remove</button>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
}

// DARK MODAL COMPONENT
function Modal({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
      <div className="bg-gray-900 rounded-xl p-6 w-full max-w-md shadow-xl relative">
        {children}
        <button onClick={onClose} className="absolute top-3 right-4 text-xl text-gray-400 hover:text-white">&times;</button>
      </div>
    </div>
  );
}
