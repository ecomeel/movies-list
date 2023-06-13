const newMovieInputNode = document.getElementById('addMovieInput');
const newMovieBtnNode = document.getElementById('addMovieBtn');
const moviesListNode = document.getElementById('moviesList');
const viewedMovieBtn = document.getElementsByClassName('movie__check-view');
const deleteMovieBtn = document.getElementsByClassName('movie__delete');

const movies = [];

const getMovieFromUser = () => {
    const newMovieName = newMovieInputNode.value;
    const indexMovie = getMovies().length;
    newMovieInputNode.value = '';
    return {
        // index: indexMovie,
        viewed: '',
        name: newMovieName,
        deleted: false
    };
}

const addMovie = (newMovie) => {
    movies.push(newMovie);
}

const getMovies = () => {
    return movies;
}

const viewedMovie = () => {
    for (let i = 0; i < viewedMovieBtn.length; i++) {
        viewedMovieBtn[i].addEventListener('click', function() {
            viewedMovieBtn[i].parentElement.classList.toggle('movie_viewed');
            viewedMovieBtn[i].childNodes[1].classList.add('violet-bck')
            console.log(viewedMovieBtn[i].children)
            movies[i].viewed = 'movie_viewed';
            // 
        })
    }
}

const deleteMovie = () => {
    for (let i = 0; i < deleteMovieBtn.length; i++) {
        deleteMovieBtn[i].addEventListener('click', () => {
            deleteMovieBtn[i].parentElement.classList.add('movie_none');
            movies[i].deleted = 'deleted';
            movies.splice(i, 1);

        })
        
    }
}

const renderMovies = () => {
    let moviesHTML = '';
    const moviesList = getMovies();

    moviesList.forEach(movie => {
        // if (movie.deleted == 'deleted') {
        //     return
        // }
        moviesHTML = moviesHTML + `
            <li class='movie ${movie.viewed}'>
                <button class='movie__check-view'>
                    <img src="img/circle.png" alt="">
                </button>
                <p class='movie__name'>${movie.name}</p>
                <button class='movie__delete'>
                    <img src="img/cross.png" alt="">
                </button>
            </li>
        `;

    });

    moviesListNode.innerHTML = moviesHTML;

}



const newMovieHandler = () => {
    const newMovie = getMovieFromUser();
    addMovie(newMovie);
    renderMovies();
    viewedMovie();
    deleteMovie();
    console.log(movies)

}

newMovieBtnNode.addEventListener('click', newMovieHandler);




