C = {
    filters: {},
    defilters: {
      'Latest Movies': {year_min:2011,year_max:2012,limit:200,sort:3,imdb_rating_min:5},
      'IMDB Top 200': {year_min:1930,year_max:2012,limit:200,sort:1},
      'Best of 2011': {year_min:2011,year_max:2011,imdb_rating_min:6,imdb_rating_max:10,sort:1,limit:150},
      'Best of 1990s': {year_min:1990,year_max:1999,imdb_rating_min:6,imdb_rating_max:10,sort:1,limit:200},
      'Drama 7+ 2010+': {imdb_rating_min:7,imdb_rating_max:10,year_min:2010,year_max:2012,limit:100,genre:1,sort:3},
    },
    
    init: function() {
        this.initFilters();
        this.showHome();
    },
    
    initFilters: function(){
        //this.filters = $.parseJSON(localStorage.getItem('filters'));
        if (this.filters == null) this.filters = {};            
    },
    
    saveFilters: function(){
        //localStorage.setItem('filters', JSON.stringify(this.filters));
    },
    
    createFilter: function(name) {
        if (typeof this.filters[name] == 'undefined') {
            this.filters[name] = {
                imdb_rating_min: $('.settings .imdb .start').text(),
                imdb_rating_max: $('.settings .imdb .end').text(),
                year_min: $('.settings .year .start').text(),
                year_max: $('.settings .year .end').text(),
                limit: $('.settings .limit').val(),
                genre: $('.settings .genre').val(),
                sort: $('.settings input[name=sort]:checked').val()
            }
            this.saveFilters();
            
        } else {
            jAlert('filter already exists');
            return false;
        }
    },
    
    loadFilter: function(id) {
        var f = this.filters[id];
        $('.settings .imdb .start').text(f.imdb_rating_min);
        $('.settings .imdb .end').text(f.imdb_rating_max);
        $('.settings .year .start').text(f.year_min);
        $('.settings .year .end').text(f.year_max);
        $('.settings .limit').val(f.limit);
        $('.settings .genre').val(f.genre);
        $('.settings input[rel='+f.sort+']').attr('checked','checked');
    },
    
    showFilters: function() {
        var html = '<div class="lt"><h3>Saved filters</h3><hr/>';
        if (this.filters.length == 0) 
            html += '<p>Your saved filters will be here</p>';
        for(var i in this.filters) {
             html += '<a class="filter">'+i+'</a>';
        }
        html += '</div>';
        
        html += '<div class="rt"><h3>Predefined filters</h3><hr/>';
        for(var i in this.defilters) {
            html += '<a class="def-filter">'+i+'</a>';
        }
        $('#kinobaza .filters').html(html);
        $('#kinobaza .def-filter').click(function(){
            var s = C.defilters[$(this).text()];
            $('div.settings').hide();
            KB.data.sort = s.sort;
            KB.getMovies(s);
        });
        
    },    
    
    applyFilters: function(){
        $('div.settings').hide();
        KB.data.sort = $('.settings input[name=sort]:checked').val();
        KB.getMovies({
           imdb_rating_min: $('.settings .imdb .start').text(),
           imdb_rating_max: $('.settings .imdb .end').text(),
           year_min: $('.settings .year .start').text(),
           year_max: $('.settings .year .end').text(),
           limit: $('.settings .limit').val(),
           genres: $('.settings .genre').val()
        });
    },
    
    showHome: function(){
        $('#sources, #result').hide();
        $('#video').empty();
        $('#kinobaza').html('<div class="filters" /><div class="newest" /><div class="help" />')
        this.showFilters();
        this.showHelp();
    },
    
    showHelp: function(){
        $('.help').html('<p>Start by choosing one of the pre-defined filters or run a <a href="#">customized</a> search query.</p><p>Create new filters to use them later and add selected movies to your favorites.</p><p>Find movies by title and watch them in HIGH DEFINITION!</p>');
        $('.help a').click(function(){
           $('div.settings').slideDown(); 
        });
        
        
    },
    
    changeView: function(n){
        KB.show = n;
        KB.getMovies();        
    }
    
}




