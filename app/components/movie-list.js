if (!window.VueMovies) {
    window.VueMovies = {};
}

window.VueMovies.movieList = {
    data: function() {
        return {
            filterName: '',
            filterGenre: '',
            filterPlateformeDiffusion: '',
            filterSalle: '',
            filterNote: '',
            movies:[], 
        };
    },
    computed: {
        homePage: function() {
            return `/home`
        },
        seriesPage: function() {
            return `/series`
        }
    },
    methods: {
        filteredList: function (movies,filterName,filterGenre,filterPlateformeDiffusion,filterSalle,filterNote) {
            if (!filterName && !filterGenre && !filterPlateformeDiffusion && !filterNote && !filterSalle 
                || document.getElementById("listBoxGenre").selectedIndex==0 
                || document.getElementById("listBoxPlateformeDiffusion").selectedIndex==0) {
                return  [ ... movies];
            }
            if(filterName){
                return movies.filter((movie) => {return movie.name.match(new RegExp(filterName, 'i'));})
            }
            if(filterGenre){
                return movies.filter((movie) => {return movie.genre.match(genreSelected());})
            }
            if(filterSalle){
                return movies.filter((movie) => {return movie.salle.match(salleChecked());})
            }
            if(filterPlateformeDiffusion){
                return movies.filter((movie) => {return movie.plateformeDiffusion.match(plateformeDiffusionSelected());})
            }
            if(filterNote){
                return movies.filter((movie) => {return movie.note.match(noteSelected());})
            }
            
        },
    },
    created: async function() {
        let fetchResult
        fetchResult = await fetch('../data/movies/movies.json');
        if (fetchResult.status == 200) {
            this.movies = await fetchResult.json();
        }
    },
    template: `
    <div class="container">
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
          <a class="navbar-brand" href="#">WHICH WATCHER</a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarColor02">
            <ul class="navbar-nav mr-auto" mt-2 mt-lg-0>
                <li class="nav-item active">
                    <router-link v-bind:to="homePage">
                        <a class="nav-link" id="homePage" data-toggle="tab" href="#home" role="tab" aria-selected="false"><span class="fa fa-home"></span></a>
                    </router-link>
                </li>
                <li class="nav-item">
                    <a class="nav-link" id="filmsPage" data-toggle="tab" href="#films" role="tab" aria-selected="false">FILMS</a>
                </li>
                <li class="nav-item">
                    <router-link v-bind:to="seriesPage">
                        <a class="nav-link" id="seriesPage" data-toggle="tab" href="#series" role="tab" aria-selected="false">SÉRIES</a>
                    </router-link>
                </li>
            </ul>
            <form class="form-inline my-2 my-lg-0">
                <input id="searchInput" class="searchInput" v-model="filterName" placeholder="Search">
            </form>
            <ul class="nav navbar-nav navbar-right">
                <li class="nav-item">
                    <a class="nav-link" id="signUpPage" data-toggle="tab" href="#signUpPage" role="tab" aria-selected="false"><span class="fa fa-user"></span></a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" id="loginPage" data-toggle="tab" href="#loginPage" role="tab" aria-selected="false"><span class="fa fa-sign-in"></span></a>
                </li>
            </ul>
          </div>
        </nav>

        <div class="row">
            <div class="sidebar col-md-2">
                <div class="form-group">
                    <select class="form-control" id="listBoxGenre" v-model="filterGenre" onChange="genreSelected()">
                        <option>Genre</option>
                        <option>Action</option>
                        <option>Animation</option>
                        <option>Aventure</option>
                        <option>Biographique</option>
                        <option>Catastrophe</option>
                        <option>Comédie</option>
                        <option>Documentaire</option>
                        <option>Dramatique</option>
                        <option>Espionnage</option>
                        <option>Fantastique</option>
                        <option>Historique</option>
                        <option>Horreur</option>
                        <option>Musical</option>
                        <option>Policier</option>
                        <option>Romantique</option>
                        <option>Science fiction</option>
                        <option>Thriller</option>
                        <option>Western</option>
                    </select>
                </div>
                <div class="form-group">
                    <select class="form-control" id="listBoxPlateformeDiffusion" selectedIndex=0 v-model="filterPlateformeDiffusion" onChange="plateformeDiffusionSelected()">
                        <option>Plateforme de diffusion</option>
                        <option>Netflix</option>
                        <option>OCS</option>
                        <option>Amazon Prime Vidéos</option>
                        <option>SFR Play</option>
                        <option>Canal Play</option>
                        <option>Itunes</option>
                        <option>Google Play Movies</option>
                    </select>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" value="" id="checkBoxVF" onClick="VFChecked()">
                  <label class="form-check-label" for="checkBoxVF">VF</label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" value="" id="checkBoxVOSTFR" onClick="VOSTFRChecked()">
                  <label class="form-check-label" for="checkBoxVOSTFR">VOSTFR</label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" value="" id="checkBoxEnSalle" v-model="filterSalle" onClick="salleChecked()">
                  <label class="form-check-label" for="checkBoxEnSalle">En salle</label>
                </div>
                <div class="form-group">
                    <label for="formControlRange">Note (★)</label>
                    <input type="range" class="form-control-range" value="1" min="0" max="5" step="1" list="tickmarks" id="noteRange" v-model="filterNote" onChange="noteSelected()">
                    <datalist id="tickmarks">
                      <option value="0"></option>
                      <option value="1"></option>
                      <option value="2"></option>
                      <option value="3"></option>
                      <option value="4"></option>
                      <option value="5"></option>
                    </datalist>
                </div>
            </div>
            <div class="col-md-10">
                <div class="movie" v-for="movie in filteredList(movies,filterName,filterGenre,filterPlateformeDiffusion,filterSalle,filterNote)"">
                    <movie-list-item 
                        v-bind:id='movie.id'
                        v-bind:name='movie.name'
                        v-bind:year='movie.year'
                        v-bind:description='movie.description'
                        v-bind:img='movie.img'>
                    </movie-list-item>
                </div>
            </div>
        </div>
    </div> 
    `
}; 

// FONCTIONS -----------------------------------------------------------------------

function genreSelected () {
    genre = document.getElementById("listBoxGenre");
    return genre.value;
}
function plateformeDiffusionSelected () {
    plateformeDiffusion = document.getElementById("listBoxPlateformeDiffusion");
    return plateformeDiffusion.value;
}
function salleChecked () {
    salle = document.getElementById("checkBoxEnSalle");
    if(salle.checked == true){
        return "Oui";
    }
    else if (salle.checked == false){
        return "Non";
    }  
}
function VFChecked () {
    if(checkBoxVF.checked == true){
        console.log("VF");
    } else {
        console.log("Not VF")
    }
}
function VOSTFRChecked () {
    if(checkBoxVOSTFR.checked == true){
        console.log("VOSTFR");
    } else {
        console.log("Not VOSTFR")
    }
}
function noteSelected () {
    note = document.getElementById("noteRange");
    return note.value;
}
