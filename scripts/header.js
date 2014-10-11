$(document).ready(function(){
  $(this).scrollTop(0);

  $('.header-menu').smint({
    'scrollSpeed' : 800
  });

  $('.go-back').click(function(evt){
      parent.history.back();
      evt.stopPropagation();
  });

});
