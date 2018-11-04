import React, { Component } from "react";
import { getMovies, deleteMovie } from "../services/fakeMovieService";
import Like from "../components/Like";

class Movies extends Component {
  state = {
    movies: JSON.parse(JSON.stringify(getMovies()))
  };

  componentDidUpdate(prevProps, prevState) {}

  render() {
    return <div className="container">{this.renderTable()}</div>;
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

  handleDelete(id) {
    deleteMovie(id);
    this.setState({
      movies: JSON.parse(JSON.stringify(getMovies()))
    });
  }

  handleLike = id => {
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
