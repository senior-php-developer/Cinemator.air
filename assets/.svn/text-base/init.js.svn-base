var player;
var downloading;
var appUpdater = new runtime.air.update.ApplicationUpdaterUI();
var popup = null;
var token = null;
var fileCount = 1;

localStorage = {setItem: function(){
    
}, getItem: function(){
    
}};

window.nativeWindow.addEventListener(air.Event.CLOSE, onExit);
window.nativeWindow.addEventListener(air.Event.CLOSING, onExit);

function checkUpdate() {
	appUpdater.updateURL = "http://apps.airy.me/cinemator/update.xml";
	appUpdater.addEventListener(runtime.air.update.events.UpdateEvent.INITIALIZED, onUpdate);
	appUpdater.addEventListener(runtime.flash.events.ErrorEvent.ERROR, onUpdateError);
	appUpdater.isCheckForUpdateVisible = false;
    appUpdater.initialize();
}
function onUpdate(event) {
	appUpdater.checkNow();
}

function onUpdateError() {
	
}

function onExit() {
    if (typeof popup.nativeWindow != 'undefined') {
        popup.nativeWindow.close();    
    }
}


function vkLogin() {
	var token_url = 'http://api.vk.com/blank.html';
	var wndOpts = new air.NativeWindowInitOptions();
	wndOpts.type = air.NativeWindowType.UTILITY;
	wndOpts.resizable = false;
	var wnd = air.HTMLLoader.createRootWindow(false, wndOpts, false);
    popup = wnd.window;
	wnd.window.nativeWindow.height = 280;
	wnd.window.nativeWindow.width = 490;
	wnd.addEventListener(air.Event.COMPLETE, onLogin);
	wnd.load(new air.URLRequest('http://api.vk.com/oauth/authorize?client_id=1918220&scope=24&display=popup&response_type=token&redirect_uri='+token_url));
}

function onLogin(e) {
	var url = e.target.location.toString();
	if (url.match(/^http:\/\/api.vk.com\/blank.html/) || url.match(/^http:\/\/api.vkontakte.ru\/blank.html/)) {
		e.target.removeEventListener(air.Event.COMPLETE, onLogin);
		token = url.substring(url.indexOf('=')+1,url.indexOf('&'));
		if (token == 'access_denied') {
            e.target.root.nativeWindow.activate();
        } else {
			e.target.root.nativeWindow.close();
        }
	} else {
		e.target.root.nativeWindow.activate();
	}
		
}