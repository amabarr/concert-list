class Artist < ApplicationRecord
  has_many :artist_concerts, autosave: true, dependent: :destroy
  has_many :concerts, -> { order('date') }, through: :artist_concerts, inverse_of: :artists

  validates :name, presence: true, uniqueness: true

  def times_seen
    concerts.count
  end
end
