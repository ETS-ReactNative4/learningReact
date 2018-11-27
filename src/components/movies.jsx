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
import _ from "lodash";

class Movies extends Component {
  state = {
    pageNumber: 1,
    moviePerPage: 4,
    movies: [],
    allFilterValue: 0,
    filterArray: [],
    genres: [],
    listItemSelected: 1,
    sortingProps: []
  };

  componentDidMount() {
    const moviePerPage = 4;
    const pageNumber = 1;
    const listItemSelected = 1;
    const genres = deepCopy([{ _id: 0, name: "All Movies" }, ...getGenres()]);
    const movies = deepCopy(
      getMoviesPerPage(
        moviePerPage,
        pageNumber,
        genres[listItemSelected - 1]._id
      )
    );
    const preFilterArray = [2, 4, 8];
    let filterArray = [];
    const totalNumberOfMovies = getNumberOfMovies(0);
    preFilterArray.forEach(value => {
      if (value < totalNumberOfMovies) {
        filterArray.push(value);
      }
    });
    filterArray.push(totalNumberOfMovies);
    const allFilterValue = filterArray[filterArray.length - 1];
    this.setState({
      movies,
      allFilterValue,
      filterArray,
      genres
    });
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

  handleSort = SortColumn => {
    let sortingProps = deepCopy(this.state.sortingProps);
    let columnnFound = false;
    sortingProps = sortingProps.map(sortingProp => {
      if (sortingProp.SortColumn === SortColumn) {
        columnnFound = true;
        if (sortingProp.SortOrder === "asc") {
          sortingProp.SortOrder = "desc";
          return sortingProp;
        } else {
          return { SortColumn: "RemoveMe" };
        }
      } else {
        return sortingProp;
      }
    });
    if (!columnnFound) {
      sortingProps.push({ SortColumn, SortOrder: "asc" });
    }
    sortingProps = sortingProps.filter(
      sortingProp => sortingProp.SortColumn !== "RemoveMe"
    );
    this.setState({ sortingProps });
  };

  handleOnChangeSelect = event => {
    const moviePerPage = parseInt(event.target.value);
    let movies = deepCopy(
      getMoviesPerPage(
        moviePerPage,
        1,
        this.state.genres[this.state.listItemSelected - 1]._id
      )
    );
    this.setState({ movies, moviePerPage, pageNumber: 1 });
  };

  handleListClick = id => {
    let movies;
    let { moviePerPage, genres } = this.state;
    const pageNumber = 1;
    let listItemSelected;
    genres.forEach((genre, index) => {
      if (genre._id === id) {
        listItemSelected = index + 1;
      }
    });
    const totalNumberOfMovies = getNumberOfMovies(
      this.state.genres[listItemSelected - 1]._id
    );
    let filterArray = this.updateFilterArray(totalNumberOfMovies);
    const allFilterValue = filterArray[filterArray.length - 1];
    if (moviePerPage >= allFilterValue) {
      moviePerPage = allFilterValue;
    } else {
      const filterValid = filterArray.indexOf(moviePerPage);
      if (filterValid !== -1) {
        moviePerPage = filterArray[filterValid];
      } else {
        if (totalNumberOfMovies >= 4) {
          moviePerPage = 4;
        } else {
          moviePerPage = 2;
        }
      }
    }
    movies = deepCopy(getMoviesPerPage(moviePerPage, pageNumber, id));
    this.setState({
      movies,
      listItemSelected,
      pageNumber,
      moviePerPage,
      filterArray,
      allFilterValue
    });
  };

  renderGenreTab() {
    return (
      <ListGroup
        listItems={this.state.genres}
        listItemSelected={this.state.listItemSelected}
        idProp={"_id"}
        nameProp={"name"}
        onListClick={this.handleListClick}
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
    let movies = deepCopy(this.state.movies);
    const sortingProps = this.state.sortingProps;
    let sortingColumns = [];
    let sortingOrder = [];
    sortingProps.forEach(sortingProp => {
      sortingColumns.push(sortingProp.SortColumn);
      sortingOrder.push(sortingProp.SortOrder);
    });
    movies = _(movies)
      .orderBy(sortingColumns, sortingOrder)
      .value();
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
              <th>Title {this.renderSortDiv("title")}</th>
              <th>Genre {this.renderSortDiv("genre.name")}</th>
              <th>Stock {this.renderSortDiv("numberInStock")}</th>
              <th>Rate {this.renderSortDiv("dailyRentalRate")}</th>
              <th />
              <th />
            </tr>
          </thead>
          <tbody>{this.renderMovieList(movies)}</tbody>
        </table>
      </React.Fragment>
    );
  }

  renderSortDiv(headerName) {
    let arrowSymbol = [
      <i
        key={headerName + "_icon"}
        className={this.renderHeaderClass(headerName)}
        aria-hidden="true"
        style={{ cursor: "pointer", margin: "0 7% 0 2%", width: "5%" }}
        onClick={() => this.handleSort(headerName)}
      />
    ];
    let sortPos = "sort";
    this.state.sortingProps.forEach((sortingProp, index) => {
      if (sortingProp.SortColumn === headerName) {
        sortPos = index + 1;
      }
    });
    arrowSymbol.push(
      <span
        key={headerName + "_sortPos"}
        className="badge badge-pill badge-dark"
      >
        {sortPos}
      </span>
    );
    return <React.Fragment>{arrowSymbol}</React.Fragment>;
  }

  renderHeaderClass(headerName) {
    let sortOrder = "none";
    this.state.sortingProps.forEach(sortingProp => {
      if (sortingProp.SortColumn === headerName) {
        sortOrder = sortingProp.SortOrder;
      }
    });
    if (sortOrder === "asc") {
      return "fa fa-arrow-up fa-sm";
    } else if (sortOrder === "desc") {
      return "fa fa-arrow-down fa-sm";
    } else {
      return "fa fa-sort fa-lg";
    }
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
        JSON.stringify(
          getMoviesPerPage(
            this.state.moviePerPage,
            pageNumber,
            this.state.genres[this.state.listItemSelected - 1]._id
          )
        )
      )
    });
  };

  handleDelete = id => {
    deleteMovie(id);
    const totalNumberOfMovies = getNumberOfMovies(
      this.state.genres[this.state.listItemSelected - 1]._id
    );
    let pageNumber = this.state.pageNumber;
    if (pageNumber > 1 && this.state.movies.length === 1) {
      pageNumber--;
    }
    const movies = deepCopy(
      getMoviesPerPage(
        this.state.moviePerPage,
        pageNumber,
        this.state.genres[this.state.listItemSelected - 1]._id
      )
    );
    let filterArray = this.updateFilterArray(totalNumberOfMovies);
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

  renderMovieList(movies) {
    return movies.map(movie => (
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

  updateFilterArray(totalNumberOfMovies) {
    let filterArray = [];
    let preFilterArray = [2, 4, 8];
    preFilterArray.forEach(value => {
      if (value < totalNumberOfMovies) {
        filterArray.push(value);
      }
    });
    filterArray.push(totalNumberOfMovies);
    return filterArray;
  }
}

export default Movies;
