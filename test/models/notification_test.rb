# == Schema Information
#
# Table name: notifications
#
#  id           :integer          not null, primary key
#  phone_number :string
#  location     :string
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

require 'test_helper'

class NotificationTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
