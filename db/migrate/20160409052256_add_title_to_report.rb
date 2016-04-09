class AddTitleToReport < ActiveRecord::Migration
  def change
    add_column :reports, :title, :string
    add_column :reports, :locatlity_code, :integer
  end
end
