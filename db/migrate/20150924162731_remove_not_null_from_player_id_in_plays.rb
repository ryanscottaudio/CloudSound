class RemoveNotNullFromPlayerIdInPlays < ActiveRecord::Migration
  def change
    change_column :plays, :player_id, :integer, null: true
  end
end
