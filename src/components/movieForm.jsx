import React from "react";
import Joi from "joi-browser";
import Form from "./form";
import movieService from "../services/movieService";
import genreService from "../services/genreService";

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

  async componentDidMount() {
    if (this.props.movie === null) this.props.history.push("/not-found");

    let genres = await genreService.getGenres();
    genres = genres.filter(genre => genre._id !== "0");
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

  doSubmit = async () => {
    const { data } = this.state;
    const movieOldDetails = this.props.movie || {};
    const movie = {
      title: data.title,
      genreId: data.genre,
      numberInStock: data.stock,
      dailyRentalRate: data.rate
    };

    if (movieOldDetails._id) {
      movie._id = movieOldDetails._id;
      await movieService.updateMovie(movie);
    } else {
      await movieService.saveMovie(movie);
    }

    this.props.history.push("/movies");
  };
}

export default MovieForm;
