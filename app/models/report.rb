# == Schema Information
#
# Table name: reports
#
#  id             :integer          not null, primary key
#  incident_id    :integer
#  date           :date
#  time           :time
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
#

class Report < ActiveRecord::Base
  acts_as_mappable :default_units => :miles,
                   :default_formula => :sphere,
                   :distance_field_name => :distance,
                   :lat_column_name => :latitude,
                   :lng_column_name => :longitude

  has_many :report_categories
  has_many :categories, through: :report_categories

  before_create :set_incident_id

  def category_names
    categories.map(&:name).map(&:titlecase)
  end

  def set_incident_id
    self.incident_id ||= Report.maximum(:incident_id) + 1
  end
end
