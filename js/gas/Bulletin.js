function Bulletinss() {
  var config = {
    sheet: {WEBPAGES: 'webpages', VIDEOS: 'videos'},
    header: {
      webpages: {SN: 0, TITLE: 1, OWNER: 2, PRIORITY: 3, DURATION: 4, URL: 5},
      videos: {SN: 0, TITLE: 1, OWNER: 2, DAY: 3, FROM: 4, TO: 5, ACTIVE: 6, URL: 7}
    },
    day: ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
  };

  var bulletin = {
    videos: [],
    webpages: []
  };
  
  var read = function() {
    var spreadSheet = SpreadsheetApp.getActive(); 
    
    for (var i in config.sheet) {
      var sheetName = config.sheet[i];
      var sheet = spreadSheet.getSheetByName(sheetName);

      var rows = sheet.getRange(2, 1, sheet.getLastRow(), sheet.getLastColumn()).getValues();
      
      for (var j in rows) {
        var row = rows[j];
        

        
        switch (sheetName) {

            
          case config.sheet.WEBPAGES:
            if (row[config.header.webpages.URL].length === 0 || row[config.header.webpages.PRIORITY].length === 0 ||
              row[config.header.webpages.DURATION].length === 0) {
              continue;
            }
            
            bulletin.webpages.push({
              url: row[config.header.webpages.URL],
              title: row[config.header.webpages.TITLE],
              priority: row[config.header.webpages.PRIORITY],
              duration: row[config.header.webpages.DURATION]
            });
            break;

          case config.sheet.VIDEOS:
            if (row[config.header.videos.URL].length === 0 || row[config.header.videos.DAY].length === 0 ||
              row[config.header.videos.FROM].length === 0 || row[config.header.videos.TO].length === 0 || 
              row[config.header.videos.ACTIVE].length === 0) {
              continue;
            }
            
            var ts = new Date();
            var day = row[config.header.videos.DAY].trim().toLowerCase();
            var active = row[config.header.videos.ACTIVE].trim().toLowerCase();
            Logger.log(day)
            
            if (config.day.indexOf(day) !== ts.getDay()) {
              continue;
            }
            
            if (active !== 'y' && active !== 'yes') {
              continue;
            }

            bulletin.videos.push({
              day: config.day.indexOf(day),
              url: row[config.header.videos.URL],
              title: row[config.header.videos.TITLE],
              to: inSecond(row[config.header.videos.TO]),
              from: inSecond(row[config.header.videos.FROM])
            });
            break;
        }
      }
    }
  }

  var inSecond = function(time) {
    var ts = new Date(time.toString());
    
    return (ts.getHours() * 60 * 60) + (ts.getMinutes() * 60) + ts.getSeconds();
  }
  
  var priority = function(obj1, obj2) {
     return parseInt(obj1.priority, 10) - parseInt(obj2.priority, 10);
  }
   
  this.getBulletin = function() {
    bulletin.webpages.sort(priority);
    
    return bulletin;
  };
  
  read();
}

function test() {
  var bulletin = new Bulletin();
  
  Logger.log(bulletin.getBulletin());
}

