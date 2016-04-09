class FixDateAndTime < ActiveRecord::Migration
  def change
    remove_column :reports, :date
    remove_column :reports, :time
    add_column :reports, :datetime, :datetime
  end
end
