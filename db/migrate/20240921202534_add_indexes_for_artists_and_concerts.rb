class AddIndexesForArtistsAndConcerts < ActiveRecord::Migration[7.1]
  def change
    add_index :concerts, :classification
    add_index :concerts, :date
    add_index :concerts, :city

    add_index :artists, :name
    add_index :artists, :genres
  end
end
