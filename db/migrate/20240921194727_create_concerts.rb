# frozen_string_literal: true

class CreateConcerts < ActiveRecord::Migration[7.1]
  def change
    create_table :concerts do |t|
      t.string :classification, default: 'fun'
      t.date :date
      t.string :name
      t.string :city
      t.string :venue

      t.timestamps
    end
  end
end
