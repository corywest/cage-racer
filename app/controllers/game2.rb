post "/save_time" do 
  @game = Game.find(session[:game_id])
  @game.duration = params[:duration]
  erb :game2
end
