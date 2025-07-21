// app/movies/page.tsx
"use client";
import Link from "next/link";
import { useState } from "react";
import { MOVIES } from "../data/movies";
import BulkAddModal from "./BulkAddModal";
import { BackButton } from "../components/BackButton";

const MOVIES_PER_PAGE = 10;

export default function MovieListPage() {
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);

  const startIdx = (page - 1) * MOVIES_PER_PAGE;
  const endIdx = startIdx + MOVIES_PER_PAGE;
  const pagedMovies = MOVIES.slice(startIdx, endIdx);
  const pageCount = Math.ceil(MOVIES.length / MOVIES_PER_PAGE);

  function toggleSelect(slug: string) {
    setSelected(selected =>
      selected.includes(slug)
        ? selected.filter(s => s !== slug)
        : [...selected, slug]
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <BackButton label="Back to Dashboard" />
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-4xl font-bold text-white">Movie List</h1>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded font-bold disabled:opacity-50"
            onClick={() => setShowModal(true)}
            disabled={selected.length === 0}
          >
            Add Selected to Collection
          </button>
          <Link href="/collections">
            <button className="bg-green-600 text-white px-4 py-2 rounded font-bold hover:bg-green-700 transition">
              Go to Collections
            </button>
          </Link>
        </div>

        

        {/* Movie Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-8">
          {pagedMovies.map(movie => (
            <div key={movie.slug} className="relative group">
              <input
                type="checkbox"
                checked={selected.includes(movie.slug)}
                onChange={() => toggleSelect(movie.slug)}
                className="absolute top-2 left-2 z-10 w-5 h-5 accent-blue-600"
              />
              <Link href={`/movies/${movie.slug}`}>
                <div className="rounded-2xl overflow-hidden shadow-xl bg-gray-800 hover:scale-105 transition-all cursor-pointer border-2 border-gray-700 hover:border-red-500">
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="w-full h-72 object-cover"
                  />
                  <div className="p-3">
                    <h2 className="text-lg font-bold text-white">{movie.title}</h2>
                  </div>
                </div>
              </Link>
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

        {/* Modal Bulk Add to Collection */}
        {showModal && (
          <BulkAddModal
            selected={selected}
            onClose={() => setShowModal(false)}
            clearSelection={() => setSelected([])}
          />
        )}
      </div>
    </div>
  );
}
