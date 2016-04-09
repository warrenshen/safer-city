class CreateNotifications < ActiveRecord::Migration
  def change
    create_table :notifications do |t|
      t.string :phone_number
      t.string :location

      t.timestamps null: false
    end
  end
end
