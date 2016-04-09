class PagesController < ApplicationController

  def home
    @reports = Report.order(created_at: "DESC").first(10)
  end

  def search

  end

  def submit

  end

  def submit_success

  end

  def subscribe

  end

  def subscribe_success

  end

  def navigation

  end

end
