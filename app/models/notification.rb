# == Schema Information
#
# Table name: notifications
#
#  id           :integer          not null, primary key
#  phone_number :string
#  location     :string
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

class Notification < ActiveRecord::Base
  attr_accessor :latitude, :longitude

  before_create :set_location

  def self.locations_count
    select(:location).map(&:location).uniq.count
  end

  def set_location
    self.location = "#{latitude.to_s}, #{longitude.to_s}"
  end
end
