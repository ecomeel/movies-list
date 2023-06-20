const VIEW_BTN_CLASSNAME = 'movie__check-view';
const VIEWED_MOVIE_CLASSNAME = 'movie_viewed';
const DELETE_BTN_CLASSNAME = 'movie__delete';
const VIOLET_BACKGROUND_COLOR_CLASSNAME = 'violet-back'
const EMPTY_INPUT_ERROR_CLASSNAME = 'red-border';
const STORAGE_MOVIES_LABEL = 'movies';

const newMovieInputNode = document.getElementById('addMovieInput');
const newMovieBtnNode = document.getElementById('addMovieBtn');
const moviesListNode = document.getElementById('moviesList');

let movies = [];

const initMovies = () => {
    if (Array.isArray(getMoviesFromStorage())) {
        movies = getMoviesFromStorage();
    }
    renderMovies();
}

const saveMoviesToStorage = () => {
    const moviesString = JSON.stringify(getMovies());
    localStorage.setItem(STORAGE_MOVIES_LABEL, moviesString);
}

const getMoviesFromStorage = () => {
    const moviesFromStorageString = localStorage.getItem(STORAGE_MOVIES_LABEL);
    const moviesFromStorage = JSON.parse(moviesFromStorageString);
    return moviesFromStorage;
}

const clearInput = () => {
    newMovieInputNode.value = '';
}

const getNewMovieFromUser = () => {
    const newMovieName = newMovieInputNode.value;
    clearInput();
    return {name: newMovieName, viewed: '', violetBackBtn: ''};
}

const getMovies = () => {
    return movies;
}

const addMovie = (movie) => {
    const moviesList = getMovies();
    moviesList.push(movie);
}

const isEmptyInput = (input) => {
    if (!input) return true
    else return false;
}

const isClickedViewBtn = (viewBtn) => {
    if (viewBtn.classList.contains(VIEW_BTN_CLASSNAME)) return true
    else return false
}

const isClickedDeleteBtn = (deleteBtn) => {
    if (deleteBtn.className === DELETE_BTN_CLASSNAME) return true
    else return false
}

const validation = (newMovie) => {
    if (isEmptyInput(newMovie)) {
        newMovieInputNode.classList.add(EMPTY_INPUT_ERROR_CLASSNAME);
        return false
    }
    newMovieInputNode.classList.remove(EMPTY_INPUT_ERROR_CLASSNAME);
    return true
}

const changeViewStatus = (viewBtn, liNode, movieName) => {
    const movies = getMovies();

    if (liNode.classList.contains(VIEWED_MOVIE_CLASSNAME)) {
        movies.forEach(movie => {
            if (movie.name === movieName) {
                movie.viewed = '';
                movie.violetBackBtn = '';
            }
        });
    } else {
        movies.forEach(movie => {
            if (movie.name === movieName) {
                movie.viewed = VIEWED_MOVIE_CLASSNAME;
                movie.violetBackBtn = VIOLET_BACKGROUND_COLOR_CLASSNAME;
            }
        });
    }
    liNode.classList.toggle(VIEWED_MOVIE_CLASSNAME);
    viewBtn.classList.toggle(VIOLET_BACKGROUND_COLOR_CLASSNAME);
    saveMoviesToStorage()
}

const deleteMovie = (liNode, movieName) => {
    const movies = getMovies()

    liNode.style.display = 'none';
    for (let i = 0; i < movies.length; i++) {
        if (movies[i].name === movieName) {
            movies.splice(i, 1);
        }
    }
    saveMoviesToStorage()
}

const renderMovies = () => {
    let moviesHTML = '';
    const movies = getMovies();

    movies.forEach(movie => {
        moviesHTML =  `
            <li class='movie ${movie.viewed}'>
                 <button class='movie__check-view ${movie.violetBackBtn}'></button>
                 <p class='movie__name'>${movie.name}</p>
                 <button class='movie__delete'>
                </button>
             </li>
        ` + moviesHTML;
    });

    moviesListNode.innerHTML = moviesHTML;

}

const newMovieHandler = () => {
    const newMovie = getNewMovieFromUser();
    if (!validation(newMovie.name)) return;
    addMovie(newMovie);

    saveMoviesToStorage();

    renderMovies();
}

const movieEventsHandler = (event) => {
    const btnClicked = event.target;
    const liNode = btnClicked.closest('li');
    const movieName = liNode.querySelector('.movie__name').innerText;

    if (isClickedViewBtn(btnClicked)) {
        changeViewStatus(btnClicked, liNode, movieName);
    }

    if (isClickedDeleteBtn(btnClicked)) {
        deleteMovie(liNode, movieName);
    }
}

initMovies()

newMovieBtnNode.addEventListener('click', newMovieHandler);
moviesListNode.addEventListener('click', movieEventsHandler)
