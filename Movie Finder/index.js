document.querySelector("button.buttonClass").addEventListener("click", function () {
  const movie = document.querySelector("input.search").value.trim();

  // Check if the search input is empty
  if (!movie) {
    alert("Please enter a movie title to search.");
    return;
  }

  fetch(`https://www.omdbapi.com/?s=${encodeURIComponent(movie)}&apikey=54e3a25d`)
    .then((response) => {
      if (!response.ok) throw new Error("Network response was not ok");
      return response.json();
    })
    .then((data) => {
      if (data.Response === "False") {
        alert("No movies found with that title.");
        return;
      }

      const searchResults = data.Search;
      // Clear previous search results
      document.querySelector("#display-section").innerHTML = "";

      searchResults.forEach((movie) => fetchMovieDetails(movie.imdbID));
    })
    .catch((error) => {
      console.error("Error fetching movies:", error);
      alert("Failed to fetch movie data. Please try again later.");
    });
});

function fetchMovieDetails(imdbID) {
  fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=54e3a25d`)
    .then((response) => {
      if (!response.ok) throw new Error("Network response was not ok");
      return response.json();
    })
    .then((imovie) => {
      displayMovie(imovie);
    })
    .catch((error) => {
      console.error("Error fetching movie details:", error);
    });
}

function displayMovie(imovie) {
  const movieCard = document.createElement("div");
  movieCard.classList.add("movie-cards");
  movieCard.innerHTML = `
    <div>
      <img src="${imovie.Poster !== "N/A" ? imovie.Poster : "default-placeholder.png"}" width="200" height="300" alt="${imovie.Title} Poster"/>
    </div>
    <div class="movie-info">
      <p>Title: <span class="info">${imovie.Title}</span></p>
      <p>Released: <span class="info">${imovie.Released}</span></p>
      <p>Director: <span class="info">${imovie.Director}</span></p>
      <p>Genre: <span class="info">${imovie.Genre}</span></p>
      <p>Language: <span class="info">${imovie.Language}</span></p>
    </div>
  `;
  document.querySelector("#display-section").appendChild(movieCard);
}
