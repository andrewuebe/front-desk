import React, { Component } from "react";
import Genres from "./Genres";
import Sources from "./Sources";

export default class Dvd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movieDate: "",
    };
  }

  componentDidMount() {

  }

  componentDidUpdate() {

  }

  render() {

    return (
      <div className="dvd-option">
        <div className="dvd-cover">
          <img alt="Dvd case overlay" src={process.env.PUBLIC_URL + "/dvd-case.png"} />
          <img
            alt={`Grayscale dvd cover for the movie ${this.props.movieName}`}
            className="poster-image"
            src={this.props.movieDataLoaded ? `https://image.tmdb.org/t/p/w600_and_h900_bestv2${this.props.movieDetails.posterPath}` : `${process.env.PUBLIC_URL}/temp-dvd-poster.jpg`}
          />
        </div>
        <div className="dvd-info">
          <div className="dvd-title">
            <div className="dvd-name">{this.props.movieName}</div>
            <div className="dvd-date">{this.state.movieDate.length > 0 ? "undefined" : `(${this.props.movieDate.substring(0,4)})`}</div>
          </div>
          <Genres
            genres={this.props.movieDetails.genreArray}
          />
          <Sources
            sources={this.props.movieSources}
          />
        </div>
      </div>
    );
  }
}
