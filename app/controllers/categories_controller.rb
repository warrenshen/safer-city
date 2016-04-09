class CategoriesController < ApplicationController
  def index
    if params[:lng] and params[:lat]
      get_reports
      puts @reports
      categories = Hash.new(0)
      @reports.each do |r|
        r.category_names.each do |n|
          categories[n] += 1
        end
      end
      inner_array = []
      categories.each do |k, v|
        inner_array << { name: k, reports_count: v }
      end
      render json: { categories: inner_array }
    else
      @categories = Category.all
      render json: @categories, each_serializer: CategoriesSerializer
    end
  end
end
