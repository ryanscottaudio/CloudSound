class TakeUniquenessOff < ActiveRecord::Migration
  def change
    remove_index :users, name: 'index_users_on_username'
    change_column :users, :username, :string, null: true
    change_column :users, :fname, :string, null: true
    change_column :users, :lname, :string, null: true
    change_column :users, :fname, :string, null: true
  end
end
