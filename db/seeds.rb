category_names = ['Catcalls/Whistles', 'Commenting' 'Sexual Invites', 'Ogling/Facial Expressions/Staring',
'Taking Pictures', 'Indecent Exposure', 'Touching/Groping', 'Stalking', 'Rape / Sexual Assault',
'Poor / No Street Lighting', 'Chain Snatching', 'North East India Report', 'Others', 'VERBAL ABUSE',
'NON-VERBAL ABUSE', 'PHYSICAL ABUSE', 'SERIOUS PHYSICAL ABUSE', 'OTHER ABUSE']

category_names.each do |name|
  Category.find_or_create_by(name: name.downcase)
end
