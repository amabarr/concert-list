class CreateArtistConcert < ActiveRecord::Migration[7.1]
  def change
    create_table :artist_concerts do |t|
      t.references :artist, type: :uuid
      t.references :concert, type: :uuid
      t.timestamps
    end

    add_index :artist_concerts, %i[artist_id concert_id], unique: true
  end
end
