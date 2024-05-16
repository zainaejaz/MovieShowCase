const movData = document.getElementById("modal");
const input = document.getElementById("searchMov");
const searcBtn = document.getElementById("searcBtn");

async function getMovie(movie) {
  const res = await fetch(
    `https://www.omdbapi.com/?t=${movie}&apikey=9b010102`
  );

  const data = await res.json();

  if (data.Response === "True") {
    movData.innerHTML = `
        <div class="text-center">
          <img src=${data.Poster} class="rounded" alt="nothing">
        </div>
        <div>
          <ul class="mt-5 mb-5 text p-5" style="background-color: #700e0e">
            <li>Title: ${data.Title}:</li>
            <li>Released: ${data.Released}</li>
            <li>Runtime: ${data.Runtime}</li>
            <li>Genre: ${data.Genre}</li>
            <li>Actors: ${data.Actors}</li>
            <li>Plot: ${data.Plot}</li>
            <li>Language: ${data.Language}</li>
          </ul>
        

        </div>`;
  } else {
    movData.innerHTML = `
        <div class="container mt-5">
          <h1 class="errMsg">Movie not found</h1>
        </div>
  `;
  }
}

searcBtn.addEventListener("click", function (e) {
  e.preventDefault();
  let getData = input.value;
  getMovie(getData);
});
