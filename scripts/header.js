var lastScrollTop = 0;


$(document).ready(function(){
  $(this).scrollTop(0);

  $('.subMenu').smint({
    'scrollSpeed' : 800
  });

  $('.go-back').click(function(evt){
      parent.history.back();
      evt.stopPropagation();
  });

  $('#try-now-div').click(function(evt){
    $('#questions-form').slideDown();
    $('#try-now-div').hide();
  });



  $('#search-now-div').click(function(evt){
    $('#questions-form').slideUp();
    $.getJSON( "api/Users", function( data ) {
        console.log(data);
    });
    $('#search-results-div').slideDown();
    $('#search-now-div').hide();
    $('#search-again-div').slideDown();
  });

  $('#search-again-div').click(function(evt){
    $('#search-results-div').slideUp();
    $('#questions-form').slideDown();
    $('#search-again-div').hide();
    $('#search-now-div').show();
  });



  $('#personal-details-label').click(function(evt){
    $('#personal-details-div').slideDown();
    $('#personality-div').slideUp();
    $('#preferences-div').slideUp();
    $('#values-div').slideUp();
    $('#expectations-div').slideUp();
  });

  $('#personality-label').click(function(evt){
    $('#personal-details-div').slideUp();
    $('#personality-div').slideDown();
    $('#preferences-div').slideUp();
    $('#values-div').slideUp();
    $('#expectations-div').slideUp();
  });

  $('#preferences-label').click(function(evt){
    $('#personal-details-div').slideUp();
    $('#preferences-div').slideDown();
    $('#personality-div').slideUp();
    $('#values-div').slideUp();
    $('#expectations-div').slideUp();
  });

  $('#values-label').click(function(evt){
    $('#personal-details-div').slideUp();
    $('#values-div').slideDown();
    $('#personality-div').slideUp();
    $('#preferences-div').slideUp();
    $('#expectations-div').slideUp();
  });

  $('#expectations-label').click(function(evt){
    $('#personal-details-div').slideUp();
    $('#expectations-div').slideDown();
    $('#personality-div').slideUp();
    $('#preferences-div').slideUp();
    $('#values-div').slideUp();
  });

});
