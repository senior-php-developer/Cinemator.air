VK = {
	title: null,
	duration: null,
	stop: false,
	found: [],
	foundHD: [],
	
	inArray: function(dur, arr) {
        if (typeof arr[dur] == 'undefined') return false;
        else return true;
    },
    
    vkSort: function(a,b) {if (a.length > b.length) return -1;   else return 1;},
	
	findVideo: function(t, d) {
		VK.title = cleanArgs(t);
		var data = { access_token:token, q:VK.title+' 720', sort:1, hd:1, count: 150 }
		VK.duration = d;
		VK.stop = false;
		$('#sources').hide();
		$('#result').empty();
		showLoader();
		$.get('https://api.vk.com/method/video.search', data, VK.onFindVideoHD);
	},
	
	onFindVideoHD: function(data) {
	   VK.foundHD = []; 
       if (typeof data.error != 'undefined') {
            console.log(data.error);
            if (data.error.error_code != 10) {
                 authVK();
            } else {
                jAlert(data.error.error_msg);
            }
            hideLoader();
            return;
        }
        $(data.response).each(function(){
            if (this.title == undefined) return true;
            if (Math.abs(Math.round(this.duration/60) - VK.duration) > 15) return true; 
            if (this.title.indexOf('720') == -1) return true;
            
            VK.foundHD.push({'id': this.id, 'owner': this.owner_id, 'title':this.title, 'thumb':this.thumb, 'duration':this.duration});
        });
        if (VK.foundHD.length > 0) {
            $('#result').append('<div data-hd="1"><img src="'+VK.foundHD[0].thumb+'"><span class="descr">'+VK.foundHD[0].title+'</span><span class="dur">'+mkTime(VK.foundHD[0].duration)+' HD</span></div>');    
        }
        $.get('https://api.vk.com/method/video.search', { access_token:token, q:VK.title, sort:1, hd:2, count: 150 }, VK.onFindVideo);
	},
	
	onFindVideo: function(data) {
	   VK.found = [];  
	   if (typeof data.error != 'undefined') {
            console.log(data.error);
            if (data.error.error_code != 10) {
                 authVK();
            } else {
                jAlert(data.error.error_msg);
            }
            hideLoader();
            return;
        }
        $(data.response).each(function(){
            if (Math.abs(Math.round(this.duration/60) - VK.duration) > 15) return true; 
            if (this.title == undefined) return true;
            if (VK.inArray(this.duration, VK.found)) {
                VK.found[this.duration].push({'id': this.id, 'owner': this.owner_id, 'title':this.title, 'thumb':this.thumb, 'duration':this.duration});
                return true;
            } else {
                VK.found[this.duration] = [{'id': this.id, 'owner': this.owner_id, 'title':this.title, 'thumb':this.thumb, 'duration': this.duration}];
            } 
        });
        VK.found.sort(VK.vkSort);
        var j = 0;
        $(VK.found).each(function(k,v){
            if (typeof this[0] == 'undefined') return true;
            if ($('#result div').size() == 8) return false;
            $('#result').append('<div data-index="'+k+'"><img src="'+this[0].thumb+'"><span class="descr">'+this[0].title+'</span><span class="dur">'+mkTime(this[0].duration)+'</span></div>'); 
        });
        $('#result div').hover(function() {
            $(this).find('.descr').css('bottom', '0px');
        }, function() {
            $(this).find('.descr').css('bottom', '-80px');
        });
        $('#result div').click(VK.getSources);   
		$('#result').show();
		hideLoader();
	},
	
	getSources: function() {
	    var i = $(this).attr('data-index');
	    $('#sources .list').empty();
	    $('#video').empty().hide();
	    if ($(this).attr('data-hd') === '1') {
	        $(VK.foundHD).each(function(){
                $('#sources .list').append('<div data-vid="'+this.id+'" data-oid="'+this.owner+'" data-dur="'+this.duration+'"><span class="descr">'+this.title+'</span></div>');
            }); 
	    } else {
	       $(VK.found[i]).each(function(){
                $('#sources .list').append('<div data-vid="'+this.id+'" data-oid="'+this.owner+'" data-dur="'+this.duration+'"><span class="descr">'+this.title+'</span></div>'); 
            });    
	    }
        $('#sources .list div').click(VK.getVideoURL); 
		$('#sources').show();
	},
	
	getVideoURL: function() {
	    var vid = $(this).attr('data-vid');
	    var oid = $(this).attr('data-oid');
	    $.get('http://vk.com/video.php', {act:'a_embedbox', oid:oid, vid:vid}, function(e){
	        var str = /vk.com\\\/.*hash=[\w]*/.exec(e);
            var url = str[0].replace("\\",'');
		    var wndOpts = new air.NativeWindowInitOptions();
		    wndOpts.type = air.NativeWindowType.UTILITY;
		    wndOpts.minimizable = true;
		    var loader = air.HTMLLoader.createRootWindow(false, wndOpts, false);
		    loader.window.nativeWindow.width = 480;
		    loader.window.nativeWindow.height = 360;
		    loader.load(new air.URLRequest('http://'+url));
	        loader.window.nativeWindow.activate();
	    });
    }
}