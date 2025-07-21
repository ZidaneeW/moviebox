"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { MOVIES } from "../data/movies";
import { BackButton } from "../components/BackButton"; // adjust path

// ====== Helper ======
type Collection = {
  name: string;
  movies: string[];
};
function getCollections(): Collection[] {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem("collections") || "[]");
}
function saveCollections(cols: Collection[]) {
  localStorage.setItem("collections", JSON.stringify(cols));
}

export default function CollectionListPage() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState<null | string>(null); // name
  const [showRemove, setShowRemove] = useState<null | string>(null); // name

  // For modal
  const [inputName, setInputName] = useState("");
  const [error, setError] = useState("");

  // Load collections
  useEffect(() => {
    setCollections(getCollections());
  }, []);

  // Modal Actions
  function handleAdd() {
    const exists = collections.some(c => c.name.toLowerCase() === inputName.trim().toLowerCase());
    const valid = /^[a-zA-Z0-9 ]+$/.test(inputName.trim());
    if (!inputName.trim()) setError("Collection name required");
    else if (exists) setError("Collection name must be unique");
    else if (!valid) setError("No special characters allowed");
    else {
      const newCol = { name: inputName.trim(), movies: [] };
      const newCollections = [...collections, newCol];
      saveCollections(newCollections);
      setCollections(newCollections);
      setShowAdd(false); setInputName(""); setError("");
    }
  }
  function handleEdit() {
    if (!showEdit) return;
    const exists = collections.some(
      c => c.name.toLowerCase() === inputName.trim().toLowerCase() && c.name !== showEdit
    );
    const valid = /^[a-zA-Z0-9 ]+$/.test(inputName.trim());
    if (!inputName.trim()) setError("Collection name required");
    else if (exists) setError("Collection name must be unique");
    else if (!valid) setError("No special characters allowed");
    else {
      const newCollections = collections.map(c =>
        c.name === showEdit ? { ...c, name: inputName.trim() } : c
      );
      saveCollections(newCollections);
      setCollections(newCollections);
      setShowEdit(null); setInputName(""); setError("");
    }
  }
  function handleRemove() {
    if (!showRemove) return;
    const newCollections = collections.filter(c => c.name !== showRemove);
    saveCollections(newCollections);
    setCollections(newCollections);
    setShowRemove(null);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black px-6 py-10">
      <div className="max-w-5xl mx-auto">
        <BackButton label="Back to Movies" />
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-white">Collections</h1>
          <button
            className="bg-green-600 text-white px-4 py-2 rounded font-bold hover:bg-green-700 transition"
            onClick={() => { setShowAdd(true); setInputName(""); setError(""); }}
          >
            Add a Collection
          </button>
        </div>

        {collections.length === 0 && (
          <div className="text-white text-lg text-center mt-20 opacity-70">No collections yet. Add one above!</div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {collections.map((col) => {
            // Poster cover = poster movie pertama
            const firstMovie = MOVIES.find(m => m.slug === col.movies[0]);
            return (
              <div key={col.name} className="relative rounded-2xl overflow-hidden shadow-xl bg-gray-800 border-2 border-gray-700 flex flex-col group">
                <Link href={`/collections/${encodeURIComponent(col.name)}`}>
                  {firstMovie ? (
                    <img
                      src={firstMovie.poster}
                      alt={firstMovie.title}
                      className="w-full h-48 object-cover cursor-pointer"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gray-600 flex items-center justify-center text-5xl text-white">🎬</div>
                  )}
                  <div className="p-4">
                    <h2 className="text-lg font-bold text-white truncate">{col.name}</h2>
                    <div className="text-gray-400 text-sm">{col.movies.length} movie{col.movies.length !== 1 ? "s" : ""}</div>
                  </div>
                </Link>
                {/* Edit & Remove button */}
                <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition">
                  <button
                    className="bg-yellow-500 hover:bg-yellow-600 text-black px-3 py-1 rounded text-xs font-bold"
                    onClick={() => { setShowEdit(col.name); setInputName(col.name); setError(""); }}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-600 hover:bg-red-800 text-white px-3 py-1 rounded text-xs font-bold"
                    onClick={() => setShowRemove(col.name)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* ---- Add Modal ---- */}
        {showAdd && (
          <Modal onClose={() => setShowAdd(false)}>
            <h2 className="text-xl font-bold mb-4">Add a Collection</h2>
            <input
              type="text"
              className="w-full border px-3 py-2 rounded mb-2"
              placeholder="Collection Name"
              value={inputName}
              onChange={e => { setInputName(e.target.value); setError(""); }}
              autoFocus
            />
            {error && <div className="text-red-600 mb-2">{error}</div>}
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowAdd(false)} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
              <button onClick={handleAdd} className="px-4 py-2 bg-green-700 rounded text-white font-bold">Add</button>
            </div>
          </Modal>
        )}

        {/* ---- Edit Modal ---- */}
        {showEdit && (
          <Modal onClose={() => setShowEdit(null)}>
            <h2 className="text-xl font-bold mb-4">Edit Collection: <span className="text-blue-700">{showEdit}</span></h2>
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
              <button onClick={() => setShowEdit(null)} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
              <button onClick={handleEdit} className="px-4 py-2 bg-yellow-600 rounded text-white font-bold">Save</button>
            </div>
          </Modal>
        )}

        {/* ---- Remove Modal ---- */}
        {showRemove && (
          <Modal onClose={() => setShowRemove(null)}>
            <h2 className="text-xl font-bold mb-4">Remove Collection</h2>
            <div className="mb-4">Are you sure you want to remove <span className="font-bold text-red-600">{showRemove}</span>?</div>
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowRemove(null)} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
              <button onClick={handleRemove} className="px-4 py-2 bg-red-700 rounded text-white font-bold">Remove</button>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
}

// Simple modal
function Modal({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
        {children}
        <button onClick={onClose} className="absolute top-3 right-4 text-xl text-gray-400 hover:text-black">&times;</button>
      </div>
    </div>
  );
}
