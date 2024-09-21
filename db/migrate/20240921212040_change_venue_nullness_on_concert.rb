class ChangeVenueNullnessOnConcert < ActiveRecord::Migration[7.1]
  def change
    change_column_null(:concerts, :venue, true)
  end
end
