import React, { Component } from 'react';
import MovieItem from './MovieItem';
import { API_URL, API_KEY_3 } from '../../api/api';

export default class MovieList extends React.Component {
  constructor() {
    super();

    this.state = {
      movies: [],
    };
  }

  getMovies = (filters, page) => {
    const { sort_by, year, genre } = filters;
    const link = `${API_URL}/discover/movie?api_key=${API_KEY_3}&language=en-US&sort_by=${sort_by}&page=${page}&primary_release_year=${year}&with_genres=${genre}`;

    fetch(link)
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({
          movies: data.results,
        });
      });
  };

  componentDidMount() {
    this.getMovies(this.props.filters, this.props.page);
  }

  componentDidUpdate(prevProps) {
    if (this.props.filters.sort_by !== prevProps.filters.sort_by) {
      this.getMovies(this.props.filters, 1);
      this.props.onChangePage(1);
    }

    if (this.props.filters.year !== prevProps.filters.year) {
      this.getMovies(this.props.filters, this.props.page);
      this.props.onChangePage(this.props.page);
    }

    if (this.props.filters.genre !== prevProps.filters.genre) {
      this.getMovies(this.props.filters, this.props.page);
      this.props.onChangePage(this.props.page);
    }

    if (this.props.page !== prevProps.page) {
      this.getMovies(this.props.filters, this.props.page);
    }
  }

  render() {
    const { movies } = this.state;
    return (
      <div className="row">
        {movies.map(movie => {
          return (
            <div key={movie.id} className="col-6 mb-4">
              <MovieItem item={movie} />
            </div>
          );
        })}
      </div>
    );
  }
}
