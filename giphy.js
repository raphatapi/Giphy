var topics = ["Pink Floyd", "Tron", "Dragon Ball Z"];
// var topicBtn;

function getTopic () {

	$(".topicsBtn").on("click", function() {
      var topic = $(this).data("giphy");
	  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=6xfaAb1rplRM55HrAsCdiL6jn7DwEZLy&limit=5";

      $.ajax({
          url: queryURL,
          method: "GET"
        })
        .done(function(response) {
          var results = response.data;
          $(".jumbotron").empty();
          for (var i = 0; i < results.length; i++) {

            if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
              var gifDiv = $("<div class='item'>");
              var rating = results[i].rating;
              var p = $("<p>").text("Rating: " + rating);
              var animateGiphyImage = results[i].images.fixed_height.url;
              var stillGiphyImage = results[i].images.fixed_height_still.url;
              var giphyImage = $("<img>");
              giphyImage.attr("src", stillGiphyImage);
              giphyImage.data("still", stillGiphyImage);
              giphyImage.data("animate", animateGiphyImage);
              giphyImage.data("state", "still");
              giphyImage.addClass("giphyResult");
              gifDiv.append(p);
              gifDiv.append(giphyImage);
		      $(".jumbotron").append(gifDiv);
            }
          }
        });
    })
}

$(document).on("click", ".giphyResult", function(){
	var state = $(this).attr("data-state");
   
		if (state == "still") {
		    $(this).attr("src", $(this).data("animate"));
		    $(this).attr("data-state", "animate");
		  } else {
		    $(this).attr("src", $(this).data("still"));
		    $(this).attr("data-state", "still");
		  }
})

$(document).ready(function() {
	
	function topicsHTML() {
		$(".buttons").empty();
		for (var i = 0; i < topics.length; i++) {
			topic = $("<button>");
			topic.data("giphy", topics[i]);
			topic.addClass("text-center btn btn-warning btn-lg topicsBtn");
			topic.text(topics[i]);
			$(".buttons").append(topic);	
		}
	}

	$("#add-giphy").on("click", function(event){
		event.preventDefault();
		var newTopic = $("#giphy-input").val().trim();
		topics.push(newTopic);
		topicsHTML();
		getTopic();
	})

	topicsHTML();
	getTopic();

});