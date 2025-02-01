const movieListEl = document.querySelector(".movie-list");
const paginationContainer = document.createElement("div");
paginationContainer.classList.add("pagination-container");
document.body.appendChild(paginationContainer);

const yearFilterEl = document.getElementById("yearFilter");
const titleSearchEl = document.getElementById("titleSearch");
const searchButtonEl = document.getElementById("searchButton");

let currentPage = 1;
const resultsPerPage = 6;
const apiKey = "87ddb14a";
let searchQuery = "Avengers"; // Default search term
let selectedYear = ""; // Stores the selected year filter

async function fetchMovies(page, query, year) {
    let url = `https://omdbapi.com/?s=${query}&page=${page}&apikey=${apiKey}`;
    
    if (year) {
        url += `&y=${year}`;
    }
    
    const response = await fetch(url);
    const movieData = await response.json();
    return movieData.Response === "True" ? movieData.Search : [];
}

async function renderMovies(page) {
    const movies = await fetchMovies(page, searchQuery, selectedYear);
    movieListEl.innerHTML = ""; // Clear existing content

    if (movies.length > 0) {
        movieListEl.innerHTML = movies
            .slice(0, resultsPerPage)
            .map(
                (movie) => `
                <div class="movie-card">
                    <div class="movie-card-container">
                        <h3>${movie.Title}</h3>
                        <p><b>Year:</b> ${movie.Year}</p>
                        <img src="${movie.Poster}" alt="${movie.Title}">
                    </div>
                </div>
            `
            )
            .join("");
    } else {
        movieListEl.innerHTML = "<p>No movies found</p>";
    }

    renderPagination();
}

function renderPagination() {
    paginationContainer.innerHTML = ""; // Clear existing buttons

    if (currentPage > 1) {
        const prevButton = document.createElement("button");
        prevButton.textContent = "Previous";
        prevButton.addEventListener("click", () => {
            currentPage--;
            renderMovies(currentPage);
        });
        paginationContainer.appendChild(prevButton);
    }

    const nextButton = document.createElement("button");
    nextButton.textContent = "Next";
    nextButton.addEventListener("click", () => {
        currentPage++;
        renderMovies(currentPage);
    });
    paginationContainer.appendChild(nextButton);
}

// Event Listener for Year Filter
yearFilterEl.addEventListener("change", () => {
    selectedYear = yearFilterEl.value;
    currentPage = 1;
    renderMovies(currentPage);
});

// Event Listener for Search by Title
searchButtonEl.addEventListener("click", () => {
    const query = titleSearchEl.value.trim();
    if (query) {
        searchQuery = query;
        currentPage = 1;
        renderMovies(currentPage);
    }
});

// Initial render
renderMovies(currentPage);

function populateYearFilter() {
    const yearFilterEl = document.getElementById("yearFilter");
    const currentYear = new Date().getFullYear();
    const startYear = 1950; // Adjust as needed

    yearFilterEl.innerHTML = `<option value="">All</option>`; // Default "All" option

    for (let year = currentYear; year >= startYear; year--) {
        let option = document.createElement("option");
        option.value = year;
        option.textContent = year;
        yearFilterEl.appendChild(option);
    }
}

// Populate year filter on page load
document.addEventListener("DOMContentLoaded", () => {
    populateYearFilter();
    searchQuery = "Avengers"; // Default search term
    renderMovies(currentPage);
});


// Set a default search term (e.g., "Avengers" or another popular title)
let searchMain = "Avengers"; // Change this to any default movie

// Load movies when the page first loads
document.addEventListener("DOMContentLoaded", () => {
    renderMovies(currentPage);
});

titleSearchEl.addEventListener("input", () => {
    // Get the current query from the input field
    const query = titleSearchEl.value.trim();
    // Update the global searchQuery variable
    searchQuery = query;
    // Reset pagination to the first page
    currentPage = 1;
    // Render movies based on the new query
    renderMovies(currentPage);
});


function debounce(func, delay) {
    let timeout;
    return function(...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), delay);
    };
  }

  titleSearchEl.addEventListener("input", debounce(() => {
    const query = titleSearchEl.value.trim();
    searchQuery = query;
    currentPage = 1;
    renderMovies(currentPage);
}, 300)); // Adjust delay as needed (300ms in this example)
 