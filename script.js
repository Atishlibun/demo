document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const movieResults = document.getElementById('movieResults');

    searchButton.addEventListener('click', () => {
        const searchTerm = searchInput.value.trim();
        if (searchTerm === 'all' || searchTerm === '') {
            displayAllMovies();
        } else {
            searchMovies(searchTerm);
        }
    });

    function searchMovies(query) {
        const apiUrl = `https://my-json-server.typicode.com/horizon-code-academy/fake-movies-api/movies`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data)) {
                    const filteredMovies = filterMoviesByFirstThreeLetters(data, query);
                    displayMovies(filteredMovies);
                } else {
                    displayNotFoundMessage();
                }
            })
            .catch(error => console.error(error));
    }

    function filterMoviesByFirstThreeLetters(movies, query) {
        const queryLowerCase = query.toLowerCase().substring(0, 3);
        
        return movies.filter(movie => movie.Title.toLowerCase().substring(0, 3) === queryLowerCase);
    }

    function displayAllMovies() {
        const apiUrl = `https://my-json-server.typicode.com/horizon-code-academy/fake-movies-api/movies`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data)) {
                    displayMovies(data);
                } else {
                    displayNotFoundMessage();
                }
            })
            .catch(error => console.error(error));
    }

    function displayMovies(movies) {
        movieResults.innerHTML = '';

        if (movies.length === 0) {
            displayNotFoundMessage();
        } else {
            movies.forEach(movie => {
                const movieCard = document.createElement('div');
                movieCard.classList.add('movie-card');

                const poster = movie.Poster === 'N/A' ? 'no-poster.jpg' : movie.Poster;

                movieCard.innerHTML = `
                    <img class="movie-poster" src="${poster}" alt="${movie.Title} poster">
                    <div class="movie-details">
                        <h2 class="movie-title">${movie.Title}</h2>
                        <p class="movie-year">Year: ${movie.Year}</p>
                    </div>
                `;

                movieCard.addEventListener('click', () => {
                    alert(`Title: ${movie.Title}\nYear: ${movie.Year}`);
                });

                movieResults.appendChild(movieCard);
            });
        }
    }

    function displayNotFoundMessage() {
        movieResults.innerHTML = '<p>No results found.</p>';
    }
});
