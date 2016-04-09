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
