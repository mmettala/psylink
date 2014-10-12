var lastScrollTop = 0;

var word_array = [
          {text: "Who is your companion", weight: 15},
          {text: "Trusted advisor", weight: 20},
          {text: "Has the same chemistry", weight: 12},
          {text: "Professional", weight: 25},
          {text: "Easy to talk to", weight: 9},
          {text: "Understands you", weight: 13},
          {text: "Collaborative", weight: 10},
          {text: "Empathetic", weight: 12},
          {text: "Friendly", weight: 13},
          {text: "Person to person", weight: 10},
          {text: "Patience", weight: 10},
          {text: "Acceptance", weight: 10}
      ];

var goBackToSearchResults = function() {
  $('#search-results-div').show('slide', {direction: 'left'}, 1000);
  $('#rate-main-container').hide('slide', {direction: 'right'}, 1000);
}

$(document).ready(function(){
  $(this).scrollTop(0);

  $('.subMenu').smint({
    'scrollSpeed' : 800
  });

  $("#tag-cloud").jQCloud(word_array);

  $('#star-rating').rating();

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
    /*$.getJSON( "api/Users", function( data ) {
        console.log(data);
    });*/
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

  $('#recommended-profile-pic').click(function(evt){
    $('#search-results-div').hide('slide', {direction: 'left'}, 1000);
    $('#rate-main-container').show('slide', {direction: 'right'}, 1000);
  });

  $('.star').click(function(evt){
    $('.voted-thanks').show();
    setTimeout(goBackToSearchResults, 1000);
  });




});
