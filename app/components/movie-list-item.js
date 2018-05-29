if (!window.VueMovies) {
    window.VueMovies = {};
}

window.VueMovies.movieListItem = {
	props: [ 'name','year','img','id','description','duree','age','genre','salle','plateformeDiffusion','note'],
    data: function() {
        return {   
        };
    },
    computed: {
	    imgUrl: function() {
	        if (!this.img) {
	            return;
	        }
	        return `../data/movies${this.img}`;
	    },
	    detailUrl: function() {
            if (!this.id) {
                return '/';
            }
            return `/movie/${this.id}`
        }
	},
    template:  `
		<div v-bind:id="id" class="clearfix">
			<router-link v-bind:to="detailUrl">
			    <img class="float-right el-img" v-bind:src="imgUrl">
			    <h2 class="el-name">{{ name }}</h2>
		    </router-link>
		</div>
    `
};