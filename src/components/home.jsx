import React, { Component } from "react";
import GenericNavbar from "./genericNavbar";
import { Switch, Route } from "react-router-dom";
import Movies from "./movies";
import App from "./../App";
import MovieInfo from "./movieInfo";
import LoginForm from "./loginForm";

class Home extends Component {
  state = {
    navHeader: ["Cart", "Movies", "Login"],
    navLocation: ["/cart", "/movies", "/login"],
    movie: {
      title: "no movies selected",
      numberInStock: "none",
      dailyRentalRate: "none",
      genre: { name: "none" }
    }
  };
  render() {
    return (
      <React.Fragment>
        <GenericNavbar
          NavbarHeading={<i className="fa fa-home" aria-hidden="true" />}
          NavbarItems={this.state.navHeader}
          NavbarLocations={this.state.navLocation}
        />
        <Switch>
          <Route
            path="/movies/movie-details/:movieName"
            render={props => <MovieInfo movie={this.state.movie} {...props} />}
          />
          <Route
            path="/movies"
            render={props => (
              <Movies updateMovieDetail={this.updateMovieDetail} {...props} />
            )}
          />
          <Route path="/cart" component={App} />
          <Route path="/login" component={LoginForm} />
        </Switch>
      </React.Fragment>
    );
  }

  updateMovieDetail = movie => {
    this.setState({ movie });
  };
}

export default Home;
