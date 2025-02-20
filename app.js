const movData = document.getElementById("modal");
const input = document.getElementById("searchMov");
const searcBtn = document.getElementById("searcBtn");

// Pre-defined list of movie titles
const movieList = [
  "Inception",
  "The Dark Knight",
  "Interstellar",
  "Avengers: Endgame",
  "Titanic",
  "The Matrix",
  "Pulp Fiction",
  "Forrest Gump",
  "The Shawshank Redemption",
  "The Godfather",
  "Gladiator",
  "The Lion King",
  "Joker",
  "Black Panther",
  "Parasite",
];

// Fetch and display movie details
async function getMovie(movie) {
  const res = await fetch(
    `https://www.omdbapi.com/?t=${movie}&apikey=9b010102`
  );

  const data = await res.json();

  if (data.Response === "True") {
    // Create a movie card using Bootstrap classes
    return `
    <div class="card m-3 bg-custom" style="width: 18rem;">
  <img src="${data.Poster}" class="mt-2 card-img-top" alt="...">
  <div class="card-body mt-2">
    <h5 class="card-title">
    <strong> Title</strong>${data.Title}</h5>
    <p class="card-text">
              <strong>Released:</strong> ${data.Released}<br>
              <strong>Genre:</strong> ${data.Genre}<br>
              <strong>Actors:</strong> ${data.Actors}
            </p>
  </div>
</div>

    `;
  } else {
    console.error(`Could not fetch movie: ${movie}`);
    return `
      <div class="col-md-12 mb-4 text-center">
        <h5 class="text-danger">Movie not found: ${movie}</h5>
      </div>
    `;
  }
}

// Display 10 random movies when the page loads
async function displayRandomMovies() {
  movData.innerHTML = ""; // Clear existing content
  const shuffledMovies = movieList.sort(() => 0.5 - Math.random()); // Shuffle the list
  const randomMovies = shuffledMovies.slice(0, 10); // Pick the first 10 movies

  let movieCards = ""; // To store all movie cards
  for (let movie of randomMovies) {
    movieCards += await getMovie(movie);
  }

  // Wrap the movie cards in a Bootstrap row
  movData.innerHTML = `<div class="row justify-content-center">${movieCards}</div>`;

  // Save the random movies in the browser history
  history.pushState({ random: true }, null, window.location.href);
}

// Search for a specific movie
searcBtn.addEventListener("click", async function (e) {
  e.preventDefault();
  const searchQuery = input.value.trim();
  if (searchQuery) {
    movData.innerHTML = ""; // Clear previous results
    const searchResult = await getMovie(searchQuery);
    // Center the result
    movData.innerHTML = `
      <div class="row justify-content-center">
        ${searchResult}
      </div>
    `;

    // Save the search query in the browser history
    history.pushState({ search: searchQuery }, null, window.location.href);
  }
});

// Handle browser back/forward navigation
window.addEventListener("popstate", (event) => {
  if (event.state?.random) {
    // Display random movies again
    displayRandomMovies();
    input.value = "";
  } else if (event.state?.search) {
    // Display the previous search result
    const searchQuery = event.state.search;
    getMovie(searchQuery).then((searchResult) => {
      movData.innerHTML = `
        <div class="row justify-content-center">
          ${searchResult}
        </div>
      `;
    });
  }
});

// Call the function to display random movies on page load
displayRandomMovies();
