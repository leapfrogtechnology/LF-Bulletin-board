function doGet(request) {
  var bulletin = new Bulletin();
  var response = JSON.stringify({data: bulletin.getBulletin()});
  
  return ContentService.createTextOutput(
          request.parameters.cb + '(' + response + ')')
          .setMimeType(ContentService.MimeType.JAVASCRIPT);
}