get '/' do
  session.clear 
  erb :index
end

get '/game' do 
  # @game = Game.find(session[:game_id])
  @player1 = current_game.players[0]
  @player2 = current_game.players[1]
  p "===========" 
  p session
  p current_game
  p "==========="
  erb :game
end

get '/:secret_url' do
  @game = Game.find_by_secret_url(params[:secret_url])
  p @game 
  @player1 = @game.players[0]
  @player2 = @game.players[1]
  erb :results
end

#POST================================================

post '/game' do
  @player1 = Player.create(:name => params[:player_one])
  @player2 = Player.create(:name => params[:player_two])
  @game = Game.create(:player_one => @player1.name, :player_two => @player2.name)
  @game.players << @player1
  @game.players << @player2
  session[:game_id] = @game.id
  redirect '/game'
end

post "/" do 
  erb :index
end

post '/save_time' do 
  p params
  @game = Game.find(session[:game_id])
  @player1 = @game.players[0]
  @player2 = @game.players[1]
  @game.update_attributes(:duration => params[:duration])
  params[:winner] == "player1" ? @game.update_attributes(:winner => @player1.name) : @game.update_attributes(:winner => @player2.name)
  @game.update_attributes(:secret_url => SecureRandom.hex(3))
  p @game
  p "==============================="
  erb :_in_game_results, layout: false
end

