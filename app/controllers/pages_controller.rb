class PagesController < ApplicationController

  def home

  end

  def search

  end

  def submit
    @locations_count = Report.locations_count
    @reports_count = Report.count
  end

  def submit_success

  end

  def subscribe
    @locations_count = Notification.locations_count
    @notifications_count = Notification.count
  end

  def subscribe_success

  end

  def navigation

  end

end
