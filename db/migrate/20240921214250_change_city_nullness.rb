class ChangeCityNullness < ActiveRecord::Migration[7.1]
  def change
    change_column_null(:concerts, :city, true)
  end
end
