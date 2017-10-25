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
          console.log(response);
          var results = response.data;
          for (var i = 0; i < results.length; i++) {

            if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
              var gifDiv = $("<div class='item'>");
              var rating = results[i].rating;
              var p = $("<p>").text("Rating: " + rating);
              var giphyImage = $("<img>");
              giphyImage.attr("src", results[i].images.fixed_height.url);
              gifDiv.append(p);
              gifDiv.append(giphyImage);
              $(".jumbotron").prepend(gifDiv);
            }
          }
        });
    })
}


$(document).ready(function() {
	
	function topicsHTML() {
		for (var i = 0; i < topics.length; i++) {
			topic = $("<button>");
			topic.data("giphy", topics[i]);
			topic.addClass("text-center btn btn-warning btn-lg topicsBtn");
			topic.text(topics[i]);
			$(".buttons").append(topic);	
		}
	}

	topicsHTML();
	getTopic();

});