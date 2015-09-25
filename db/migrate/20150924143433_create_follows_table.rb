class CreateFollowsTable < ActiveRecord::Migration
  def change
    create_table :follows do |t|
      t.integer :follower_id, null: false
      t.integer :followee_id, null: false

      t.timestamps null: false
    end
    add_index :follows, [:follower_id, :followee_id], unique: true
    add_index :follows, :follower_id
    add_index :follows, :followee_id

    add_index :comments, :commenter_id
    add_index :comments, :track_id

    add_index :likes, :liker_id
    add_index :likes, :track_id

    add_index :plays, :player_id
    add_index :plays, :track_id
  end
end
