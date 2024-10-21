class CreateArtists < ActiveRecord::Migration[7.1]
  def change
    create_table :artists, id: :uuid do |t|
      t.string :name, null: false
      t.string :genres, array: true, default: []


      t.timestamps
    end
  end
end
