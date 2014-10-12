var lastScrollTop = 0;

var word_array = [
          {text: "Who is your companion", weight: 10},
          {text: "Trusted advisor", weight: 15},
          {text: "Has the same chemistry", weight: 6},
          {text: "Professional", weight: 20},
          {text: "Easy to talk to", weight: 5},
          {text: "Understands you", weight: 8},
          {text: "Collaborative", weight: 5},
          {text: "Empathetic", weight: 7}
          // ...as many words as you want
      ];


$(document).ready(function(){
  $(this).scrollTop(0);

  $('.subMenu').smint({
    'scrollSpeed' : 800
  });

  $("#tag-cloud").jQCloud(word_array);

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
