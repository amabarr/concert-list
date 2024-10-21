# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 2024_09_21_222903) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "artist_concerts", force: :cascade do |t|
    t.uuid "artist_id"
    t.uuid "concert_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["artist_id", "concert_id"], name: "index_artist_concerts_on_artist_id_and_concert_id", unique: true
    t.index ["artist_id"], name: "index_artist_concerts_on_artist_id"
    t.index ["concert_id"], name: "index_artist_concerts_on_concert_id"
  end

  create_table "artists", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "name", null: false
    t.string "genres", default: [], array: true
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["genres"], name: "index_artists_on_genres"
    t.index ["name"], name: "unique_index_artists_on_name", unique: true
  end

  create_table "concerts", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "classification", default: "fun"
    t.date "date", null: false
    t.string "name"
    t.string "city"
    t.string "venue"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["city"], name: "index_concerts_on_city"
    t.index ["classification"], name: "index_concerts_on_classification"
    t.index ["date"], name: "unique_index_concerts_on_date", unique: true
  end

end
