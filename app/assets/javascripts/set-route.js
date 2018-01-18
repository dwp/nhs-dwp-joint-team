$(document).ready(function () {
  $('#set-route').on('click', function(){
    var val = $('input[name="method-group"]:checked').val();
    document.cookie = 'road=' + val.substring(0, val.indexOf(',')) + ';path=/';
  });
})