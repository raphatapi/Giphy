var topics = ["Pink Floyd", "Tron", "Dragon Ball", "Soccer", "Lord of the Rings"];


$(document).ready(function() {

	var audioElement = document.createElement("audio");
      audioElement.setAttribute("src", "songs/giphy1.mp3");
      audioElement.play();
      $("#theme-button").text("Pause Music");

    //Use button to toggle music on/off
	    $("#theme-button").on("click", function() {
	          //If it's not paused then pause it and change button text to "Play Music"
	          if (!audioElement.paused) {
	            audioElement.pause();           
	            $("#theme-button").text("Play Music");
	          //Or do the opposite
	        } else {
	            audioElement.play();           
	          $("#theme-button").text("Pause Music");
	        }
	      });

	function topicsHTML() {
		$(".buttons").empty();
		for (var i = 0; i < topics.length; i++) {
			topic = $("<button>");
			topic.data("giphy", topics[i]);
			topic.addClass("text-center btn btn-info btn-lg topicsBtn");
			topic.text(topics[i]);
			$(".buttons").append(topic);	
		}
	}

	function getTopic () {

		$(".topicsBtn").on("click", function() {
	      var topic = $(this).data("giphy");
		  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=6xfaAb1rplRM55HrAsCdiL6jn7DwEZLy&limit=10";

	      $.ajax({
	          url: queryURL,
	          method: "GET"
	        })
	        .done(function(response) {
	          var results = response.data;
	          $(".jumbotron").empty();
	          for (var i = 0; i < results.length; i++) {

	            if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
	              var gifDiv = $("<div class='item text-center'>");
	              var rating = results[i].rating;
	              var p = $("<p>").text("Rating: " + rating);
	              var animateGiphyImage = results[i].images.fixed_height.url;
	              var stillGiphyImage = results[i].images.fixed_height_still.url;
	              var giphyImage = $("<img>");
	              giphyImage.attr("src", stillGiphyImage);
	              giphyImage.data("still", stillGiphyImage);
	              giphyImage.data("animate", animateGiphyImage);
	              giphyImage.attr("data-state", "still");
	              giphyImage.addClass("giphyResult");
	              gifDiv.append(p);
	              gifDiv.append(giphyImage);
	              $(".jumbotron").prepend(gifDiv);
	            }
	          }
	        });
	    })
	}

	$("#add-giphy").on("click", function(event){
		event.preventDefault();
		var newTopic = $("#giphy-input").val().trim();
		topics.push(newTopic);
		topicsHTML();
		getTopic();
		$("#giphy-input").val("");
		$("#add-giphy").attr("disabled",true);
	    $("#giphy-input").keyup(function(){
	        if( $.trim($(this).val()).length > 0){
	            $("#add-giphy").attr("disabled", false);            
	        }
	        
	        else {
	            $("#add-giphy").attr("disabled",true);
	        }
	    })
	})

	$("#add-giphy").attr("disabled",true);
	    $("#giphy-input").keyup(function(){
	        if( $.trim($(this).val()).length > 0) {
	            $("#add-giphy").attr("disabled", false);            
	        }
	        else {
	            $("#add-giphy").attr("disabled",true);
	        }
	    })

	topicsHTML();
	getTopic();

	$(document).on("click", ".giphyResult", function(){
		// console.log("here1");
	var state = $(this).attr("data-state");
   
		if (state === "still") {
			// console.log("here2");
		    $(this).attr("src", $(this).data("animate"));
		    $(this).attr("data-state", "animate");
		  } else {
		  	// console.log("here3");
		    $(this).attr("src", $(this).data("still"));
		    $(this).attr("data-state", "still");
		  }
	})

});