class PagesController < ApplicationController

  def home

  end

  def search

  end

  def submit

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
