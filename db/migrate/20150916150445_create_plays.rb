class CreatePlays < ActiveRecord::Migration
  def change
    create_table :plays do |t|
      t.integer :track_id, null: false
      t.integer :player_id, null: false

      t.timestamps null: false
    end
  end
end
