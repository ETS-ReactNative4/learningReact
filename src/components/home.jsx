import React, { Component } from "react";
import GenericNavbar from "./genericNavbar";
import { Switch, Route, Redirect } from "react-router-dom";
import Movies from "./movies";
import App from "./../App";
import LoginForm from "./loginForm";
import MovieForm from "./movieForm";
import Welcome from "./welcome";
import NotFound from "./notFound";
import RegisterForm from "./registerForm";

class Home extends Component {
  state = {
    navHeader: ["Cart", "Movies", "Login", "Register"],
    navLocation: ["/cart", "/movies", "/login", "/register"],
    movie: null
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
          <Route path="/not-found" exact component={NotFound} />
          <Route
            path="/movies/add-movie"
            exact
            render={props => <MovieForm {...props} />}
          />
          <Route
            path="/movies/movie-details/:movieName"
            exact
            render={props => <MovieForm movie={this.state.movie} {...props} />}
          />
          <Route
            path="/movies"
            exact
            render={props => (
              <Movies updateMovieDetail={this.updateMovieDetail} {...props} />
            )}
          />
          <Route path="/cart" exact component={App} />
          <Route path="/login" exact component={LoginForm} />
          <Route path="/register" exact component={RegisterForm} />
          <Route path="/" exact component={Welcome} />
          <Redirect to="/not-found" />
        </Switch>
      </React.Fragment>
    );
  }

  updateMovieDetail = movie => {
    this.setState({ movie });
  };
}

export default Home;
