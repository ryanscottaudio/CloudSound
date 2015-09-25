class AddUniquenessToLikes < ActiveRecord::Migration
  def change
    add_index :likes, [:liker_id, :track_id], unique: true
  end
end
