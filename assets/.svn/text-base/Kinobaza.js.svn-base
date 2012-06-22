KB = {
    show: 'table',  // table OR grid
    //browse?fields_mask=35&type=movie&imdb_rating_min=6&imdb_rating_voted_min=4000&year_min=2011&sort=1&limit=50
	url: 'http://api.kinobaza.tv',
	browse: '/films/browse',
	search: '/films/search',
	data: {
	    fields_mask:35,
	    type: 'movie',
	    imdb_rating_min: 6,
	    imdb_rating_max: 10,
	    imdb_rating_voted_min: 3000,
	    year_min: 2000,
	    year_max: 2011,
	    sort: 1,
	    limit: 50,
	    genres: 0
	},
	found: [],
	query: '',
	
	clean: function(q){
		q = encodeURIComponent(q);
		return q;
	},
	
	getPoster: function(id, w) {
	   return 'http://media.kinobaza.tv'+'/films/'+id+'/poster/207.jpg';  
	},
	
    getMovies: function(opts) {
        showLoader();
        $('#sources, #result, #video, #kinobaza').hide();
        $.extend(this.data, opts);
        $.get(this.url+this.browse, this.data, function(r){
            KB.draw(r, '#kinobaza');
            $('#kinobaza .poster, #kinobaza h3').click(function(){
                var movie = $(this).closest('.movie');
                KB.drawDesc(movie);
                VK.findVideo(movie.attr('data-name'), movie.attr('data-dur'));
            });
        }) ;
    },
    
    findMovie: function(q) {   
        showLoader();
        $('#sources, #result, #video, #kinobaza').hide();
        $.get(this.url+this.search, {query:q, fields_mask:35, limit: 20}, function(r){
            KB.draw(r, '#kinobaza');
            $('#kinobaza .poster, #kinobaza h3').click(function(){
                var movie = $(this).closest('.movie');
                KB.drawDesc(movie);                
                VK.findVideo(movie.attr('data-name'), movie.attr('data-dur'));
            });
        });
    },
    
    drawDesc: function(movie) {
        html = '<div class="poster">'+ movie.find('.poster').html() +'</div>';
        html += '<div class="infox"><h3>'+ movie.attr('data-name') +' ('+ movie.attr('data-year') +')</h3><hr/>';
        html += '<div class="descr">'+ movie.find('.descr').html() +'</div>';
        html += '<div class="tools"><span class="favor">h</span></div></div>';
        $('#kinobaza').html($('<div/>').addClass('overview').html(html));
        
        
    },
    
    draw: function(r, elem) {
        if (KB.show == 'table') {
            KB.drawTable(r,elem);
        } else {
            KB.drawGrid(r,elem);
        }
        
    },
    
    drawTable: function(r, elem) {
        var html = '';
        $(r).each(function(){
            if (this.original_name == '' || this.original_name == null || this.description == null) return true;
            html += '<div class="movie" data-id="'+ this.id +'" data-name="'+ this.original_name +'" '
                 + 'data-year="'+ this.year +'" data-dur="'+ this.duration +'">'
                 + '<div class="poster"><img src="'+ KB.getPoster(this.id) +'"></div>';
            html += '<div class="info"><h3>'+ this.original_name +' ('+ this.year  +')</h3><hr>';
            html += '<div class="descr">'+ this.description +'</div>';
            html += '<div class="misc">IMDB: '+ this.ratings['imdb.com'].rate +' ('+ this.ratings['imdb.com'].votes +')</div>';
            html += '</div></div>';
        });
        $(elem).removeClass('grid').addClass('table').html(html).show();
        hideLoader();
    },
    
    drawGrid: function(r, elem) {
        var html = '';
        $(r).each(function(){
            if (this.original_name == '' || this.original_name == null || this.description == null) return true;
            html += '<div class="movie" data-name="'+ this.original_name +'" data-year="'+ this.year +'" data-dur="'+ this.duration +'">';
            html += '<div class="hide descr">'+ this.description +'</div>'
            html += '<div class="poster"><img src="'+ KB.getPoster(this.id) +'"></div>';
            html += '<span class="info"><b>'+ this.original_name +'</b> ('+ this.year  +')</span>';
            html += '<span class="imdb">'+ this.ratings['imdb.com'].rate +'</span>';
            html += '</div>';
        });
        $(elem).removeClass('table').addClass('grid').html(html).show();
        $('#kinobaza.grid .movie').hover(function() {
            $(this).find('.info').css('bottom', '0px');
        }, function() {
            $(this).find('.info').css('bottom', '-50px');
        });
        hideLoader(); 
    }
	
}