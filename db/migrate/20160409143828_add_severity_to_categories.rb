class AddSeverityToCategories < ActiveRecord::Migration
  def change
    add_column :categories, :severity, :integer, default: 0
  end
end
