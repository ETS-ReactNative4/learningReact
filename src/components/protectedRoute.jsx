import React from "react";
import { Route, Redirect } from "react-router-dom";
import authService from "../services/authService";

const ProtectedRoute = props => {
  const { component: Component, render, ...rest } = props;
  const userData = authService.getUser();
  return (
    <Route
      exact
      {...rest}
      render={props => {
        if (Object.keys(userData).length === 0) {
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location.pathname }
              }}
            />
          );
        }
        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
};

export default ProtectedRoute;
