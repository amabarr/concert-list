class AddUniqueIndexToNameAndDate < ActiveRecord::Migration[7.1]
  def change
    remove_index :concerts, :date
    remove_index :artists, :name

    add_index :concerts, :date, unique: true, name: "unique_index_concerts_on_date"
    add_index :artists, :name, unique: true, name: "unique_index_artists_on_name"
  end
end
