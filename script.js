function fetchData(){
    fetch("http://www.omdbapi.com/?s=batman&apikey=ce941a34")
    .then(response => {
        if(!response.ok){
            throw Error("error");
        }
        return response.json()
    })
    .then(data => {
        console.log(data.Search)
        const html = data.Search.map(film => {
            return `
            <div class="films">
                <p><img src="${film.Poster}" alt="movie poster" /></p>
                <p>Title = ${film.Title}</p>
                <p>Year = ${film.Year}</p>
            </div>
            `
        }).join("")
        console.log(html)
        document
        .querySelector("#movies")
        .insertAdjacentHTML("afterbegin", html)
    })
    .catch(error => {
        console.log(error)
    })
}


fetchData()