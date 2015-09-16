class CreateLikes < ActiveRecord::Migration
  def change
    create_table :likes do |t|
      t.integer :track_id
      t.integer :liker_id

      t.timestamps null: false
    end
  end
end
