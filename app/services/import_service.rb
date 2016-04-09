class ImportService

  def initialize(file)
    @xlsx = Roo::Spreadsheet.open(file, extension: :xlsx)
  end

  def parse_file
    @xlsx.default_sheet = @xlsx.sheets[0]
    first_line = true
    @xlsx.each do |row|
      if first_line
        first_line = false
        next
      Report.create(
        incident_id: row[0],
        title: row[1],
        # date: row[2],
        # time: row[7],
        description: row[11],
        categories: fill_categories(row),
        location: row[30],
        country_code: row[31],
        city_code: row[32],
        area_code: row[33],
        locatlity_code: row[34],
        latitude: row[35],
        longitude: row[36],
        confirm: !!row[37],
        more_info: row[38],
        first_name: row[39],
        last_name: row[40],
        email: row[41],
        approved: row[42] == 'YES',
        more_info: row[43] == 'YES',
      )
    end
  end

  def fill_categories(row)
    categories = []
    (12...29).each do |i|
      if row[i] == 1
        categories << Category.find_by_name(Category.names[i-12].downcase())
      end
    end
    categories
  end

end
