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

class ReportsController < ApplicationController
  protect_from_forgery except: :create

  def index
    get_reports
    render json: @reports, each_serializer: ReportsSerializer
  end

  def create
    @report = Report.new(report_params)
    if @report.save
      @report.generate_texts
      render json: @report
    else
      render json: @report, status: 422
    end
  end

  def show
    @report = Report.find params[:id]
  end

  private

  def report_params
    params.require(:report).permit!
  end
end
