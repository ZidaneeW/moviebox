// /app/data/movies.ts

export type Movie = {
  title: string;
  slug: string;
  poster: string;
  year: number;
  imdb: number;
  genre: string;
  director: string;
  cast: { name: string; img: string }[];
  plot: string;
  trailer: string;
};

export const MOVIES: Movie[] = [
  {
    title: "The Exorcist",
    slug: "theexorcist",
    poster: "/pictures/theexorcist.jpg",
    year: 1973,
    imdb: 8.1,
    genre: "Horror, Thriller",
    director: "William Friedkin",
    cast: [
      { name: "Ellen Burstyn", img: "/pictures/theexorcist/ellenburstyn.jpg" },
      { name: "Linda Blair", img: "/pictures/theexorcist/lindablair.jpg" },
      { name: "Max von Sydow", img: "/pictures/theexorcist/maxvon.jpg" }
    ],
    plot: "A young girl is possessed by a mysterious entity, her mother seeks the help of two priests to save her.",
    trailer: "https://www.youtube.com/embed/YDGw1MTEe9k"
  },
  {
    title: "E.T.",
    slug: "et",
    poster: "/pictures/et.jpg",
    year: 1982,
    imdb: 7.8,
    genre: "Sci-Fi, Family",
    director: "Steven Spielberg",
    cast: [
      { name: "Henry Thomas", img: "/pictures/et/henrythomas.jpg" },
      { name: "Drew Barrymore", img: "/pictures/et/drewb.jpg" },
      { name: "Dee Wallace", img: "/pictures/et/deew.jpg" }
    ],
    plot: "A troubled child summons the courage to help a friendly alien escape Earth and return to his home world.",
    trailer: "https://www.youtube.com/embed/qYAETtIIClk"
  },
  {
    title: "Jaws",
    slug: "jaws",
    poster: "/pictures/jaws.jpeg",
    year: 1975,
    imdb: 8.1,
    genre: "Thriller, Adventure",
    director: "Steven Spielberg",
    cast: [
      { name: "Roy Scheider", img: "/pictures/jaws/roysch.jpeg" },
      { name: "Robert Shaw", img: "/pictures/jaws/robert.jpeg" },
      { name: "Richard Dreyfuss", img: "/pictures/jaws/richard.jpeg" }
    ],
    plot: "When a killer shark unleashes chaos on a beach community, it's up to a local sheriff, a marine biologist, and an old seafarer to hunt the beast down.",
    trailer: "https://www.youtube.com/embed/U1fu_sA7XhE"
  },
  {
    title: "Pulp Fiction",
    slug: "pulpfiction",
    poster: "/pictures/pulpfiction.jpg",
    year: 1994,
    imdb: 8.9,
    genre: "Crime, Drama",
    director: "Quentin Tarantino",
    cast: [
      { name: "John Travolta", img: "/pictures/pulpfiction/john.jpeg" },
      { name: "Uma Thurman", img: "/pictures/pulpfiction/uma.jpeg" },
      { name: "Samuel L. Jackson", img: "/pictures/pulpfiction/samuel.jpeg" }
    ],
    plot: "The lives of two mob hitmen, a boxer, a gangster's wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    trailer: "https://www.youtube.com/embed/s7EdQ4FqbhY"
  },
  {
    title: "Rocky",
    slug: "rocky",
    poster: "/pictures/rocky.jpg",
    year: 1976,
    imdb: 8.1,
    genre: "Drama, Sport",
    director: "John G. Avildsen",
    cast: [
      { name: "Sylvester Stallone", img: "/pictures/rocky/syl.jpeg" },
      { name: "Talia Shire", img: "/pictures/rocky/talia.jpeg" },
      { name: "Burt Young", img: "/pictures/rocky/burt.jpeg" }
    ],
    plot: "A small-time boxer gets a supremely rare chance to fight a heavyweight champion in a bout in which he strives to go the distance for his self-respect.",
    trailer: "https://www.youtube.com/embed/3VUblDwa648"
  },
  {
    title: "Scarface",
    slug: "scarface",
    poster: "/pictures/scarface.jpg",
    year: 1983,
    imdb: 8.3,
    genre: "Crime, Drama",
    director: "Brian De Palma",
    cast: [
      { name: "Al Pacino", img: "/pictures/scarface/al.jpeg" },
      { name: "Michelle Pfeiffer", img: "/pictures/scarface/michelle.jpeg" },
      { name: "Steven Bauer", img: "/pictures/scarface/steven.jpeg" }
    ],
    plot: "In Miami, a determined Cuban immigrant takes over a drug cartel and succumbs to greed.",
    trailer: "https://www.youtube.com/embed/7pQQHnqBa2E"
  },
  {
    title: "The Empire Strikes Back",
    slug: "theempiresback",
    poster: "/pictures/theempiresback.png",
    year: 1980,
    imdb: 8.7,
    genre: "Action, Adventure, Fantasy",
    director: "Irvin Kershner",
    cast: [
      { name: "Mark Hamill", img: "/pictures/theempiresback/mark.jpeg" },
      { name: "Harrison Ford", img: "/pictures/theempiresback/harrison.jpeg" },
      { name: "Carrie Fisher", img: "/pictures/theempiresback/carrie.jpeg" }
    ],
    plot: "After the Rebels are brutally overpowered by the Empire on the ice planet Hoth, Luke Skywalker begins Jedi training with Yoda.",
    trailer: "https://www.youtube.com/embed/JNwNXF9Y6kY"
  },
  {
    title: "The Shining",
    slug: "theshining",
    poster: "/pictures/theshining.jpg",
    year: 1980,
    imdb: 8.4,
    genre: "Horror, Mystery",
    director: "Stanley Kubrick",
    cast: [
      { name: "Jack Nicholson", img: "/pictures/theshining/jackn.jpeg" },
      { name: "Shelley Duvall", img: "/pictures/theshining/shelley.jpeg" },
      { name: "Danny Lloyd", img: "/pictures/theshining/danny.jpeg" }
    ],
    plot: "A family heads to an isolated hotel for the winter where a sinister presence influences the father into violence, while his psychic son sees horrific forebodings from the past and future.",
    trailer: "https://www.youtube.com/embed/S014oGZiSdI"
  },
  {
    title: "The Thing",
    slug: "thething",
    poster: "/pictures/thething.jpg",
    year: 1982,
    imdb: 8.2,
    genre: "Horror, Sci-Fi",
    director: "John Carpenter",
    cast: [
      { name: "Kurt Russell", img: "/pictures/thething/kurt.jpeg" },
      { name: "Wilford Brimley", img: "/pictures/thething/will.jpeg" },
      { name: "Keith David", img: "/pictures/thething/keith.jpeg" }
    ],
    plot: "A research team in Antarctica is hunted by a shape-shifting alien that assumes the appearance of its victims.",
    trailer: "https://www.youtube.com/embed/5ftmr17M-a4"
  },
  {
    title: "Vertigo",
    slug: "vertigo",
    poster: "/pictures/vertigo.jpg",
    year: 1958,
    imdb: 8.3,
    genre: "Mystery, Romance, Thriller",
    director: "Alfred Hitchcock",
    cast: [
      { name: "James Stewart", img: "/pictures/vertigo/james.jpeg" },
      { name: "Kim Novak", img: "/pictures/vertigo/kim.jpeg" },
      { name: "Barbara Bel Geddes", img: "/pictures/vertigo/barbara.jpeg" }
    ],
    plot: "A former police detective juggles wrestling with his personal demons and becoming obsessed with a hauntingly beautiful woman.",
    trailer: "https://www.youtube.com/embed/Ob6TTUOwnR4"
  }
];
