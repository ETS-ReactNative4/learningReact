import React, { Component } from "react";
import {
  getMoviesPerPage,
  deleteMovie,
  handleMovieLike,
  getNumberOfMovies
} from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Like from "./like";
import Pagenation from "./pagenation";
import SelectSingle from "./selectSingle";
import { deepCopy } from "../utilities/common";
import ListGroup from "./listGroup";
//import _ from "lodash";

class Movies extends Component {
  constructor() {
    super();
    const moviePerPage = 4;
    const pageNumber = 1;
    const listItemSelected = 1;
    const movies = deepCopy(getMoviesPerPage(moviePerPage, pageNumber));
    const genres = deepCopy([{ _id: 0, name: "All Movies" }, ...getGenres()]);
    const preFilterArray = [2, 4, 8];
    let filterArray = [];
    const totalNumberOfMovies = getNumberOfMovies();
    preFilterArray.forEach(value => {
      if (value < totalNumberOfMovies) {
        filterArray.push(value);
      }
    });
    filterArray.push(totalNumberOfMovies);
    const allFilterValue = filterArray[filterArray.length - 1];
    this.state = {
      pageNumber,
      moviePerPage,
      movies,
      allFilterValue,
      filterArray,
      genres,
      listItemSelected
    };
  }

  componentDidUpdate(prevProps, prevState) {}

  render() {
    return (
      <div
        className="container-fluid"
        style={{ display: "flex", paddingLeft: "0" }}
        id="mainTab"
      >
        <div id="genreTab" style={{ width: "15%" }}>
          {this.renderGenreTab()}
        </div>
        <div id="movieTab" style={{ width: "80%", marginLeft: "2%" }}>
          {this.renderTable()}
          {this.renderPagenation()}
        </div>
      </div>
    );
  }

  handleOnChangeSelect = event => {
    const moviePerPage = parseInt(event.target.value);
    const movies = deepCopy(getMoviesPerPage(moviePerPage, 1));
    this.setState({ movies, moviePerPage, pageNumber: 1 });
  };

  handleListClick = () => {};

  renderGenreTab() {
    return (
      <ListGroup
        listItems={this.state.genres}
        listItemSelected={this.state.listItemSelected}
        onListClick={this.state.handleListClick}
      />
    );
  }

  renderPagenation() {
    const numberOfPages = Math.ceil(
      this.state.allFilterValue / this.state.moviePerPage
    );
    return this.state.movies.length === 0 ||
      this.state.movies.length === this.state.allFilterValue ? (
      ""
    ) : (
      <Pagenation
        numberOfPages={numberOfPages}
        pageClick={this.handlePageClick}
        pageNumber={this.state.pageNumber}
      />
    );
  }

  renderTable() {
    return this.state.movies.length === 0 ? (
      <h1>No movies in the basket</h1>
    ) : (
      <React.Fragment>
        <div className="moviePageHeader">
          <h1 style={{ float: "left" }}>
            There are {this.state.movies.length} movies in the basket
          </h1>
          <SelectSingle
            labelName={"Movies Per Page"}
            uniqueID={"MoviePerPage"}
            onChangeSelect={this.handleOnChangeSelect}
            optionList={this.renderOptionList()}
            valueList={this.state.filterArray}
            moviePerPage={this.state.moviePerPage}
          />
        </div>
        <table className="table customTable">
          <thead>
            <tr>
              <th>Title</th>
              <th>Genre</th>
              <th>Stock</th>
              <th>Rate</th>
              <th />
              <th />
            </tr>
          </thead>
          <tbody>{this.renderMovieList()}</tbody>
        </table>
      </React.Fragment>
    );
  }

  renderOptionList() {
    const filterArray = deepCopy(this.state.filterArray);
    const lastIndex = filterArray.length - 1;
    return filterArray.map((filter, index) => {
      if (index === lastIndex) {
        filter = "All Movies";
      }
      return filter;
    });
  }

  handlePageClick = pageNumber => {
    this.setState({
      pageNumber,
      movies: JSON.parse(
        JSON.stringify(getMoviesPerPage(this.state.moviePerPage, pageNumber))
      )
    });
  };

  handleDelete = id => {
    const totalNumberOfMovies = deleteMovie(id);
    let pageNumber = this.state.pageNumber;
    if (pageNumber > 1 && this.state.movies.length === 1) {
      pageNumber--;
    }
    const movies = deepCopy(
      getMoviesPerPage(this.state.moviePerPage, pageNumber)
    );
    let filterArray = [];
    let preFilterArray = deepCopy(this.state.filterArray);
    preFilterArray.forEach(value => {
      if (value < totalNumberOfMovies) {
        filterArray.push(value);
      }
    });
    filterArray.push(totalNumberOfMovies);
    const allFilterValue = filterArray[filterArray.length - 1];
    let moviePerPage = this.state.moviePerPage;
    if (moviePerPage === allFilterValue + 1) {
      moviePerPage = allFilterValue;
    }
    this.setState({
      pageNumber,
      movies,
      filterArray,
      allFilterValue,
      moviePerPage
    });
  };

  handleLike = id => {
    handleMovieLike(id);
    const movies = JSON.parse(JSON.stringify(this.state.movies));
    movies.forEach(movie => {
      if (movie._id === id) {
        movie.isLiked = !movie.isLiked;
      }
    });
    this.setState({ movies });
  };

  renderMovieList() {
    return this.state.movies.map(movie => (
      <tr key={movie._id}>
        <td>{movie.title}</td>
        <td>{movie.genre.name}</td>
        <td>{movie.numberInStock}</td>
        <td>{movie.dailyRentalRate}</td>
        <td>
          <Like
            switchLike={this.handleLike}
            id={movie._id}
            isLiked={movie.isLiked}
          />
        </td>
        <td>
          <button
            className="btn btn-danger btn-md"
            onClick={() => this.handleDelete(movie._id)}
          >
            Delete
          </button>
        </td>
      </tr>
    ));
  }
}

export default Movies;
