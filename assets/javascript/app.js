

$(document).ready(function(){



//gify api key
var apiKey = "xJPC9qjcbQjUligbItqoskssH5Cd0KpZ";

// dynamically create buttons
var topics = ['Squirtle', 'Pikachu', 'Charizard'];

function renderButtons(){
    $('.btn-box').empty();
    for (var i = 0; i < topics.length; i++){
        var btn = $('<button>');
        btn.addClass('btn btn-primary btnTopic');
        btn.attr('data-name', topics[i]);
        btn.text(topics[i]);

        console.log('data-name', topics[i]);
        $('.btn-box').append(btn);

    }
}

//create initial buttons
renderButtons();

//function for ajax call
function displayGiphyButton(){
    //searcWord is the input from gify-input box
    var btnData = $(this).attr('data-name');
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + btnData + "&api_key=xJPC9qjcbQjUligbItqoskssH5Cd0KpZ&limit=5";

    $('#gify-area').empty();

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function(response){

            var i = 0;
            for (i = 0; i < response.data.length; i++){
                // console.log(response.data);
                // console.log(response.data[i].rating)
                
                //get rating and append
                $('#gify-area').append('<br>' + '<br>');

                var ratingDiv = $('<p>');
                ratingDiv.attr('class', 'rating');
                ratingDiv = response.data[i].rating;
                $('#gify-area').append("Rating: " + ratingDiv);
    
                //get image and append
                var imageURL = response.data[i].images.downsized.url;
                // console.log(imageURL);
                var imageDiv = $('<img>');
                imageDiv.attr('src', imageURL);
                $('#gify-area').append(imageDiv);
            }
        })
};

//function to add buttonTopics
$('.go').on('click', function(e){
    e.preventDefault();
    var searchWord = $('#gify-input').val().trim();
    topics.push(searchWord);

    console.log(topics);
    renderButtons();


});

$(document).on("click", ".btnTopic", displayGiphyButton);


});//document.ready ending