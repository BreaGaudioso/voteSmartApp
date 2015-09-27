/*
1. filter by party
2. hide all who have an image inner html with no photo
*/



$(document).ready(function() {


//on click hide other party 
        $('#repButton').click(function() {
           $(".dem").hide();
           $(".rep").show();
    });
        $('#demButton').click(function() {
           $(".rep").hide();
           $(".dem").show();
    });
        $('#allButton').click(function() {
           $(".dem").show();
           $(".rep").show();
    });


});