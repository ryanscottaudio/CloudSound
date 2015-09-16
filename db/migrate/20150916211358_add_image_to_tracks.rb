class AddImageToTracks < ActiveRecord::Migration
  def up
    add_attachment :tracks, :image
  end

  def down
    remove_attachment :tracks, :image
  end
end
