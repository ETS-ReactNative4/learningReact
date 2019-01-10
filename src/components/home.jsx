import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import jwtDecode from "jwt-decode";
import GenericNavbar from "./genericNavbar";
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
    userData: {},
    movie: null
  };

  componentDidMount() {
    const jwt = localStorage.getItem("token");
    if (jwt && jwt !== "") {
      const userData = jwtDecode(jwt);
      const navData = this.updateNavBarItems(true);
      this.setState({
        userData,
        navHeader: navData.navHeader,
        navLocation: navData.navLocation
      });
    }
  }

  componentDidUpdate() {
    let userData = { ...this.state.userData };
    if (Object.keys(userData).length === 0) {
      const jwt = localStorage.getItem("token");
      if (jwt && jwt !== "") {
        userData = jwtDecode(jwt);
        const navData = this.updateNavBarItems(true);
        this.setState({
          userData,
          navHeader: navData.navHeader,
          navLocation: navData.navLocation
        });
      }
    }
  }

  updateNavBarItems(isUserLoggedIn) {
    let navHeader = [];
    let navLocation = [];
    if (isUserLoggedIn) {
      navHeader = ["Cart", "Movies"];
      navLocation = ["/cart", "/movies"];
    } else {
      navHeader = ["Cart", "Movies", "Login", "Register"];
      navLocation = ["/cart", "/movies", "/login", "/register"];
    }
    return { navHeader: navHeader, navLocation: navLocation };
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

  handleLogOut = () => {
    localStorage.removeItem("token");
    const userData = {};
    const navData = this.updateNavBarItems(false);
    this.setState({
      userData,
      navHeader: navData.navHeader,
      navLocation: navData.navLocation
    });
  };
}

export default Home;
