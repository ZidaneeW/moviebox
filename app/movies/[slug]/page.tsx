import { notFound } from "next/navigation";
import { MOVIES } from "../../data/movies";
import { BackButton } from "../../components/BackButton";

export default function MovieDetailPage({ params }: { params: { slug: string } }) {
  const movie = MOVIES.find(m => m.slug === params.slug);
  if (!movie) return notFound();

  return (
    
    <div className="min-h-screen bg-[#181c23] flex justify-center items-start py-10">
      <BackButton label="Back to Movies" />
      <div className="bg-[#212733] rounded-xl shadow-xl w-full max-w-4xl flex flex-col md:flex-row p-8 gap-8">
        {/* Poster */}
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full md:w-64 h-96 object-cover rounded-md"
        />
        {/* Info */}
        <div className="flex-1 flex flex-col gap-4 text-white">
          <div>
            <h1 className="text-3xl font-bold">{movie.title} <span className="text-gray-400 font-normal">({movie.year})</span></h1>
            <div className="flex gap-2 mt-2 mb-2">
              <span className="bg-yellow-400 text-black font-semibold px-2 rounded">{movie.imdb} IMDB</span>
              <span className="bg-blue-800 text-xs px-2 py-1 rounded">{movie.genre}</span>
            </div>
            <div className="text-gray-300">Directed by: <span className="text-white">{movie.director}</span></div>
          </div>

          {/* Cast section */}
          <div>
            <span className="font-semibold">Cast:</span>
            <div className="flex flex-wrap gap-4 mt-2">
              {movie.cast.map((actor) => (
                <div key={actor.name} className="flex items-center gap-2 bg-[#292f3d] px-3 py-1 rounded">
                  <img
                    src={actor.img}
                    alt={actor.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span>{actor.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="text-gray-200 mt-2">{movie.plot}</p>
          </div>

          <div>
            <div className="font-semibold mb-1">Trailer</div>
            <div className="rounded-lg overflow-hidden w-full max-w-xl">
              <iframe
                src={movie.trailer}
                title={movie.title + " trailer"}
                allowFullScreen
                className="w-full h-64"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
