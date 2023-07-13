class Storage {
    constructor() {}

    saveMoviesToStorage(movies) {
        const moviesString = JSON.stringify(movies);
        localStorage.setItem(STORAGE_MOVIES_LABEL, moviesString);
    }

    getMoviesFromStorage() {
        const moviesFromStorageString =
            localStorage.getItem(STORAGE_MOVIES_LABEL);
        const moviesFromStorage = JSON.parse(moviesFromStorageString);
        return moviesFromStorage;
    }
}
