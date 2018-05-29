if (!window.VueMovies) {
    window.VueMovies = {};
}

window.VueMovies.movieDetail = {
    data: function() {
	    return {  
		    movie: {}, 
		    mainImg: null,
		};
	},
    computed: {
	    imgUrl: function() {
	        if (!this.movie.img) {
	            return;
	        }
	        return `../../data${this.movie.img}`;
	    },
	    labelUrl: function() {
            if (!this.movie.label) {
                return;
            }
            return `../../data/${this.movie.label}`;
        }
	},
	mounted: function() {
	    this.getMovieDetail(this.$route.params.id);
	},
	watch: {
    	'$route' (to, from) {
        	this.getMovieDetail(to.params.id);
    	}
  	},
  	methods: {
        getMovieDetail: async function(id) {
            let fetchResult
            fetchResult = await fetch(`../data/movies/details/${id}.json`);
            if (fetchResult.status == 200) {
                this.movie = await fetchResult.json();
            }
            this.mainImg = `../../data/movies/${this.movie.img}`;
        },
        setImage: function(img) { 
            this.mainImg = `../../data/movies/${img}`;
        },
    },
    template:  `
		<div v-bind:id="movie.id" class="detail clearfix">
		    <a href="#/">
		    	<img class="pull-right back" src="../../img/back.png">
		    </a>
		    <h1 class="name">{{ movie.name }}</h1>
		    <img class="pull-right img" v-bind:src="mainImg">
		    <p class="description">{{ movie.description }}</p>

		    <ul class="specs">
			    <li>
			        <dl>
				        <dt>Année</dt>
				        <dd>{{movie.year}}</dd>
			        </dl>
			    </li>
			    <li>
			        <dl>
				        <dt>Durée</dt>
				        <dd>{{movie.duree}}</dd>
			        </dl>
			    </li>
			    <li>
			        <dl>
				        <dt>Age</dt>
				        <dd>{{movie.age}}</dd>
			        </dl>
			    </li>
			    <li>
			        <dl>
				        <dt>Genre</dt>
				        <dd>{{movie.genre}}</dd>
			        </dl>
			    </li>
			    <li>
			        <dl>
				        <dt>En salle</dt>
				        <dd>{{movie.salle}}</dd>
			        </dl>
			    </li>
			    <li>
			        <dl>
				        <dt>Plateforme de diffusion</dt>
				        <dd>{{movie.plateformeDiffusion}}</dd>
			        </dl>
			    </li>
			    <li>
			        <dl>
				        <dt>Note</dt>
				        <dd>{{movie.note}} étoile(s)</dd>
			        </dl>
			    </li>
		    </ul>
		</div>
    `,
};