# == Schema Information
#
# Table name: categories
#
#  id         :integer          not null, primary key
#  name       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Category < ActiveRecord::Base
  has_many :report_categories
  has_many :reports, through: :report_categories

  def self.names
    ['Catcalls/Whistles', 'Commenting' 'Sexual Invites', 'Ogling/Facial Expressions/Staring',
    'Taking Pictures', 'Indecent Exposure', 'Touching/Groping', 'Stalking', 'Rape / Sexual Assault',
    'Poor / No Street Lighting', 'Chain Snatching', 'North East India Report', 'Others', 'VERBAL ABUSE',
    'NON-VERBAL ABUSE', 'PHYSICAL ABUSE', 'SERIOUS PHYSICAL ABUSE', 'OTHER ABUSE']
  end
end
