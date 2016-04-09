Category.names.each do |name|
  Category.find_or_create_by(name: name.downcase)
end
