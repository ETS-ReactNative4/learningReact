import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import GenericNavbar from "./genericNavbar";
import Movies from "./movies";
import App from "./../App";
import LoginForm from "./loginForm";
import MovieForm from "./movieForm";
import Welcome from "./welcome";
import NotFound from "./notFound";
import RegisterForm from "./registerForm";
import authService from "../services/authService";
import ProtectedRoute from "./protectedRoute";

class Home extends Component {
  state = {
    navHeader: ["Login", "Register"],
    navLocation: ["/login", "/register"],
    userData: {},
    movie: null,
    displayLoader: false
  };

  componentDidMount() {
    window.addEventListener("storage", this.handleStorageChange);
    this.updateUser();
  }

  render() {
    return (
      <React.Fragment>
        <GenericNavbar
          NavbarHeading={<i className="fa fa-home" aria-hidden="true" />}
          NavbarItems={this.state.navHeader}
          NavbarLocations={this.state.navLocation}
          userData={this.state.userData}
          handleLogOut={this.handleLogOut}
        />
        <div
          className="loader"
          style={{ display: this.state.displayLoader ? "" : "none" }}
          id="loader"
        >
          <img alt="Loading..." src="/copper-loader.gif" />
        </div>
        <Switch>
          <Route path="/not-found" exact component={NotFound} />
          <ProtectedRoute
            path="/movies/add-movie"
            exact={true}
            render={props => <MovieForm {...props} />}
          />
          <ProtectedRoute
            path="/movies/movie-details/:movieName"
            exact={true}
            render={props => <MovieForm movie={this.state.movie} {...props} />}
          />
          <ProtectedRoute
            path="/movies"
            exact={true}
            render={props => (
              <Movies
                updateMovieDetail={this.updateMovieDetail}
                displayLoader={this.handleLoader}
                {...props}
              />
            )}
          />
          <ProtectedRoute path="/cart" exact={true} component={App} />
          <Route
            path="/login"
            exact
            render={props => (
              <LoginForm
                onLogin={this.updateUser}
                displayLoader={this.handleLoader}
                {...props}
              />
            )}
          />
          <Route
            path="/register"
            exact
            render={props => (
              <RegisterForm
                onLogin={this.updateUser}
                displayLoader={this.handleLoader}
                {...props}
              />
            )}
          />
          <Route path="/" exact component={Welcome} />
          <Redirect to="/not-found" />
        </Switch>
      </React.Fragment>
    );
  }

  updateMovieDetail = movie => {
    this.setState({ movie });
  };

  handleLogOut = () => {
    authService.logOut();
    this.updateUser();
  };

  updateUser = () => {
    const userData = authService.getUser();
    const navHeader =
      Object.keys(userData).length > 0
        ? ["Cart", "Movies"]
        : ["Login", "Register"];
    let navLocation =
      Object.keys(userData).length > 0
        ? ["/cart", "/movies"]
        : ["/login", "/register"];
    this.setState({
      userData,
      navHeader,
      navLocation
    });
  };

  handleStorageChange = () => {
    window.location = "/";
  };

  handleLoader = displayLoader => {
    this.setState({ displayLoader });
  };
}

export default Home;
