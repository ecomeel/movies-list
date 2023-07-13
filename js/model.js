class Model {
    constructor({ onMoviesChanged }) {
        this.movies = [];

        this.onMoviesChanged = onMoviesChanged;
    }

    getMovies() {
        return this.movies;
    }

    addMovie(movie) {
        this.movies.push(movie);

        this.onMoviesChanged(this.movies)
    }

    setMovies(movies) {
        this.movies = movies;
    }
}