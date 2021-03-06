# == Schema Information
#
# Table name: reports
#
#  id             :integer          not null, primary key
#  incident_id    :integer
#  description    :text
#  location       :string
#  country_code   :integer
#  city_code      :integer
#  area_code      :integer
#  locatlity      :integer
#  latitude       :float
#  longitude      :float
#  confirm        :boolean
#  first_name     :string
#  last_name      :string
#  more_info      :text
#  email          :string
#  approved       :boolean
#  verified       :boolean
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#  title          :string
#  locatlity_code :integer
#  datetime       :datetime
#

class Report < ActiveRecord::Base
  attr_accessor :date, :time, :creation_categories
  acts_as_mappable :default_units => :miles,
                   :default_formula => :sphere,
                   :distance_field_name => :distance,
                   :lat_column_name => :latitude,
                   :lng_column_name => :longitude

  has_many :report_categories
  has_many :categories, through: :report_categories

  before_create :set_incident_id
  before_create :set_datetime
  before_create :set_categories

  def self.locations_count
    select(:location).map(&:location).uniq.count
  end

  def category_names
    categories.map(&:name).map(&:titlecase)
  end

  def set_incident_id
    self.incident_id ||= Report.maximum(:incident_id) + 1
  end

  def set_datetime
    self.datetime ||= DateTime.parse("#{ self.date } #{ self.time }")
  end

  def set_categories
    if self.creation_categories
      self.creation_categories.each do |category|
        self.categories << Category.find_or_create_by(name: category.downcase)
      end
    end
  end

  def severity
    categories.map(&:severity).min || 2
  end

  def generate_texts
    subscriptions = Subscription.within(5, origin: self)
    subscriptions.each do |subscription|
      twilio_client.messages.create(
        to: subscription.phone_number,
        from: ENV['TWILIO_PHONE_NUMBER'],
        body: "Sexual Harassment occured at #{ self.location }"
      )
      Notification.create(
        latitude: latitude,
        longitude: longitude,
        phone_number: subscription.phone_number,
      )
    end
  end

  def twilio_client
    Twilio::REST::Client.new(ENV['TWILIO_ACCOUNT_SID'], ENV['TWILIO_AUTH_TOKEN'])
  end
end
