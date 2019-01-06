import httpService from "./httpService";
import config from "../config.json";
import _ from "lodash";

async function getMoviesPerPage(moviePerPage, pageNumber, genreID) {
  const { data: movies } = await httpService.get(config.apiMovieEndPoint);
  const genreMovies =
    genreID === "0"
      ? movies
      : movies.filter(movie => movie.genre._id === genreID);

  genreMovies.forEach(movie => {
    movie.isLiked = false;
  });

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

async function deleteMovie(id) {
  const { data: movie } = await httpService.delete(
    `${config.apiMovieEndPoint}/${id}`
  );
  return movie;
}

async function saveMovie(movie) {
  const { data } = await httpService.post(`${config.apiMovieEndPoint}`, movie);
  return data;
}

async function updateMovie(movie) {
  const movieClone = { ...movie };
  const id = movieClone._id;
  delete movieClone._id;
  const { data } = await httpService.put(
    `${config.apiMovieEndPoint}/${id}`,
    movieClone
  );
  return data;
}

export default {
  getMoviesPerPage,
  deleteMovie,
  saveMovie,
  updateMovie
};
