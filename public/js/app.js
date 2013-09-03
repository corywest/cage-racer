start = null;
finished = false;

// function returnWinner(selector) {
//   if (selector == '#cage1 img') {
//     return "player1";
//   }
//   else {
//     return "player2";
//   } 
// }


// function checkForWin(avatar) {
//   console.log(avatar.selector);
//   if (avatar.outerWidth(true) >= 1295) {
//     end = new Date();
//     var time = ((end-start) / 1000).toString();

//     var winner = returnWinner(avatar.selector);
//     console.log(winner)
//     $('#winner').slideDown( 1000 ).delay( 5000 ).slideUp( 1000 );

//     $.post('/save_time',{duration: time, winner: winner}, function(response) {
//       $('#in_game_results').html(response);

//     });
   
//     $('#in_game_results').show();
//     finished = true;
//   }
//   else if (start === null) {
//     start = new Date();
//     console.log(start);
//   }
//   else {
//     console.log(avatar.outerWidth(true));
//   }
// }

function Game() {
  this.winner = null
  this.duration = 0
  this.startTime = 0
  this.endTime = 0
}

Game.prototype.startTimer = function() {
  this.startTime = ($.now())/1000;
}

Game.prototype.stopTimer = function() {
  this.endTime = ($.now())/1000;
}

Game.prototype.raceTime = function() {
  this.duration = (this.endTime - this.startTime) / 1000;
}

Game.prototype.returnWinner = function(selector) {
  if (selector == '#cage1 img') {
    return "player1";
  }
  else {
    return "player2";
  } 
}


Game.prototype.checkForWin = function(avatar) {
  console.log(avatar.selector);
  if (avatar.outerWidth(true) >= 1295) {
    current_game.stopTimer();
    var time = (current_game.endTime - current_game.startTime).toString();
    console.log(time);
    console.log(current_game.endTime);
    console.log(current_game.startTime);

    var winner = current_game.returnWinner(avatar.selector);
    console.log(winner)
    $('#winner').slideDown( 1000 ).delay( 5000 ).slideUp( 1000 );

    $.post('/save_time',{duration: time, winner: winner}, function(response) {
      $('#in_game_results').html(response);
    });
    
    $('#in_game_results').show();
    finished = true;
  }
  else if (current_game.startTime === 0) {
    current_game.startTimer();
  }
  else {
    console.log(avatar.outerWidth(true));
  }
}

$(document).ready(function() {

    current_game = new Game();

    $('#winner').hide();
    $('#in_game_results').hide();


    $(document).keyup(function(key) {
      switch(parseInt(key.which,10)) {
      case 16:
        if (finished == false) {
          $('#cage1 img').animate({marginLeft: "+=20px"}, 10, function() {
            current_game.checkForWin($('#cage1 img'));
          });
        }
    }
    });

    $(document).keyup(function(key) {
      switch(parseInt(key.which,10)) {
      case 13:
        if (finished == false) {  
          $('#cage2 img').animate({marginLeft: '+=20px'}, 10, function(){
            current_game.checkForWin($('#cage2 img'));
          });
        }
    }

    });
      
});
