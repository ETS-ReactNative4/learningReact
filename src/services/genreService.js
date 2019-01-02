import httpService from "./httpService";
import config from "../config.json";

async function getGenres() {
  const { data: genres } = await httpService.get(config.apiGenreEndPoint);
  genres.forEach(genre => {
    genre.active = false;
  });
  return [{ _id: "0", name: "All Movies", active: true }, ...genres];
}

export default {
  getGenres
};
