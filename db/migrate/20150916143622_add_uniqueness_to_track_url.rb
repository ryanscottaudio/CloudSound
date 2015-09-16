class AddUniquenessToTrackUrl < ActiveRecord::Migration
  def change
    add_index :tracks, :url, unique: true
  end
end
