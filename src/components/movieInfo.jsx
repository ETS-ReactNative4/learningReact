import React from "react";

const MovieInfo = ({ movie, history }) => {
  return (
    <div>
      <table className="table">
        <tbody>
          <tr>
            <td>{movie.title}</td>
          </tr>
          <tr>
            <td>{movie.numberInStock}</td>
          </tr>
          <tr>
            <td>{movie.dailyRentalRate}</td>
          </tr>
          <tr>
            <td>{movie.genre.name}</td>
          </tr>
          <tr>
            <td>
              <button className="btn btn-primary" onClick={saveMovieInfo}>
                Save
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  function saveMovieInfo() {
    history.push("/movies");
  }
};

export default MovieInfo;
