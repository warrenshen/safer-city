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

class ReportCategory < ActiveRecord::Base
  belongs_to :report
  belongs_to :user
end
