// const newMovieInputNode = document.getElementById('addMovieInput');
// const newMovieBtnNode = document.getElementById('addMovieBtn');
// const moviesListNode = document.getElementById('moviesList');
// const viewedMovieBtn = document.getElementsByClassName('movie__check-view');
// const deleteMovieBtn = document.getElementsByClassName('movie__delete');

// const movies = [];

// const getMovieFromUser = () => {
//     const newMovieName = newMovieInputNode.value;
//     newMovieInputNode.value = '';
//     return {
//         viewed: '',
//         name: newMovieName,
//         deleted: false
//     };
// }

// const addMovie = (newMovie) => {
//     movies.push(newMovie);
// }

// const getMovies = () => {
//     return movies;
// }

// const viewedMovie = () => {
//     for (let i = 0; i < viewedMovieBtn.length; i++) {
//         viewedMovieBtn[i].addEventListener('click', function() {
//             viewedMovieBtn[i].parentElement.classList.toggle('movie_viewed');
//             viewedMovieBtn[i].childNodes[1].classList.add('violet-bck')
//             console.log(viewedMovieBtn[i].children)
//             movies[i].viewed = 'movie_viewed';
//         })
//     }
// }

// const deleteMovie = () => {
//     for (let i = 0; i < deleteMovieBtn.length; i++) {
//         deleteMovieBtn[i].addEventListener('click', () => {
//             deleteMovieBtn[i].parentElement.classList.add('movie_none');
//             movies[i].deleted = 'deleted';
//             movies.splice(i, 1);

//         })
        
//     }
// }

// const renderMovies = () => {
//     let moviesHTML = '';
//     const moviesList = getMovies();

//     moviesList.forEach(movie => {
//         // if (movie.deleted == 'deleted') {
//         //     return
//         // }
//         moviesHTML = moviesHTML + `
//             <li class='movie ${movie.viewed}'>
//                 <button class='movie__check-view'>
//                     <img src="img/circle.png" alt="">
//                 </button>
//                 <p class='movie__name'>${movie.name}</p>
//                 <button class='movie__delete'>
//                     <img src="img/cross.png" alt="">
//                 </button>
//             </li>
//         `;

//     });

//     moviesListNode.innerHTML = moviesHTML;

// }



// const newMovieHandler = () => {
//     const newMovie = getMovieFromUser();
//     addMovie(newMovie);
//     renderMovies();
//     viewedMovie();
//     deleteMovie();
//     console.log(movies)

// }

// newMovieBtnNode.addEventListener('click', newMovieHandler);


const newMovieInputNode = document.getElementById('addMovieInput');
const newMovieBtnNode = document.getElementById('addMovieBtn');
const moviesListNode = document.getElementById('moviesList');

const movies = [];

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

const isEmptyInput = (input) => {
    if (!input) return true
    else return false;
}

const newMovieHandler = () => {
    const newMovie = getNewMovieFromUser();

    if (isEmptyInput(newMovie.name)) {
        newMovieInputNode.classList.add('red-border');
        return
    }
    newMovieInputNode.classList.remove('red-border');

    addMovie(newMovie);
    renderMovies();
}

const movieHandler = (event) => {
    const btnClicked = event.target;
    const li = btnClicked.closest('li');
    const movieNameNode = li.querySelector('.movie__name');

    const movies = getMovies();
    
    // if clicked check-view btn
    if (btnClicked.classList.contains('movie__check-view')) {

        if (li.classList.contains('movie_viewed')) {
            movies.forEach(movie => {
                if (movie.name === movieNameNode.innerText) {
                    movie.viewed = '';
                    movie.violetBackBtn = '';
                }
            });
        } else {
            movies.forEach(movie => {
                if (movie.name === movieNameNode.innerText) {
                    movie.viewed = 'movie_viewed';
                    movie.violetBackBtn = 'violet-back';
                }
            });
        }
        
        li.classList.toggle('movie_viewed');
        btnClicked.classList.toggle('violet-back')
    }

    // if clicked delete btn
    if (btnClicked.className === 'movie__delete') {
        li.style.display = 'none';
        for (let i = 0; i < movies.length; i++) {
            if (movies[i].name === movieNameNode.innerText) {
                movies.splice(i, 1);
            }
        }
        console.log(movies)
    }

    console.log(event.target.closest('li'))
}

newMovieBtnNode.addEventListener('click', newMovieHandler);
moviesListNode.addEventListener('click', movieHandler)
