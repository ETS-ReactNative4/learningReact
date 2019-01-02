import React from "react";
import Joi from "joi-browser";
import Form from "./form";
import { getGenres } from "./../services/fakeGenreService";
import { saveMovie } from "./../services/fakeMovieService";

class MovieForm extends Form {
  state = {
    data: { title: "", genre: "", stock: "", rate: "" },
    showError: { title: true, genre: false, stock: false, rate: false },
    errors: {
      initialKey: "NA"
    },
    optionList: [],
    valueList: []
  };

  componentDidMount() {
    if (this.props.movie === null) this.props.history.push("/not-found");

    const genres = getGenres().filter(genre => genre._id !== "0");
    const optionList = genres.map(genre => genre.name);
    const valueList = genres.map(genre => genre._id);
    const data = { ...this.state.data };
    const movie = this.props.movie || {};

    if (Object.keys(movie).length > 0) {
      data.title = movie.title;
      data.genre = movie.genre._id;
      data.stock = movie.numberInStock;
      data.rate = movie.dailyRentalRate;
    } else {
      data.genre = valueList[0];
    }

    this.setState({ data, optionList, valueList });
  }

  schema = {
    title: Joi.string()
      .required()
      .label("Title"),
    genre: Joi.string()
      .required()
      .label("Genre"),
    stock: Joi.number()
      .integer()
      .required()
      .min(0)
      .max(100)
      .label("Stock"),
    rate: Joi.number()
      .required()
      .min(0)
      .max(10)
      .label("Rate")
  };

  render() {
    const movie = this.props.movie || {};
    const submitButtonLabel =
      Object.keys(movie).length > 0 ? "Edit Movie" : "Add Movie";

    return (
      <div className="container">
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title", "text", true)}
          {this.renderInput(
            "genre",
            "Genre",
            "select",
            false,
            this.state.optionList,
            this.state.valueList
          )}
          {this.renderInput("stock", "Stock", "number", false)}
          {this.renderInput("rate", "Rate", "number", false)}
          {this.renderSubmitButton(submitButtonLabel)}
        </form>
      </div>
    );
  }

  doSubmit = () => {
    const { data } = this.state;
    const movieOld = this.props.movie || {};
    const movie = {
      _id: movieOld._id || null,
      title: data.title,
      genreId: data.genre,
      numberInStock: data.stock,
      dailyRentalRate: data.rate,
      isLiked: false
    };

    saveMovie(movie);

    this.props.history.push("/movies");
  };
}

export default MovieForm;
