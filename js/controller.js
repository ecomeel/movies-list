class Controller {
    constructor() {
        this.model = new Model({
            onMoviesChanged: this._handlerMoviesChanged
        });
        this.view = new View({
            onNewMovieChanged: this._handlerNewMovie,
            onViewStatusChanged: this._handlerViewStatus,
            onDeleteStatusChanged: this._handlerDeleteStatus
        });
    }

    init() {}

    _handlerMoviesChanged = (movies) => {
        this.view.renderMovies(movies)
    }

    _handlerNewMovie = (newMovie) => {
        this.model.addMovie(newMovie)
    }

    _handlerViewStatus = (clickedBtn, liNode, movieName) => {
        if (liNode.classList.contains(VIEWED_MOVIE_CLASSNAME)) {
            this.model.getMovies().forEach(movie => {
                if (movie.name === movieName) {
                    movie.viewed = '';
                    movie.violetBackBtn = '';
                }
            })
        } else {
            this.model.getMovies().forEach(movie => {
                if (movie.name === movieName) {
                    movie.viewed = VIEWED_MOVIE_CLASSNAME;
                    movie.violetBackBtn = VIOLET_BACKGROUND_COLOR_CLASSNAME;
                }
            })
        }
        liNode.classList.toggle(VIEWED_MOVIE_CLASSNAME);
        clickedBtn.classList.toggle(VIOLET_BACKGROUND_COLOR_CLASSNAME)
    }

    _handlerDeleteStatus = (liNode, movieName) => {
        const movies = this.model.getMovies()
        liNode.style.display = 'none';
        for (let i = 0; i < movies.length; i++) {
            if (movies[i].name === movieName) {
                movies.splice(i, 1);
            }
        }
    }
}