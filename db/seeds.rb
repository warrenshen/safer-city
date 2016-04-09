(0...17).each do |i|
  name = Category.names[i]
  severity = Category.severities[i]
  category = Category.find_or_initialize_by(name: name.downcase)
  category.severity = severity
  category.save
end

if File.exist?('safecity-overall.xlsx')
  importer = ImportService.new('safecity-overall.xlsx')
  importer.parse_file
end
