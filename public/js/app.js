start = null;
finished = false;

function returnWinner(selector) {
  if (selector == '#cage1 img') {
    return "player1";
  }
  else {
    return "player2";
  } 
}


function checkForWin(avatar) {
  console.log(avatar.selector);
  if (avatar.outerWidth(true) >= 1295) {
    end = new Date();
    var time = ((end-start) / 1000).toString();

    var winner = returnWinner(avatar.selector);
    console.log(winner)
    $('#winner').slideDown( 1000 ).delay( 5000 ).slideUp( 1000 );

    $.post('/save_time',{duration: time, winner: winner}, function(response) {
      $('#in_game_results').html(response);

    });
    
   
    $('#in_game_results').show();
    finished = true;
  }
  else if (start === null) {
    start = new Date();
    console.log(start);
  }
  else {
    console.log(avatar.outerWidth(true));
  }
}

$(document).ready(function() {

    new Game()

    $('#in_game_results').hide();
    $('#winner').hide();

    $(document).keyup(function(key) {
      switch(parseInt(key.which,10)) {
      case 16:
        if (finished == false) {
          $('#cage1 img').animate({marginLeft: "+=20px"}, 10, function() {
            checkForWin($('#cage1 img'));
          });
        }
    }
    });

    $(document).keyup(function(key) {
      switch(parseInt(key.which,10)) {
      case 13:
        if (finished == false) {  
          $('#cage2 img').animate({marginLeft: '+=20px'}, 10, function(){
            checkForWin($('#cage2 img'));
          });
        }
    }

    });
      
});
