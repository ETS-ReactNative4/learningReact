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
    movie: null
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
              <Movies updateMovieDetail={this.updateMovieDetail} {...props} />
            )}
          />
          <ProtectedRoute path="/cart" exact={true} component={App} />
          <Route
            path="/login"
            exact
            render={props => <LoginForm onLogin={this.updateUser} {...props} />}
          />
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
}

export default Home;
