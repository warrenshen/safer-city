class SubscriptionsController < ApplicationController
  protect_from_forgery except: :create

  def create
    @subscription = Subscription.new(subscription_params)
    if @subscription.save
      render json: @subscription
    else
      render json: @subscription, status: 422
    end
  end

  private
  def subscription_params
    params.require(:subscription).permit!
  end
end
