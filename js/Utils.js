var Utils = function() {
  this.jsonpGet = function(url, cb) {
    $.ajax({
      url: url,
      jsonp: 'cb',
      dataType: 'jsonp'
    }).success(function(response) {
      cb(response);
    });
  };

  this.getCurrentTime = function() {
    var ts = new Date();

    var hh = ts.getHours();
    var mm = ts.getMinutes();
    var ss = ts.getSeconds();

    var meridiem;
    if (hh > 12) {
      if(hh == 24){
        meridiem = 'AM';
      } else {
        meridiem = 'PM';
      }
      hh -= 12;
    } else {
      if(hh == 12){
        meridiem = 'PM';
      } else {
        meridiem = 'AM';
      }
    }

    hh = hh < 10 ? '0' + hh : hh;
    mm = mm < 10 ? '0' + mm : mm;
    ss = ss < 10 ? '0' + ss : ss;

    return hh + ':' + mm + ' ' + meridiem;
  }

  this.getTodayDate = function() {

    var DAY = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday',
               'Friday', 'Saturday'];
    var MONTH = ['January', 'February', 'March', 'April', 'May', 'June',
                 'July', 'August', 'September', 'October', 'November',
                 'December'];

    var ts = new Date();
    var date = ts.getDate();
    var day = DAY[ts.getDay()];
    var year = ts.getFullYear();
    var month = MONTH[ts.getMonth()];

    return month + ' ' + date + ', ' +  year;
  }

  this.isTimeInBetween = function(fromTime, toTime) {
    var ts = new Date();
    var currentTimeInSecond = inSecond(ts);

    if (currentTimeInSecond >= fromTime && currentTimeInSecond < toTime) {
      return true;
    }

    return false;
  }

  var inSecond = function(time) {
    var ts = new Date(time);

    return (
      (ts.getHours() * 60 * 60) + (ts.getMinutes() * 60) + ts.getSeconds()
    );
  }
};
