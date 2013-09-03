function Game() {
	this.winner = null
	this.duration = 0
}

Game.prototype.startTimer() {
  this.startTime = $.now();
}

Game.prototype.stopTimere() {
	this.endTime = $.now();
}

Game.prototype.raceTime() {
	this.duration = this.endTime - this.startTime
}

