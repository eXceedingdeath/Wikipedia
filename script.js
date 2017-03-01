$(document).ready(function(){

$("#inpt_search").on('focus', function () {
	$(this).parent('label').addClass('active');
});

$("#inpt_search").on('blur', function () {
	if($(this).val().length === 0)
		$(this).parent('label').removeClass('active');

});

$("#inpt_search").on('blur', function () {
	if($(this).val().length === 0)	
        $("#display-results").empty();

});


var apiURL = "https://en.wikipedia.org/w/api.php?callback=?";

function getWiki(){
    $("#display-results").empty(); // clear prior search results 
    $.getJSON(apiURL, {
        action: 'query',
        format: 'json',
        inprop: "url",
        formatversion: 2,
        generator: 'search',
        gsrsearch: $("input").val(),
        gsrwhat: "text",
        prop: 'extracts|info',
        exsentences: 3,
        exintro: "",
        explaintext: "",        
        exlimit: 20,
      })
      .success(function(data) {

if(data.hasOwnProperty('query')){



        console.log(data);
        data.query.pages.forEach(function(resp) {
          $("#display-results").append(
            "<a href='" + resp.fullurl + "' target= '_blank'><div id='result' class='results'><h3>" + resp.title + "</h3><p = class='extract'>" + resp.extract + "</p></div></a>");
        });

} else $("#display-results").append("<div class='error'>try something else :(</div>");

      });


  }


  function randomWiki() {

  	 $("#display-results").empty(); // clear prior search results 
    $("input").val("");
    $.getJSON(apiURL, {
        action: 'query',
        format: 'json',
        inprop: "url",
        formatversion: 2,
        generator: 'random',
        grnlimit: 10,
        grnnamespace: 0,
        prop: 'extracts|info',
        exsentences: 3,
        exintro: "",
        explaintext: "",
        exlimit: 20,   
        
      })
      .success(function(data) {
        console.log(data);        
        data.query.pages.forEach(function(resp) {
            $('#display-results').append(
              "<a href='" + resp.fullurl + "' target= '_blank'><div id='result' class='results'><h3>" + resp.title + "</h3><p = class='extract'>" + resp.extract + "</p></div></a>");       
        });
      });

 }


  $("#inpt_search").keydown(function(event) {
    if (event.keyCode == 13) {
      getWiki();
      return false;
    }
  });

$("#random").click(function(ev) {
  randomWiki();
  return false;
    
 });

});






