

function getMovies () {
  let textInput = document.getElementById('searchText').value
  console.log("textInput:",textInput)
  axios.get('https://www.omdbapi.com?s=' + textInput + "&apikey=ce941a34")
    .then((response) => {
      let movies = response.data.Search;
      let output = '';
      $.each(movies, (index, film) => {
        output += `
            <div class="films">
                <li class="poster"><img src="${film.Poster}" alt="movie poster" /></li>
                <li class="titleLine">${film.Title} - released in ${film.Year}</li>
                <button onclick="movieSelected('${film.imdbID}')" class="btn btn-details btn-primary" type="button" href="#"><i class="fas fa-info-circle fa-xs"></i></button>
            </div>
          `;
      });
      $('#movies').html(output);
    })
    .catch((err) => {
      console.log(err);
    });
};
var eventTarget = document.getElementById('searchText')
eventTarget.addEventListener("keydown", event => {
  if (event.isComposing || event.keyCode === 13) {
    event.preventDefault()
    console.log(eventTarget.value)
    axios.get('https://www.omdbapi.com?s=' + eventTarget.value + "&apikey=ce941a34")
    .then((response) => {
      let movies = response.data.Search;
      let output = '';
      $.each(movies, (index, film) => {
        output += `
            <div class="films">
                <li class="poster"><img src="${film.Poster}" alt="movie poster" /></li>
                <li class="titleLine">${film.Title} - released in ${film.Year}</li>
                <button onclick="movieSelected('${film.imdbID}')" class="btn btn-details btn-primary" type="button" href="#"><i class="fas fa-info-circle fa-xs"></i></button>
            </div>
          `;
      });
      let listItem = document.querySelector('#movies')
    listItem.innerHTML = output
    })
    .catch((err) => {
      console.log(err);
    });
  }
});


// document.getElementById('searchText').addEventListener('keydown', event => {
//   if (event.key === 'Enter' || event.key === 13) {
//     return getMovies()
//   }
// });

function movieSelected(id){
  sessionStorage.setItem('movieId', id);
  window.location = 'movie.html';
  return false;
}

function getFilm(){
  let movieId = sessionStorage.getItem('movieId');

  axios.get('https://www.omdbapi.com?i='+ movieId + "&apikey=ce941a34")
    .then((response) => {
      console.log(response);
      let film = response.data;

      let output =`
        <div class="row">
          <div class="col-md-4">
            <img src="${film.Poster}" class="thumbnail">
          </div>
          <div class="plotbkg col-md-8">
            <ul class="list-group">
              <li class="list-group-item"><strong>Title:</strong> <h2>${film.Title}</h2></li>
              <li class="list-group-item"><strong>Plot:</strong> ${film.Plot}</li>
              <li class="list-group-item"><strong>Genre:</strong> ${film.Genre}</li>
              <li class="list-group-item"><strong>Rated:</strong> ${film.Rated}</li>
              <li class="list-group-item"><strong>IMDB Rating:</strong> ${film.imdbRating}</li>
              <li class="list-group-item"><strong>Director:</strong> ${film.Director}</li>
              <li class="list-group-item"><strong>Actors:</strong> ${film.Actors}</li>
              <li class="list-group-item"><strong>Writer:</strong> ${film.Writer}</li> 
            </ul>
          </div>
        </div>
        <div class="row">
          <div class="well2">
            <a href="http://imdb.com/title/${film.imdbID}" target="_blank" class="btn btn-primary">View IMDB</a>
            <a href="index.html" class="btn btn-success">Go Back To Search</a>
          </div>
        </div>
      `;

      let listItem = document.querySelector('#movies')
    listItem.innerHTML = output
    })
    .catch((err) => {
      console.log(err);
    });
}