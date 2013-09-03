function Game() {
	this.winner = null
	this.duration = 0
}

Game.prototype.startTimer = function() {
  this.startTime = $.now();
}

Game.prototype.stopTimer = function() {
	this.endTime = $.now();
}

Game.prototype.raceTime = function() {
	this.duration = this.endTime - this.startTime
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

