# frozen_string_literal: true

class Concert < ApplicationRecord
  CLASSIFICATIONS = %w[fun work].freeze

  validates :classification, inclusion: {in: CLASSIFICATIONS}
end