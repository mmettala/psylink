$(document).ready(function(){
  $('#main-link').click(function(evt) {
      $('#mainpage-main-container').show();
      $('#mainpage-doctor-container').hide();
      $('#mainpage-help-container').hide();
  });

  $('#doctor-link').click(function(evt) {
      $('#mainpage-main-container').hide();
      $('#mainpage-doctor-container').show();
      $('#mainpage-help-container').hide();
  });

  $('#help-link').click(function(evt) {
      $('#mainpage-main-container').hide();
      $('#mainpage-doctor-container').hide();
      $('#mainpage-help-container').show();
  });
});
