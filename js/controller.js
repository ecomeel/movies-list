class Controller {
    constructor() {
        this.model = new Model({
            onMoviesChanged: this._handlerModelMoviesChanged
        });
        this.view = new View({
            onNewMovieChanged: this._handlerViewNewMovie,
            onViewStatusChanged: this._handlerViewStatus,
            onDeleteStatusChanged: this._handlerViewDeleteStatus
        });
        // this.storage = new Storage();
    }

    init() {
        // if (Array.isArray(this.storage.getMoviesFromStorage())) {
        //     this.model.setMovies(this.storage.getMoviesFromStorage())
        // }
        // console.log(this.model.getMovies())
        // this.view.renderMovies(this.model.getMovies());
    }

    _handlerModelMoviesChanged = (movies) => {
        this.storage.saveMoviesToStorage(movies);
        this.view.renderMovies(movies);
    }

    _handlerViewNewMovie = (newMovie) => {
        const movie = {name: newMovie, viewed: '', violetBackBtn: ''};
        this.model.addMovie(movie);

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
        clickedBtn.classList.toggle(VIOLET_BACKGROUND_COLOR_CLASSNAME);
    }

    _handlerViewDeleteStatus = (liNode, movieName) => {
        const movies = this.model.getMovies()
        liNode.style.display = 'none';
        for (let i = 0; i < movies.length; i++) {
            if (movies[i].name === movieName) {
                movies.splice(i, 1);
            }
        }
    }
}