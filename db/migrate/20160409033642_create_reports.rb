class CreateReports < ActiveRecord::Migration
  def change
    create_table :reports do |t|
      t.integer :incident_id
      t.date :date
      t.time :time
      t.text :description
      t.string :location
      t.integer :country_code
      t.integer :city_code
      t.integer :area_code
      t.integer :locatlity
      t.float :latitude
      t.float :longitude
      t.boolean :confirm
      t.string :first_name
      t.string :last_name
      t.text :more_info
      t.string :email
      t.boolean :approved
      t.boolean :verified

      t.timestamps null: false
    end
  end
end
