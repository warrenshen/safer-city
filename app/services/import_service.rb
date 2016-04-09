class ImportService
  def initialize(file)
    @xlsx = Roo::Spreadsheet.open(file, extension: :xlsx)
    @categories = Category.all
  end

  def parse_file
    @xlsx.default_sheet = @xlsx.sheets[0]
    first_line = true
    @xlsx.each do |row|
      if first_line
        first_line = false
        next
      end
      begin
        dt = DateTime.new(1899, 12, 30, row[9].to_i, row[10].to_i, 00) + row[2].days
      rescue
        dt = row[2]
      end
      Report.create(
        incident_id: row[0],
        title: row[1],
        datetime: dt,
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
        verified: row[43] == 'YES',
      )
    end
  end

  def fill_categories(row)
    categories = []
    (12...29).each do |i|
      if row[i] == 1
        categories << @categories.find_by_name(Category.names[i-12].downcase())
      end
    end
    categories
  end

end
