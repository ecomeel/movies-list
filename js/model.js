class Model {
    constructor({ onMoviesChanged }) {
        this.movies = [];

        this.onMoviesChanged = onMoviesChanged;
    }

    getMovies() {
        return this.movies;
    }

    addMovie(movie) {
        this.movies.push({name: movie, viewed: '', violetBackBtn: ''});

        this.onMoviesChanged(this.movies)
    }
}