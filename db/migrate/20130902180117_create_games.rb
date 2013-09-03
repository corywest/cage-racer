class CreateGames < ActiveRecord::Migration
  def change
    create_table :games do |t|
      t.string :player_one
      t.string :player_two
      t.string :winner
      t.string :duration
      t.string :secret_url
      t.timestamps
    end
  end
end
