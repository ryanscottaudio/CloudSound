class CreateTracks < ActiveRecord::Migration
  def change
    create_table :tracks do |t|
      t.integer :author_id, null: false
      t.string :title, null: false
      t.string :url, null: false
      t.integer :plays, null: false, default: 0
      t.text :description
      t.boolean :private, null: false, default: false

      t.timestamps null: false
    end
    add_index :tracks, :author_id
  end
end
