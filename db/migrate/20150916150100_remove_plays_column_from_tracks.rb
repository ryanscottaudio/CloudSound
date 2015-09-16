class RemovePlaysColumnFromTracks < ActiveRecord::Migration
  def up
    remove_column :tracks, :plays
  end

  def down
    add_column :tracks, :plays, :integer, default: 0, null: false
  end
end
