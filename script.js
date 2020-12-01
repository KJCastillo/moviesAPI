function getMovies () {
  let textInput = document.getElementById('searchText').value
  console.log(textInput)
  axios.get('http://www.omdbapi.com?s=' + textInput + "&apikey=ce941a34")
    .then((response) => {
      let movies = response.data.Search;
      let output = '';
      $.each(movies, (index, film) => {
        output += `
            <div class="films">
                <li class="poster"><img src="${film.Poster}" alt="movie poster" /></li>
                <li class="titleLine">${film.Title} - released in ${film.Year}</li>
            </div>
          `;
      });
      $('#movies').html(output);
    })
    .catch((err) => {
      console.log(err);
    });
};

document.getElementById('searchText').addEventListener('keydown', event => {
  if (event.key === 'Enter' || event.key === 13) {
    return getMovies()
  }
});