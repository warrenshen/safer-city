class CreateSubscriptions < ActiveRecord::Migration
  def change
    create_table :subscriptions do |t|
      t.string :phone_number
      t.string :email
      t.float :latitude
      t.float :longitude

      t.timestamps null: false
    end
  end
end
