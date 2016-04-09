# == Schema Information
#
# Table name: reports
#
#  id           :integer          not null, primary key
#  incident_id  :integer
#  date         :date
#  time         :time
#  description  :text
#  location     :string
#  country_code :integer
#  city_code    :integer
#  area_code    :integer
#  locatlity    :integer
#  latitude     :float
#  longitude    :float
#  confirm      :boolean
#  first_name   :string
#  last_name    :string
#  more_info    :text
#  email        :string
#  approved     :boolean
#  verified     :boolean
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

class Report < ActiveRecord::Base
  has_many :report_categories
  has_many :categories, through: :report_categories
end
