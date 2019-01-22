var Bulletin = function(url, interval, videoMode, slideMode, slideRender) {
  var PLAY = 1;
  var STOP = 0;
  var INIT = 2;
  var FIVE_SECONDS = 5 * 1000;

  var utils;
  var apiUrl;
  var videos;
  var slides;
  var sliderId;
  var playlist;
  var slideMode;
  var videoMode;
  var slideIndex;
  var fetchInteval;
  var cacheSlideIndex;
  var videoModeCallback;
  var slideModeCallabck;
  var nextSlideCallback;

  var construct = function() {
    utils = new Utils();

    apiUrl = url;
    playlist = [];
    fetchInteval = interval;
    slideModeCallabck = slideMode;
    videoModeCallback = videoMode;
    nextSlideCallback = slideRender;

    fetch();
  };

  this.init = function() {
    read(function() {
      start();
    });
  };

  var read = function(cb) {
    if (localStorage.hasOwnProperty('videos') &&
        localStorage.hasOwnProperty('webpages')) {
      cb();
    } else {
      setTimeout(function() {
        read(cb);
      }, FIVE_SECONDS);
    }
  }

  var fetch = function() {
    utils.jsonpGet(apiUrl, function(response) {
      localStorage.setItem('videos', JSON.stringify(response.data.videos));
      localStorage.setItem('webpages', JSON.stringify(response.data.webpages));
    });

    setTimeout(fetch, fetchInteval);
  }

  var start = function() {
    syncVideos();

    if (videoMode === INIT) {
      slideMode = STOP;
      clearInterval(sliderId);
      videoModeCallback(playlist);
    }

    if (videoMode === STOP) {
      if (slideMode !== PLAY) {
        slideModeCallabck();
        initSlide();
        slideMode = PLAY;
      }
    }

    setTimeout(start, fetchInteval);
  }

  var syncVideos = function() {
    var ts = new Date();

    newPlaylist = [];
    videos = JSON.parse(localStorage.videos);

    for (var i in videos) {
      var video = videos[i];

      if (ts.getDay() === video.day &&
          utils.isTimeInBetween(video.from, video.to)) {
        newPlaylist.push({
          file: video.url,
          title: video.title,
        });
      }
    }

    if (playlist.length !== newPlaylist.length && newPlaylist.length > 0) {
      videoMode = INIT;
    } else if (playlist.length === newPlaylist.length && newPlaylist.length > 0) {
      videoMode = PLAY;
    } else if (playlist.length === newPlaylist.length && newPlaylist.length === 0) {
      videoMode = STOP;
    }

    playlist = newPlaylist;
  }

  var initSlide = function() {
    slideIndex = 0;
    cacheSlideIndex = 0;
    slides = JSON.parse(localStorage.webpages);
    slides.sort(priority);
    nextSlide();
  }

  var nextSlide = function() {
    var slide = slides[slideIndex];
    cacheSlideIndex = (cacheSlideIndex < slides.length - 1) ? cacheSlideIndex + 1 : 0;

    var cacheSlide = slides[cacheSlideIndex];
    nextSlideCallback(cacheSlide);

    setTimeout(function() {
      if (slideIndex < slides.length - 1 ) {
        slideIndex++;
        nextSlide();
      } else {
        initSlide();
      }
    }, slide.duration * 1000);
  }

  var priority = function(obj1, obj2) {
     return parseInt(obj1.priority, 10) - parseInt(obj2.priority, 10);
  }

  construct();
};
