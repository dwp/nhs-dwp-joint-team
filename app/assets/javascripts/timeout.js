$(document).ready(function () {
  var desktop = document.cookie.match(new RegExp('road=scan'));
  var expires = document.cookie.match(new RegExp('timeout=([^;]+)'));
  if (expires && desktop) {
    var intID = setInterval(function(){
      if(Date.parse(expires[1]) - Date.now() > 5 * 60 * 1000) {
        // more than 5 minutes left
      } else if (Date.parse(expires[1]) - Date.now() > 0) {
        $('#timeout').removeClass('hidden');
        var m = Math.ceil( (Date.parse(expires[1]) - Date.now() )/60/1000);
        var html = m + ' minute';
        if(m !== 1) html += 's';
        $('#timeout-expires').html(html);
      } else {
        document.location = '/send-your-fit-note-beta-4/';
      }
      console.log("expires in:", Math.round( (Date.parse(expires[1]) - Date.now() )/1000), 'secs');
    }, 1000);
  }
  
  $('#timeout-close').on('click', function(){
    $('#timeout').addClass('timeout-closed');
  });
})

