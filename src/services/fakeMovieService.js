import * as genresAPI from "./fakeGenreService";
import _ from "lodash";

const movies = [
  {
    _id: "5b21ca3eeb7f6fbccd471815",
    title: "Terminator",
    genre: { _id: "5b21ca3eeb7f6fbccd471818", name: "Action" },
    numberInStock: 6,
    dailyRentalRate: 2.5,
    publishDate: "2018-01-03T19:04:28.809Z",
    isLiked: false
  },
  {
    _id: "5b21ca3eeb7f6fbccd471816",
    title: "Die Hard",
    genre: { _id: "5b21ca3eeb7f6fbccd471818", name: "Action" },
    numberInStock: 5,
    dailyRentalRate: 2.5,
    isLiked: false
  },
  {
    _id: "5b21ca3eeb7f6fbccd471817",
    title: "Get Out",
    genre: { _id: "5b21ca3eeb7f6fbccd471820", name: "Thriller" },
    numberInStock: 8,
    dailyRentalRate: 3.5,
    isLiked: false
  },
  {
    _id: "5b21ca3eeb7f6fbccd471819",
    title: "Trip to Italy",
    genre: { _id: "5b21ca3eeb7f6fbccd471814", name: "Comedy" },
    numberInStock: 7,
    dailyRentalRate: 3.5,
    isLiked: false
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181a",
    title: "Airplane",
    genre: { _id: "5b21ca3eeb7f6fbccd471814", name: "Comedy" },
    numberInStock: 7,
    dailyRentalRate: 3.5,
    isLiked: false
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181b",
    title: "Wedding Crashers",
    genre: { _id: "5b21ca3eeb7f6fbccd471814", name: "Comedy" },
    numberInStock: 7,
    dailyRentalRate: 3.5,
    isLiked: false
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181e",
    title: "Gone Girl",
    genre: { _id: "5b21ca3eeb7f6fbccd471820", name: "Thriller" },
    numberInStock: 7,
    dailyRentalRate: 4.5,
    isLiked: false
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181f",
    title: "The Sixth Sense",
    genre: { _id: "5b21ca3eeb7f6fbccd471820", name: "Thriller" },
    numberInStock: 4,
    dailyRentalRate: 3.5,
    isLiked: false
  },
  {
    _id: "5b21ca3eeb7f6fbccd471821",
    title: "The Avengers",
    genre: { _id: "5b21ca3eeb7f6fbccd471818", name: "Action" },
    numberInStock: 7,
    dailyRentalRate: 3.5,
    isLiked: false
  },
  {
    _id: "5b21ca3eeb7f6fbccd47294A",
    title: "Inception",
    genre: { _id: "5b21ca3eeb7f6fbccd471818", name: "Action" },
    numberInStock: 10,
    dailyRentalRate: 5,
    isLiked: false
  }
];

export function getMovies() {
  return movies;
}

export function getMovie(id) {
  return movies.find(m => m._id === id);
}

export function saveMovie(movie) {
  let movieInDb = movies.find(m => m._id === movie._id) || {};
  movieInDb.name = movie.name;
  movieInDb.genre = genresAPI.genres.find(g => g._id === movie.genreId);
  movieInDb.numberInStock = movie.numberInStock;
  movieInDb.dailyRentalRate = movie.dailyRentalRate;

  if (!movieInDb._id) {
    movieInDb._id = Date.now();
    movies.push(movieInDb);
  }

  return movieInDb;
}

export function deleteMovie(id) {
  let movieInDb = movies.find(m => m._id === id);
  movies.splice(movies.indexOf(movieInDb), 1);
  return movies.length;
}

export function getNumberOfPages(moviePerPage) {
  return Math.ceil(movies.length / moviePerPage);
}

export function getMoviesPerPage(moviePerPage, pageNumber, genreID) {
  const genreMovies =
    genreID === "0"
      ? movies
      : movies.filter(movie => movie.genre._id === genreID);
  if (moviePerPage === "All Movies") {
    return { movies: genreMovies, totalNumberOfMovies: genreMovies.length };
  }
  const startPosition = moviePerPage * (pageNumber - 1);
  return {
    movies: _(genreMovies)
      .slice(startPosition)
      .take(moviePerPage)
      .value(),
    totalNumberOfMovies: genreMovies.length
  };
}

export function handleMovieLike(id) {
  let movieInDb = movies.find(m => m._id === id);
  movieInDb.isLiked = !movieInDb.isLiked;
}

export function getNumberOfMovies(filterID) {
  filterID = filterID || 0;
  let genreMovies;
  if (filterID === 0) {
    genreMovies = movies;
  } else {
    genreMovies = movies.filter(movie => movie.genre._id === filterID);
  }
  return genreMovies.length;
}
