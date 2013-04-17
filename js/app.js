//app.js
var argz = {
	active: true,
	currentWindow: true
};

var debug = false;

var local = {};

//append content scripts
chrome.tabs.executeScript(null, {file: "js/jquery-1.9.1.js"});
chrome.tabs.executeScript(null, {file: "js/css-auto-refresh.js"});

if (debug)
	console.log('fin attashing');

chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (debug)
    {
    	console.log('app.js', sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    	console.log(request);
    }
	
	localStorage.setObject('refrecssher', null);
    if (request.greeting == "hello")
    {
    	if (debug)
    		console.log(request);
		if (request.dataz)
		{
			fylz = request.dataz;
	      	sendResponse({farewell: "goodbye"});
		}
		local = localStorage.getObject('refrecssher');
		if (!local)
			local = {};
		jQuery.each(fylz, function (k,v) {
			if ( !(v in local) )
			{
				fylz[v] = {
					on: true
				};
				local[v] = fylz[v];
				if (debug)
					console.log('writing to local');
			}
			else if (debug)
				console.log('NOT writing to local');
		});
		localStorage.setObject('refrecssher', local);
		console.log('get_css_files() ran');
	}
	else if (request.greeting == 'update')
	{
		console.log('update_css_files() ran', new Date());
      	sendResponse({marewell: "poop"});
	}
	local = localStorage.getObject('refrecssher');
    
	build_list(local);
	return true;
});

Storage.prototype.setObject = function(key, value) {
    this.setItem(key, JSON.stringify(value));
}

Storage.prototype.getObject = function(key) {
    var value = this.getItem(key);
    return value && JSON.parse(value);
}
function build_list(obj) 
{
	if (debug)
		console.log(obj);

	var lister = jQuery('ul#list_of_files');
	var htmz = '';
	jQuery.each(obj, function (k,v) {
		var checked = '';
		if (v.on)
			checked = ' checked="checked"';
		htmz += '<li><input id="' + k + '" type="checkbox"' + checked + ' />' + k + '</li>';
	});
	lister.html(htmz);
}

jQuery(document).ready(function () {
	jQuery('button#submitteur').click(function () {
		console.log('GOING');
		var file_list = {};
		jQuery('#list_of_files').find('input[type="checkbox"]').each(function () {
			var $this = jQuery(this);
			if ($this.is(':checked'))
			{
				file_list[jQuery(this).attr('id')] = '';
				local[$this.attr('id')].on = true;
			}
			else
			{
				local[$this.attr('id')].on = false;
			}
		});
		console.log(file_list);
		localStorage.setObject('refrecssher', local);
		
		//console.log(file_list);
		chrome.tabs.query(argz, function(tabs) {
			chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello", dataz: file_list}, function(response) {
				console.log(response.farewell);
			});
		});
		window.close();
	});
	jQuery("input#all_checker").on('click', function(){
		if (jQuery(this).is(':checked'))
			jQuery('#list_of_files').find('input[type="checkbox"]').prop('checked', true);
		else
			jQuery('#list_of_files').find('input[type="checkbox"]').prop('checked', false);
	}); 

});