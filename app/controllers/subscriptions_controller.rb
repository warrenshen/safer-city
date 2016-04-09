# == Schema Information
#
# Table name: subscriptions
#
#  id           :integer          not null, primary key
#  phone_number :string
#  email        :string
#  latitude     :float
#  longitude    :float
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

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
