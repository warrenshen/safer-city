Category.names.each do |name|
  Category.find_or_create_by(name: name.downcase)
end

if File.exist?('safecity-overall.xlsx')
  importer = ImportService.new('safecity-overall.xlsx')
  importer.parse_file
end
