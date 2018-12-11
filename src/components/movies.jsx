import React, { Component } from "react";
import {
  getMoviesPerPage,
  deleteMovie,
  handleMovieLike
} from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Like from "./like";
import Pagenation from "./pagenation";
import SelectSingle from "./selectSingle";
import { deepCopy } from "../utilities/common";
import Table from "../utilities/table";
import ListGroup from "./listGroup";

class Movies extends Component {
  state = {
    pageNumber: 1,
    moviesInfo: { movies: [], totalNumberOfMovies: 0 },
    filterArray: [
      {
        _id: 1,
        filterValue: 2,
        filterActive: false,
        filterPossible: true,
        defaultValue: false
      },
      {
        _id: 2,
        filterValue: 4,
        filterActive: true,
        filterPossible: true,
        defaultValue: true
      },
      {
        _id: 3,
        filterValue: 8,
        filterActive: false,
        filterPossible: true,
        defaultValue: false
      },
      {
        _id: 4,
        filterValue: "All Movies",
        filterActive: false,
        filterPossible: true,
        defaultValue: false
      }
    ],
    genres: [],
    sortingProps: [],
    headerList: ["Title", "Genre", "Stock", "Rate", "", ""],
    bodyPropsName: [
      "title",
      "genre",
      "numberInStock",
      "dailyRentalRate",
      "like",
      "delete"
    ]
  };

  componentDidMount() {
    const genres = deepCopy(getGenres());
    const moviesInfo = this.getUpdatedMovies(null, null, genres);
    let filterArray = this.updateFilterArray(moviesInfo.numberOfMovies);
    this.setState({
      moviesInfo,
      filterArray,
      genres
    });
  }

  render() {
    return (
      <div
        className="container-fluid"
        style={{ display: "flex", paddingLeft: "0" }}
        id="mainTab"
      >
        <div id="genreTab">{this.renderGenreTab()}</div>
        <div id="hiddenButton">
          <button className="btn btn-primary genreShowBtn">Genre</button>
        </div>
        <div id="movieTab">
          {this.renderTable()}
          {this.renderPagenation()}
        </div>
      </div>
    );
  }

  renderGenreTab() {
    return (
      <ListGroup
        listItems={this.state.genres}
        idProp={"_id"}
        nameProp={"name"}
        activeProp={"active"}
        onListClick={this.handleListClick}
      />
    );
  }

  renderPagenation() {
    let activeFilter = this.state.filterArray.filter(
      filter => filter.filterActive
    )[0];

    if (activeFilter.filterValue === "All Movies") {
      return "";
    }

    const numberOfPages = Math.ceil(
      this.state.moviesInfo.totalNumberOfMovies / activeFilter.filterValue
    );
    return (
      <Pagenation
        numberOfPages={numberOfPages}
        pageClick={this.handlePageClick}
        pageNumber={this.state.pageNumber}
      />
    );
  }

  renderTable() {
    if (this.state.moviesInfo.movies.length === 0) {
      return <h1>No movies in the basket</h1>;
    }

    const bodyPropsName = this.state.bodyPropsName;
    let headerList = this.state.headerList
      .filter(header => header !== "")
      .map((header, index) => {
        return (
          <React.Fragment>
            {header} {this.renderSortDiv(bodyPropsName[index])}
          </React.Fragment>
        );
      });
    headerList = [
      ...headerList,
      ...this.state.headerList.filter(header => header === "")
    ];

    let bodyContent = deepCopy(this.state.moviesInfo.movies);
    bodyContent.forEach(content => {
      content.like = (
        <Like
          switchLike={this.handleLike}
          id={content._id}
          isLiked={content.isLiked}
        />
      );
      content.delete = (
        <button
          className="btn btn-danger myButton"
          onClick={() => this.handleDelete(content._id)}
        >
          Delete
        </button>
      );
      content.genre = content.genre.name;
    });

    return (
      <React.Fragment>
        <div className="moviePageHeader">
          <h1 style={{ float: "left" }}>
            There are {bodyContent.length} movies in the basket
          </h1>
          <SelectSingle
            labelName={"Movies Per Page"}
            uniqueID={"MoviePerPage"}
            onChangeSelect={this.handleOnChangeSelect}
            optionList={this.state.filterArray
              .filter(filter => filter.filterPossible)
              .map(filter => filter.filterValue)}
            valueList={this.state.filterArray
              .filter(filter => filter.filterPossible)
              .map(filter => filter._id)}
            selectedValue={
              this.state.filterArray.filter(
                filter => filter.filterActive === true
              )[0]._id
            }
          />
          <Table
            tableClasses={"table customTable"}
            headerList={headerList}
            bodyContent={bodyContent}
            bodyPropsName={bodyPropsName}
            sortingProps={this.state.sortingProps}
          />
        </div>
      </React.Fragment>
    );
  }

