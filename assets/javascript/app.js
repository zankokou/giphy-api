//gify api key
var apiKey = "xJPC9qjcbQjUligbItqoskssH5Cd0KpZ";


//function for ajax call
$('.go').on('click', function(event){
    //searcWord is the input from gify-input box
    var searchWord = $('#gify-input').val();
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchWord + "&api_key=xJPC9qjcbQjUligbItqoskssH5Cd0KpZ&limit=5";

    console.log(searchWord);
    $('#gify-area').empty();

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function(response){

            var i = 0;
            for (i = 0; i < response.data.length; i++){
                console.log(response.data);
                //get rating
                console.log(response.data[i].rating)
                
                //get rating and append
                var ratingDiv = $('<div>');
                ratingDiv = response.data[i].rating;
                $('#gify-area').append("Rating: " + ratingDiv);
    
                //get image and append
                var imageURL = response.data[i].images.downsized.url;
                console.log(imageURL);
                var imageDiv = $('<img>');
    
                imageDiv.attr('src', imageURL);
    
                $('#gify-area').append(imageDiv);
            }




        })

    event.preventDefault();

});