//http://www.omdbapi.com/?i=tt3896198&apikey=6ad0be6f

async function main(){

    const title = await fetch('http://www.omdbapi.com/?i=tt3896198&apikey=6ad0be6f')
    const titleData = await title.json();
    console.log(
    titleData.map(
        (title) => `<div class="movie-card">
        <div class="movie-card-container">
            <h3>Movie Title</h3>
            <p><b>Year:</b></p>                        
            <img class="poster" src="https://m.media-amazon.com/images/M/MV5BNWE5MGI3MDctMmU5Ni00YzI2LWEzMTQtZGIyZDA5MzQzNDBhXkEyXkFqcGc@._V1_SX300.jpg">                        
        </div>
    </div>`
        
        )
    );    
}

main();