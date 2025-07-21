import { Movie } from "../data/movies";
export function isMovieTitleUnique(movies: Movie[], title: string) {
  const slug = title.toLowerCase().replace(/[^a-z0-9]/g, "");
  return !movies.some(m => m.slug === slug);
}

export function validateMovieForm(form: any) {
  const required = ["title", "poster", "year", "imdb", "genre", "director", "cast", "plot", "trailer"];
  for (const field of required) {
    if (!form[field] || !form[field].toString().trim()) return "All fields required";
  }
  if (isNaN(Number(form.year))) return "Year must be a number";
  if (isNaN(Number(form.imdb))) return "IMDB must be a number";
  return null;
}

export function removeMovieFromCollections(collections: any[], slug: string) {
  return collections.map(col => ({
    ...col,
    movies: col.movies.filter((s: string) => s !== slug)
  }));
}
