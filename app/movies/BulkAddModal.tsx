// Contoh modal di /app/movies/BulkAddModal.tsx (atau bisa inline)
import { useState } from "react";

function getCollections() {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem("collections") || "[]");
}
function saveCollections(collections: any[]) {
  localStorage.setItem("collections", JSON.stringify(collections));
}

type BulkAddModalProps = {
  selected: string[];
  onClose: () => void;
  clearSelection: () => void;
};

type Collection = {
  name: string;
  movies: string[];
};

export default function BulkAddModal({ selected, onClose, clearSelection }: BulkAddModalProps) {
  const [collections, setCollections] = useState<Collection[]>(getCollections());
  const [newName, setNewName] = useState("");
  const [error, setError] = useState("");
  const [selectedCol, setSelectedCol] = useState("");

  // ----> Semua operasi terhadap "collections" ada di bawah sini, setelah deklarasi!
  const exists = collections.some((c: Collection) => c.name.toLowerCase() === newName.toLowerCase());
  const idx = collections.findIndex((c: Collection) => c.name === selectedCol);

  function handleAdd() {
    if (selectedCol) {
      // Add to existing
      const idx = collections.findIndex(c => c.name === selectedCol);
      if (idx > -1) {
        collections[idx].movies = Array.from(new Set([...collections[idx].movies, ...selected]));
        saveCollections(collections);
        setCollections([...collections]);
        onClose();
        clearSelection();
      }
    } else if (newName) {
      // Validasi nama
      const exists = collections.some(c => c.name.toLowerCase() === newName.toLowerCase());
      const valid = /^[a-zA-Z0-9 ]+$/.test(newName);
      if (exists) setError("Collection name must be unique");
      else if (!valid) setError("No special characters allowed");
      else {
        const newCol = { name: newName, movies: selected };
        const newCollections = [...collections, newCol];
        saveCollections(newCollections);
        setCollections(newCollections);
        onClose();
        clearSelection();
      }
    } else setError("Select or enter collection name");
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
  <div className="bg-gray-900 rounded-xl p-6 w-[95vw] max-w-md shadow-xl text-white">
    <h2 className="text-2xl font-bold mb-4">Add {selected.length} movie(s) to Collection</h2>
    <div className="mb-2">
      <div className="mb-1 font-semibold">Select Existing:</div>
      <select
        className="w-full border bg-gray-800 text-white px-3 py-2 rounded"
        value={selectedCol}
        onChange={e => {
          setSelectedCol(e.target.value);
          setNewName("");
          setError("");
        }}
      >
        <option value="">-- Select Collection --</option>
        {collections.map((c: Collection) => (
          <option key={c.name} value={c.name}>{c.name}</option>
        ))}
      </select>
    </div>
    <div className="mb-4 mt-2">
      <div className="mb-1 font-semibold">Or Create New:</div>
      <input
        type="text"
        className="w-full border bg-gray-800 text-white px-3 py-2 rounded"
        placeholder="New Collection Name"
        value={newName}
        onChange={e => {
          setNewName(e.target.value);
          setSelectedCol("");
          setError("");
        }}
      />
    </div>
    {error && <div className="text-red-400 mb-2">{error}</div>}
    <div className="flex gap-2 justify-end">
      <button onClick={onClose} className="px-4 py-2 rounded bg-gray-700 text-white">Cancel</button>
      <button onClick={handleAdd} className="px-4 py-2 rounded bg-blue-700 text-white font-bold">Add</button>
    </div>
  </div>
</div>

  );
}
