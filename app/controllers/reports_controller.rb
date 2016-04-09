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
  protect_from_forgery except: :create

  def index
    distance = params[:distance] || 10
    if params[:lat] and params[:lng]
      @reports = Report.within(distance, origin: [params[:lat], params[:lng]]).includes(:categories)
    else
      @reports = Report.all.includes(:categories)
    end
    render json: @reports, each_serializer: ReportsSerializer
  end

  def create
    @report = Report.new(report_params)
    if @report.save
      render json: @report
    else
      render json: @report, status: 422
    end
  end

  private

  def report_params
    params.require(:report).permit!
  end
end