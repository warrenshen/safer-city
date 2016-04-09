class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  def get_reports
    distance = params[:distance] || 10
    if params[:lat] and params[:lng]
      @reports = Report.within(distance, origin: [params[:lat], params[:lng]]).includes(:categories)
    else
      @reports = Report.includes(:categories).all
    end
    if params[:limit]
      @reports = @reports.last(params[:limit])
    end
  end
end
