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

class ReportsController < ApplicationController
  def index
    if params[:distance] and params[:lat] and params[:lng]
      @reports = Report.within(params[:distance], origin: [params[:lat], params[:lng]]).includes(:categories)
    else
      @reports = Report.all.includes(:categories)
    end
    render json: @reports, each_serializer: ReportsSerializer
  end
end
