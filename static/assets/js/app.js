(function() {

	$(document).ready(function() {
		loadWebviewContent();

		if(typeof(Storage) === "undefined") {
		   alert('Sorry! No Web Storage support..');
		} else {
			setInterval(syncKioskChanges, 1000 * 5);
		}

	});

	function syncKioskChanges() {
		$.getJSON(window.location.origin+"/data", function(data) {
		    if (localStorage.getItem("last_update") != data.last_update) {
				localStorage.setItem("url", data.kiosk.url);
				localStorage.setItem("last_update", data.last_update);
				loadWebviewContent();
			}
		});

	}

	function loadWebviewContent()
	{
		if (localStorage.getItem("url") === "undefined")
		{
			$("#webview").html("Have a god day");
		} else {
			url = localStorage.getItem("url");
			html = getWebviewContent(url);
			$("#webview").html(html);
		}
	}

	function getWebviewContent(url)
	{
		iframeForYoutube     = '<iframe scrolling="no" width="100%" height="100%" src="{0}" frameborder="0" allowfullscreen></iframe>';
		iframeForWebsite     = '<iframe scrolling="no" width="100%" height="100%" src="{0}" frameborder="0"></iframe>';
		iframeForGoogleSlide = '<iframe src="{0}" frameborder="0" width="960" height="569" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>';

		if (url === null) {
			html = "<h1>LF Kiosk</h1>";
		} else if (url.search("https://docs.google.com/presentation") != -1) {
			html = iframeForYoutube.format([url]);
		} else if (url.search("https://www.youtube.com/embed") != -1) {
			html = iframeForYoutube.format([url]);
		} else {
			html = iframeForWebsite.format([url]);
		}

		return html;
	}

	// String format
	String.prototype.format = function (args) {
		var str = this;
		return str.replace(String.prototype.format.regex, function(item) {
			var intVal = parseInt(item.substring(1, item.length - 1));
			var replace;
			if (intVal >= 0) {
				replace = args[intVal];
			} else if (intVal === -1) {
				replace = "{";
			} else if (intVal === -2) {
				replace = "}";
			} else {
				replace = "";
			}
			return replace;
		});
	};
	String.prototype.format.regex = new RegExp("{-?[0-9]+}", "g");

}) ()
