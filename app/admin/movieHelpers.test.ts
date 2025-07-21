import { isMovieTitleUnique, validateMovieForm, removeMovieFromCollections } from "./movieHelpers";
import { Movie } from "../data/movies";

const mockMovies: Movie[] = [
  { title: "Jaws", slug: "jaws", poster: "poster.jpg", year: 1975, imdb: 8.1, genre: "Thriller", director: "Spielberg", cast: [], plot: "test", trailer: "trailer" }
];

describe("Admin Movie Helpers", () => {
  test("should check unique title (slug)", () => {
    expect(isMovieTitleUnique(mockMovies, "Jaws")).toBe(false); // sudah ada
    expect(isMovieTitleUnique(mockMovies, "Pulp Fiction")).toBe(true); // belum ada
    expect(isMovieTitleUnique(mockMovies, "JAWS")).toBe(false); // case insensitive
    expect(isMovieTitleUnique(mockMovies, "Jaws ")).toBe(false); // whitespace ignored
  });

  test("should validate required fields", () => {
    expect(validateMovieForm({
      title: "", poster: "", year: "", imdb: "", genre: "", director: "", cast: "", plot: "", trailer: ""
    })).toBe("All fields required");

    expect(validateMovieForm({
      title: "A", poster: "B", year: "notnumber", imdb: "9", genre: "a", director: "b", cast: "c", plot: "d", trailer: "e"
    })).toBe("Year must be a number");

    expect(validateMovieForm({
      title: "A", poster: "B", year: "2000", imdb: "x", genre: "a", director: "b", cast: "c", plot: "d", trailer: "e"
    })).toBe("IMDB must be a number");

    expect(validateMovieForm({
      title: "A", poster: "B", year: "2000", imdb: "7.8", genre: "a", director: "b", cast: "c", plot: "d", trailer: "e"
    })).toBe(null);
  });

  test("should remove movie from all collections", () => {
    const collections = [
      { name: "Horror", movies: ["jaws", "theexorcist"] },
      { name: "Crime", movies: ["pulpfiction", "jaws"] }
    ];
    const updated = removeMovieFromCollections(collections, "jaws");
    expect(updated[0].movies).not.toContain("jaws");
    expect(updated[1].movies).not.toContain("jaws");
  });
});
