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

class Subscription < ActiveRecord::Base
end
