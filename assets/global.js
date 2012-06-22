$(function(){   
    $('#go').click(function(){
       var q = $('input.search').val();
       KB.findMovie(q); 
    });
    
    $('.tools a.home').click(function(){
       C.showHome(); 
    });
    
    $('.tools a.settings').click(function(){
        $('div.settings').slideToggle();
    });

    $('.tools a.view').click(function(){
       if ($(this).text() == 'a') {
           C.changeView('table');
           $(this).text('>');
       } else {
           C.changeView('grid');
           $(this).text('a');
       }
       
    });
    
    $('.save-filter').click(function(){
       $('div.settings').hide();
       jPrompt('Enter name of the filter','new filter', 'Create new filter', function(a){
           if (a !== null) {
               C.createFilter(a);
           }
       }); 
    });
    
    $(".year .slider").slider({range: true, min: 1970, max: 2012, values: [1990, 2012],
        slide: function( event, ui ) {
            $('.settings .year .start').text(ui.values[0]);
            $('.settings .year .end').text(ui.values[1]);
        }
    });
    $(".imdb .slider").slider({range: true, min: 1, max: 10, values: [6, 10],
        slide: function( event, ui ) {
            $('.settings .imdb .start').text(ui.values[0]);
            $('.settings .imdb .end').text(ui.values[1]);
        }
    });
    $('.settings button').click(function(){
        C.applyFilters();
    });
	C.init();
    vkLogin();
});
