# frozen_string_literal: true

class CreateConcerts < ActiveRecord::Migration[7.1]
  def change
    create_table :concerts, id: :uuid do |t|
      t.string :classification, default: 'fun'
      t.date :date, null: false
      t.string :name, null: true
      t.string :city, null: false
      t.string :venue, null: false

      t.timestamps
    end
  end
end
