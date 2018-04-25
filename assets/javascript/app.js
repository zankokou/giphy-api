

$(document).ready(function(){



//gify api key
var apiKey = "xJPC9qjcbQjUligbItqoskssH5Cd0KpZ";

// dynamically create buttons
var topics = ['Squirtle', 'Pikachu', 'Charizard', 'Gengar', 'Larvitar', 'Mew', 'Mewtwo', 'Chimchar', 'Jigglypuff',
              'Jirachi', 'Bulbasaur','Articuno','Snorlax'];

function renderButtons(){
    $('.btn-box').empty();
    for (var i = 0; i < topics.length; i++){
        var btn = $('<button>');
        btn.addClass('btn btn-primary btnTopic');
        btn.attr('data-name', topics[i]);
        btn.text(topics[i]);

        // console.log('data-name', topics[i]);
        $('.btn-box').append(btn);

    }
}

//create initial buttons
renderButtons();

//function for ajax call
function displayGiphyButton(){
    //searcWord is the input from gify-input box
    var btnData = $(this).attr('data-name');
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + btnData + "&api_key=xJPC9qjcbQjUligbItqoskssH5Cd0KpZ&limit=10";

    $('#gify-area').empty();

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function(response){

            var results = response.data;

            for (i = 0; i < results.length; i++){
                
                var holderDiv = $('<div>');
                holderDiv.attr('id', 'holder');

                var ratingDiv = $('<p>');
                ratingDiv = results[i].rating;
    
                //get image assign attr and append
                var imageDiv = $('<img>');
                imageDiv.attr('src', results[i].images.downsized_still.url);
                imageDiv.attr('data-still', results[i].images.downsized_still.url)
                imageDiv.attr('data-animate', results[i].images.downsized.url)
                imageDiv.attr('data-state','still')
                imageDiv.addClass('gifAPI');


                $(holderDiv).append("Rating: " + ratingDiv);
                $(holderDiv).append(imageDiv);
                $('#gify-area').append(holderDiv);

            }
        })
};

//function to add buttonTopics
$('.go').on('click', function(e){
    e.preventDefault();
    var searchWord = $('#gify-input').val().trim();
    if (searchWord === ''){

    }
    else{

    topics.push(searchWord);

    // console.log(topics);
    renderButtons();

    $('#gify-input').val("");
}

});

$(document).on("click", ".btnTopic", displayGiphyButton);



function animateGif(){

    var state = $(this).attr('data-state');

        if (state == "animate"){
              $(this).attr("src", $(this).attr("data-still"));
              $(this).attr("data-state", "still");
            }
        else {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
            }

        
}

$(document).on("click", ".gifAPI", animateGif);

});//document.ready ending