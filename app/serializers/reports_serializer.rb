class ReportsSerializer < BaseSerializer
  attributes :id,
             :title,
             :latitude,
             :longitude,
             :location,
             :description,
             :category_names,
             :severity
end
