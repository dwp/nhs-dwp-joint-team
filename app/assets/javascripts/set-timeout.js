$(document).ready(function () {
  document.cookie = 'timeout=;path=/';
  $('#startButton').on('click', function(){
    var d = new Date();
    d.setTime(d.getTime() + (30 * 60 * 1000));
    document.cookie = 'timeout='+d.toUTCString()+';path=/';
  });
})