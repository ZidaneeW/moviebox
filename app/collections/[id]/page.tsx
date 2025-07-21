"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { MOVIES } from "../../data/movies";

type Collection = {
  name: string;
  movies: string[];
};

export default function CollectionDetailPage() {
  const { name } = useParams<{ name: string }>();
  const router = useRouter();
  const colName = decodeURIComponent(name);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [inputName, setInputName] = useState("");
  const [error, setError] = useState("");
  const [showEdit, setShowEdit] = useState(false);
  const [removeMovie, setRemoveMovie] = useState<null | string>(null);

  useEffect(() => {
    setCollections(JSON.parse(localStorage.getItem("collections") || "[]"));
  }, []);

  if (!collections.length) return null; // Wait until collections loaded

  const colIdx = collections.findIndex(c => c.name === name);
  const collection = collections.find(
    c => c.name.toLowerCase() === colName.toLowerCase()
  );

  if (!collection) return <div className="text-white p-12">Collection not found.</div>;
  const movieObjs = collection ? collection.movies.map(slug => MOVIES.find(m => m.slug === slug)).filter(Boolean) : [];

  
  // --- Edit Collection Name
  function handleEdit() {
    const exists = collections.some(
      c => c.name.toLowerCase() === inputName.trim().toLowerCase() && c.name !== name
    );
    const valid = /^[a-zA-Z0-9 ]+$/.test(inputName.trim());
    if (!inputName.trim()) setError("Collection name required");
    else if (exists) setError("Collection name must be unique");
    else if (!valid) setError("No special characters allowed");
    else {
      const newCollections = collections.map(c =>
        c.name === name ? { ...c, name: inputName.trim() } : c
      );
      localStorage.setItem("collections", JSON.stringify(newCollections));
      setCollections(newCollections);
      setShowEdit(false);
      router.replace(`/collections/${encodeURIComponent(inputName.trim())}`);
    }
  }

  // --- Remove Movie
  function handleRemoveMovie() {
    if (!removeMovie) return;
    const newMovies = collection!.movies.filter(slug => slug !== removeMovie);
    const newCollections = collections.map(c =>
      c.name === name ? { ...c, movies: newMovies } : c
    );
    localStorage.setItem("collections", JSON.stringify(newCollections));
    setCollections(newCollections);
    setRemoveMovie(null);
  }

  if (!collection) {
    return <div className="text-white p-12">Collection not found.</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black px-6 py-10">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white">{collection.name}</h1>
          <button
            className="bg-yellow-500 text-black px-4 py-2 rounded font-bold hover:bg-yellow-600 transition"
            onClick={() => { setShowEdit(true); setInputName(collection.name); setError(""); }}
          >
            Edit
          </button>
        </div>

        {movieObjs.length === 0 && (
          <div className="text-white text-lg text-center mt-16 opacity-70">No movies yet in this collection.</div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
          {movieObjs.map(movie => (
            <div key={movie!.slug} className="relative group">
              <a href={`/movies/${movie!.slug}`}>
                <div className="rounded-2xl overflow-hidden shadow-xl bg-gray-800 border-2 border-gray-700 hover:border-blue-500 cursor-pointer">
                  <img
                    src={movie!.poster}
                    alt={movie!.title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-3">
                    <h2 className="text-lg font-bold text-white">{movie!.title}</h2>
                  </div>
                </div>
              </a>
              <button
                className="absolute top-3 right-3 bg-red-600 hover:bg-red-800 text-white px-3 py-1 rounded text-xs font-bold opacity-0 group-hover:opacity-100 transition"
                onClick={() => setRemoveMovie(movie!.slug)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        {/* --- Edit Modal --- */}
        {showEdit && (
          <Modal onClose={() => setShowEdit(false)}>
            <h2 className="text-xl font-bold mb-4">Edit Collection Name</h2>
            <input
              type="text"
              className="w-full border px-3 py-2 rounded mb-2"
              placeholder="New Collection Name"
              value={inputName}
              onChange={e => { setInputName(e.target.value); setError(""); }}
              autoFocus
            />
            {error && <div className="text-red-600 mb-2">{error}</div>}
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowEdit(false)} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
              <button onClick={handleEdit} className="px-4 py-2 bg-yellow-600 rounded text-white font-bold">Save</button>
            </div>
          </Modal>
        )}

        {/* --- Remove Movie Modal --- */}
        {removeMovie && (
          <Modal onClose={() => setRemoveMovie(null)}>
            <h2 className="text-xl font-bold mb-4">Remove Movie</h2>
            <div className="mb-4">Remove <span className="font-bold text-blue-800">{MOVIES.find(m => m.slug === removeMovie)?.title}</span> from <span className="font-bold text-red-600">{collection.name}</span>?</div>
            <div className="flex justify-end gap-2">
              <button onClick={() => setRemoveMovie(null)} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
              <button onClick={handleRemoveMovie} className="px-4 py-2 bg-red-700 rounded text-white font-bold">Remove</button>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
}

// Modal component
function Modal({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl relative">
        {children}
        <button onClick={onClose} className="absolute top-3 right-4 text-xl text-gray-400 hover:text-black">&times;</button>
      </div>
    </div>
  );
}
