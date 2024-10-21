class Concert < ApplicationRecord
  CLASSIFICATIONS = %w[fun work].freeze

  has_many :artist_concerts, autosave: true, dependent: :destroy
  has_many :artists, through: :artist_concerts, inverse_of: :concerts

  validates :classification, inclusion: { in: CLASSIFICATIONS }
  validates :date, presence: true, uniqueness: true

  scope :work, -> { where(classification: 'work') }
  scope :fun, -> { where(classification: 'fun') }
  scope :by_classification, ->(klass) { where(classification: klass) }
end
