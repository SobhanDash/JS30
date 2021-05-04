const movies = [
	"The Prestige",
	"A Star is Born",
	"The Conjuring",
	"Batman v Superman",
	"The Matrix",
	"A Bug's Life",
	"Star Wars",
	"Interstellar",
	"A Nightmare on Elm Street",
	"Fight Club",
	"Avengers: Endgame",
]

function reArrange(movieName) {
    return movieName.replace(/^('a'|'the'|'an')/i, '').trim();
}

const sortMovies = movies.sort(function(a,b){
    if(reArrange(a) > reArrange(b)) {
        return 1;
    }else{
        return -1;
    }
})

//console.log(sortMovies)

document.querySelector('#movies').innerHTML = sortMovies.map(movie => `<li>${movie}</li>`).join('');