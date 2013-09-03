get '/' do
  erb :index
end

post '/game2' do
  @player1 = Player.create(:name => params[:player_one])
  @player2 = Player.create(:name => params[:player_two])
  
  @game = Game.create(:player_one => @player1.name, :player_two => @player2.name)
  @game.players << @player1
  @game.players << @player2
 
  session[:game_id] = @game.id
  erb :game2
end

post '/save_time' do 
  p params.inspect
  @game = Game.find(session[:game_id])
  @player1 = @game.players[0]
  @player2 = @game.players[1]
  @game.duration = params[:duration]
  p @game
  erb :game2
end

