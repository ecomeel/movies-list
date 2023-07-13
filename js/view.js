class View {
    constructor({
        onNewMovieChanged,
        onViewStatusChanged,
        onDeleteStatusChanged,
    }) {
        this.newMovieInputNode = document.getElementById("addMovieInput");
        this.newMovieBtnNode = document.getElementById("addMovieBtn");
        this.moviesListNode = document.getElementById("moviesList");

        this.onNewMovieChanged = onNewMovieChanged;
        this.onViewStatusChanged = onViewStatusChanged;
        this.onDeleteStatusChanged = onDeleteStatusChanged;

        this.newMovieBtnNode.addEventListener("click", this._handlerNewMovie);
        this.moviesListNode.addEventListener("click", this._handlerMovieEvents);
    }

    clearInput() {
        this.newMovieInputNode.value = "";
    }

    getNewMovieFromUser() {
        return this.newMovieInputNode.value
    }

    isInputEmpty(input) {
        if (!input) return true;
        else return false;
    }

    validation(newMovie) {
        if (this.isInputEmpty(newMovie)) {
            this.newMovieInputNode.classList.add(EMPTY_INPUT_ERROR_CLASSNAME);
            console.log('ошибка')
            return false;
        }
        this.newMovieInputNode.classList.remove(EMPTY_INPUT_ERROR_CLASSNAME);
        return true;
    }

    renderMovies(movies) {
        let moviesHTML = "";

        movies.forEach((movie) => {
            moviesHTML =
                `
            <li class='movie ${movie.viewed}'>
                 <button class='movie__check-view ${movie.violetBackBtn}'></button>
                 <p class='movie__name'>${movie.name}</p>
                 <button class='movie__delete'>
                </button>
             </li>
        ` + moviesHTML;
        });

        this.moviesListNode.innerHTML = moviesHTML;
    }

    isClickedViewBtn(viewBtn) {
        if (viewBtn.classList.contains(VIEW_BTN_CLASSNAME)) return true;
        else return false;
    }

    isClickedDeleteBtn(deleteBtn) {
        if (deleteBtn.className === DELETE_BTN_CLASSNAME) return true;
        else return false;
    }

    _handlerMovieEvents = (event) => {
        const clickedBtn = event.target;
        const liNode = clickedBtn.closest("li");
        const movieName = liNode.querySelector(".movie__name").innerText;

        if (this.isClickedViewBtn(clickedBtn)) {
            this.onViewStatusChanged(clickedBtn, liNode, movieName);
        }

        if (this.isClickedDeleteBtn(clickedBtn)) {
            this.onDeleteStatusChanged(liNode, movieName);
        }
    };

    _handlerNewMovie = () => {
        const newMovie = this.getNewMovieFromUser();
        this.clearInput()

        if (!this.validation(newMovie)) return;

        this.onNewMovieChanged(newMovie);
    };
}
