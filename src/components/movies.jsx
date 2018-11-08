import React, { Component } from "react";
import {
  getMoviesPerPage,
  getNumberOfPages,
  deleteMovie,
  handleMovieLike
} from "../services/fakeMovieService";
import Like from "./like";
import Pagenation from "./pagenation";

class Movies extends Component {
  constructor() {
    super();
    let moviePerPage = 4;
    let pageNumber = 1;
    this.state = {
      pageNumber: 1,
      moviePerPage: moviePerPage,
      movies: JSON.parse(
        JSON.stringify(getMoviesPerPage(moviePerPage, pageNumber))
      )
    };
  }

  componentDidUpdate(prevProps, prevState) {
    //console.log(prevState);
  }

  render() {
    return (
      <div className="container">
        {this.renderTable()}
        {this.renderPagenation()}
      </div>
    );
  }

  renderPagenation() {
    const numberOfPages = getNumberOfPages(this.state.moviePerPage);
    return this.state.movies.length === 0 ? (
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
        <h1>There are {this.state.movies.length} movies in the basket</h1>
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

  handlePageClick = pageNumber => {
    this.setState({
      pageNumber,
      movies: JSON.parse(
        JSON.stringify(getMoviesPerPage(this.state.moviePerPage, pageNumber))
      )
    });
  };

  handleDelete = id => {
    deleteMovie(id);
    this.setState({
      movies: JSON.parse(
        JSON.stringify(
          getMoviesPerPage(this.state.moviePerPage, this.state.pageNumber)
        )
      )
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
