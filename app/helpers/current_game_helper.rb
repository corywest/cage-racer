def current_game
	@current_game ||= Game.find(session[:game_id])
end