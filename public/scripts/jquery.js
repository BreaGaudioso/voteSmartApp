/*
1. filter by party
2. hide all who have an image inner html with no photo
*/


$( document ).ready(function() {
  console.log( "ready!" );
  $(".REP").css("color","#E0162B");
  $(".DEM").css("color","#0052A5");
  $("#demButton").css("color","#0052A5");
  $('#repButton').css('color', "#E0162B")

 $("img").each(function(){
     if ($(this).attr('src') == "https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png"){
        $(this).parent().remove();
     };
});

  $('#repButton').click(function() {
    $(".DEM").hide();
    $(".NNE").hide();
    $(".REP").show();
  });

  $('#demButton').click(function() {
    console.log("clicked ")
    $(".REP").hide();
    $(".NNE").hide();
    $(".DEM").show();
  });
  $('#allButton').click(function() {
    console.log("clicked ")
    $(".DEM").show();
    $(".REP").show();
    $(".NNE").show();
  });
 
  $('a').css("color", "#0052A5")
  
  $('a').mouseover(function(){
    $(this).css("color", "#E0162B")
  });

  $('a').mouseout(function(){
    $(this).css("color", "#0052A5")
  });
});
