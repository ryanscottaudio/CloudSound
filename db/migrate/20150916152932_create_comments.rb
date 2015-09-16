class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.integer :commenter_id, null: false
      t.integer :track_id, null: false
      t.text :content, null: false
      t.integer :time

      t.timestamps null: false
    end
  end
end
