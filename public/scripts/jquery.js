/*
1. filter by party
2. hide all who have an image inner html with no photo
*/


$( document ).ready(function() {
  console.log( "ready!" );
  $(".REP").css("color","#0052A5");
  $(".DEM").css("color","#E0162B");
  $("#demButton").css("color","#E0162B");
  $('#repButton').css('color', "#0052A5")

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