  renderSortDiv(headerName) {
    let arrowSymbol = [
      <i
        key={headerName + "_icon"}
        className={this.renderHeaderClass(headerName)}
        aria-hidden="true"
        style={{ cursor: "pointer", margin: "0 4% 0 2%" }}
        onClick={() => this.handleSort(headerName)}
      />
    ];
    let sortPos = 0;
    this.state.sortingProps.forEach((sortingProp, index) => {
      sortPos = sortingProp.SortColumn === headerName ? index + 1 : sortPos;
    });
    arrowSymbol.push(
      <span
        key={headerName + "_sortPos"}
        className="badge badge-pill badge-dark"
        style={{ opacity: sortPos === 0 ? 0 : 1 }}
      >
        {sortPos}
      </span>
    );
    return <React.Fragment>{arrowSymbol}</React.Fragment>;
  }

  renderHeaderClass(headerName) {
    let sortOrder = "none";
    this.state.sortingProps.forEach(sortingProp => {
      sortOrder =
        sortingProp.SortColumn === headerName
          ? sortingProp.SortOrder
          : sortOrder;
    });

    if (sortOrder === "asc") {
      return "fa fa-sort-asc";
    } else if (sortOrder === "desc") {
      return "fa fa-sort-desc";
    }
    return "fa fa-sort";
  }

  handlePageClick = pageNumber => {
    this.setState({
      pageNumber,
      moviesInfo: this.getUpdatedMovies(pageNumber)
    });
  };

  handleDelete = id => {
    deleteMovie(id);

    let pageNumber = this.state.pageNumber;
    if (pageNumber > 1 && this.state.moviesInfo.movies.length === 1) {
      pageNumber--;
    }
    const moviesInfo = this.getUpdatedMovies(pageNumber);

    this.setState({
      pageNumber,
      moviesInfo,
      filterArray: this.updateFilterArray(moviesInfo.totalNumberOfMovies)
    });
  };

  handleLike = id => {
    handleMovieLike(id);

    let moviesInfo = deepCopy(this.state.moviesInfo);
    moviesInfo.movies.forEach(movie => {
      if (movie._id === id) {
        movie.isLiked = !movie.isLiked;
      }
    });

    this.setState({ moviesInfo });
  };

  handleSort = SortColumn => {
    let sortingProps = deepCopy(this.state.sortingProps);
    let columnnFound = false;

    sortingProps = sortingProps.map(sortingProp => {
      if (sortingProp.SortColumn === SortColumn) {
        columnnFound = true;
        if (sortingProp.SortOrder === "asc") {
          sortingProp.SortOrder = "desc";
          return sortingProp;
        }
        return { SortColumn: "RemoveMe" };
      }
      return sortingProp;
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
    const selectedValue = parseInt(event.target.value);
    let filterArray = deepCopy(this.state.filterArray);
    const pageNumber = 1;

    filterArray.forEach(filter => {
      filter.filterActive = filter._id !== selectedValue ? false : true;
    });

    this.setState({
      pageNumber,
      moviesInfo: this.getUpdatedMovies(pageNumber, filterArray),
      filterArray
    });
  };

  handleListClick = id => {
    let genres = deepCopy(this.state.genres);
    const pageNumber = 1;

    genres.forEach(genre => {
      genre.active = genre._id === id ? true : false;
    });

    let checkFilterArray = deepCopy(this.state.filterArray);
    let defaultFilter = checkFilterArray.filter(filter => filter.defaultValue);
    let allFilter = checkFilterArray.filter(
      filter => filter.filterValue === "All Movies"
    );
    if (allFilter[0].filterActive && defaultFilter.length > 0) {
      allFilter[0].filterActive = false;
      defaultFilter[0].filterActive = true;
    }
    const moviesInfo = this.getUpdatedMovies(
      pageNumber,
      checkFilterArray,
      genres
    );

    this.setState({
      moviesInfo,
      pageNumber,
      filterArray: this.updateFilterArray(moviesInfo.totalNumberOfMovies),
      genres
    });
  };

  updateFilterArray(totalNumberOfMovies) {
    let filterArray = deepCopy(this.state.filterArray);
    let soloFilterActive = false;

    filterArray
      .filter(filter => filter.filterValue !== "All Movies")
      .forEach(filter => {
        if (filter.filterValue >= totalNumberOfMovies) {
          filter.filterPossible = false;
          filter.filterActive = false;
        } else {
          filter.filterPossible = true;
        }
        soloFilterActive = filter.filterActive ? true : soloFilterActive;
      });

    if (!soloFilterActive) {
      let defaultFilter = filterArray.filter(
        filter => filter.defaultValue && filter.filterPossible
      );
      let allFilter = filterArray.filter(
        filter => filter.filterValue === "All Movies"
      );
      if (defaultFilter.length !== 0) {
        defaultFilter[0].filterActive = true;
        allFilter[0].filterActive = false;
      } else {
        allFilter[0].filterActive = true;
      }
    }

    return filterArray;
  }

  getUpdatedMovies(pageNumber, filterArray, genres) {
    if (!pageNumber) {
      pageNumber = this.state.pageNumber;
    }

    if (!filterArray) {
      filterArray = this.state.filterArray;
    }

    if (!genres) {
      genres = this.state.genres;
    }

    return deepCopy(
      getMoviesPerPage(
        filterArray.filter(filter => filter.filterActive)[0].filterValue,
        pageNumber,
        genres.filter(genre => genre.active === true)[0]._id
      )
    );
  }
}

export default Movies;
