//chrome.extension.onrequest.addListener(fuction(req,sender,res){console.log("procession"})
var fylz = {};
chrome.extension.onMessage.addListener(
	function(request, sender, sendResponse) {
	console.log(sender.tab ?
	"from a content script:" + sender.tab.url :
	"from the extension");
	if (request.greeting == "hello")
	{

		if (request.dataz)
		{
			fylz = request.dataz;
		}
		sendResponse({farewell: "goodbye"});
		var local = localStorage.getObject('refrecssher');

		if (!local)
		{
			localStorage.setObject('refrecssher', fylz);
		}

		local = localStorage.getObject('refrecssher');
	}
});	

Storage.prototype.setObject = function(key, value) {
    this.setItem(key, JSON.stringify(value));
}

Storage.prototype.getObject = function(key) {
    var value = this.getItem(key);
    return value && JSON.parse(value);
}