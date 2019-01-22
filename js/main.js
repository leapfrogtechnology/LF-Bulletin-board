;(function() {
  var ONE_SECOND = 1000;

  var jwPlayer;
  var shown = 1;
  var hidden = 0;
  var webview = [];
  var utils = new Utils();
  var apiUrl = _CONFIG.apiUrl;
  var cachedTitle = 'Leapfrog bulletin';
  var fetchInterval = _CONFIG.fetchInterval;
  var time = document.querySelector('#time');
  var date = document.querySelector('#date');
  var title = document.querySelector('#title');
  var container = document.querySelector('#container');


  var emptyContainer = function() {
    while (container.firstChild) {
      container.firstChild.remove();
    }
  }

  var slideMode = function() {
    if(jwPlayer) {
      jwPlayer.remove();
    }
    emptyContainer();

    var iframe_ = document.createElement('iframe');
    iframe_.setAttribute('scrolling', 'no');
    iframe_.setAttribute('class', 'webview');
    iframe_.setAttribute('name', 'webview[1]');
    iframe_.setAttribute('src', 'spinner.html');
    iframe_.style.display = 'block';
    container.appendChild(iframe_);

    var iframe = document.createElement('iframe');
    iframe.setAttribute('scrolling', 'no');
    iframe.setAttribute('class', 'webview');
    iframe.setAttribute('name', 'webview[0]');
    iframe.setAttribute('src', 'spinner.html');
    iframe.style.display = 'none';
    container.appendChild(iframe);

    webview[0] = document.querySelector('iframe[name="webview[0]"]');
    webview[1] = document.querySelector('iframe[name="webview[1]"]');
  }

  var slideRender = function(segement) {
    title.textContent = cachedTitle;

    cachedTitle = segement.title;
    webview[hidden].src = segement.url;
    webview[hidden].style.display = 'none';

    webview[shown].style.display = 'block';

    shown = (shown) ? 0 : 1;
    hidden = (hidden) ? 0 : 1;
  }

  var videoMode = function(playlist) {
    emptyContainer();
    title.textContent = '';

    jwPlayer = jwplayer('container');

    jwPlayer.setup({
      playlist: playlist
    });
  }

  var bulletin = new Bulletin(apiUrl,
                              fetchInterval,
                              videoMode,
                              slideMode,
                              slideRender);
  bulletin.init();

  setInterval(function() {
    date.textContent = utils.getTodayDate();
    time.textContent = utils.getCurrentTime();
  }, ONE_SECOND);
})();
