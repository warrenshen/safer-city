# == Schema Information
#
# Table name: report_categories
#
#  id          :integer          not null, primary key
#  report_id   :integer
#  category_id :integer
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

require 'test_helper'

class ReportCategoryTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
