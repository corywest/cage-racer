get '/' do
  erb :index
end

post '/game2' do
  @player1 = Player.create(:name => params[:player_one])
  @player2 = Player.create(:name => params[:player_two])
  @game = Game.create(:player_one => @player_one, :player_two => @player_two)
  session[:game_id] = @game.id
  erb :game2
end

post '/save_time' do 
  @game = Game.find(session[:game_id])
  @game.duration = params[:duration]
  erb :game2
end

