(function() {

    const WEBVIEW_INIT   = 0;
    const WEBVIEW_LOADED = 1;
    const VIDEO_INIT     = 2;
    const VIDEO_PLAYING  = 3;

    var kioskMode = WEBVIEW_INIT;
    var serverWebviewUrl;

    localStorage.setItem("change_webview", 0);

    $(document).ready(function() {
        loadWebviewContent();

        if (typeof(Storage) === "undefined") {
            alert("Sorry! Web Storage supported");
        } else {
            setInterval(syncKioskChanges, 1000 * 6 * 1);
        }

    });

    var player = {
        playVideo: function(container, videoId, playlist) {
            if (typeof(YT) == 'undefined' || typeof(YT.Player) == 'undefined') {
                window.onYouTubeIframeAPIReady = function() {
                    player.loadPlayer(container, videoId, playlist);
                };

                $.getScript('//www.youtube.com/iframe_api');
            } else {
                player.loadPlayer(container, videoId, playlist);
            }
        },

        loadPlayer: function(container, videoId, playlist) {
            new YT.Player(container, {
                videoId: videoId,
                suggestedQuality: 'default',
                playerVars: {
                    autoplay: 1,
                    playlist: playlist,
                    controls: 1,
                    setLoop: 1,
                    setShuffle: 1,
                    modestbranding: 0,
                    rel: 1,
                    showInfo: 0
                },
                events: {
                    onReady: resizePlayer
                }
            });
        }
    };


    function syncKioskChanges() {
        $.getJSON(window.location.origin + "/data", function(data) {
            if (localStorage.getItem("last_update") != data.last_update) {
                if (localStorage.getItem("url") != data.kiosk.url)
                {
                    localStorage.setItem("change_webview", 1);
                }

                localStorage.setItem("url", data.kiosk.url);
                localStorage.setItem("schedule", JSON.stringify(data.kiosk.schedule));
                localStorage.setItem("playlist", JSON.stringify(data.kiosk.playlist));
                localStorage.setItem("last_update", data.last_update);
            }
        });

        checkKioskMode();

        if (kioskMode == VIDEO_INIT)
        {
            $("#container-fluid").html('<div class="chart-stage" style="height: 100vh;" id="webview"></div>');

            playlist = JSON.parse(localStorage.getItem("playlist"));
            videoId = playlist[0];
            playlist.splice(0, 1);
            playlist = playlist.join(",")
            player.playVideo('webview', videoId, playlist);

            kioskMode = VIDEO_PLAYING
        } else if (kioskMode == WEBVIEW_INIT) {
            $("#container-fluid").html('<div class="chart-stage" style="height: 100vh;" id="webview"></div>');

            loadWebviewContent();
            kioskMode = WEBVIEW_LOADED;
        } else if (kioskMode == WEBVIEW_LOADED) {
            if (localStorage.getItem("change_webview") == 1)
            {
                $("#container-fluid").html('<div class="chart-stage" style="height: 100vh;" id="webview"></div>');

                loadWebviewContent();
                kioskMode = WEBVIEW_LOADED;

                localStorage.setItem("change_webview", 0);
            }
        }

    }

    function checkKioskMode() {
        schedule = JSON.parse(localStorage.getItem("schedule"));

        currentDate = new Date();
        currentTime = currentDate.getHours() + ":" +
                      currentDate.getMinutes() + ":" +
                      currentDate.getSeconds();
        currentTime = Date.parse("21/06/2016 " + currentTime);

        videoTiming = false;
        for (time in schedule) {
            startTime = Date.parse("21/06/2016 " + schedule[time].start_time);
            endTime = Date.parse("21/06/2016 " + schedule[time].end_time);

            if (currentTime >= startTime && currentTime < endTime ) {
                videoTiming = true;

                if (kioskMode != VIDEO_PLAYING) {
                    kioskMode = VIDEO_INIT;
                }

                break;
            }
        }

        if (videoTiming == false)
        {
            if (kioskMode != WEBVIEW_LOADED)
            {
                kioskMode = WEBVIEW_INIT;
            }
        }
    }

    function loadWebviewContent() {
        if (localStorage.getItem("url") === "undefined") {
            $("#webview").html("<h1>Leapfrog Bulletin Board</h1>");
        } else {
            url = localStorage.getItem("url");
            html = getWebviewContent(url);
            $("#webview").html(html);
        }
    }

    function getWebviewContent(url) {
        iframeForYoutube = '<iframe scrolling="no" width="100%" height="100%" src="{0}" frameborder="0" allowfullscreen></iframe>';
        iframeForWebsite = '<iframe scrolling="no" width="100%" height="100%" src="{0}" frameborder="0"></iframe>';
        iframeForGoogleSlide = '<iframe src="{0}" frameborder="0" width="960" height="569" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>';

        if (url === null) {
            html = "<h1>Leapfrog Bulletin Board</h1>";
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
    String.prototype.format = function(args) {
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



    function resizePlayer() {

        var $allVideos = $("iframe[src*='//player.vimeo.com'], iframe[src*='//www.youtube.com'], object, embed"),
            $fluidEl = $(".container-fluid");

        $allVideos.each(function() {

            $(this)
                // jQuery .data does not work on object/embed elements
                .attr('data-aspectRatio', this.height / this.width)
                .removeAttr('height')
                .removeAttr('width');

        });

        $(window).resize(function() {

            var newWidth = $fluidEl.width();
            $allVideos.each(function() {

                var $el = $(this);
                $el
                    .width(newWidth)
                    .height(newWidth * $el.attr('data-aspectRatio'));

            });

        }).resize();

    }

})()
