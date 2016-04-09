# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160409143828) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "categories", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
    t.integer  "severity",   default: 0
  end

  create_table "report_categories", force: :cascade do |t|
    t.integer  "report_id"
    t.integer  "category_id"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "report_categories", ["category_id"], name: "index_report_categories_on_category_id", using: :btree
  add_index "report_categories", ["report_id"], name: "index_report_categories_on_report_id", using: :btree

  create_table "reports", force: :cascade do |t|
    t.integer  "incident_id"
    t.text     "description"
    t.string   "location"
    t.integer  "country_code"
    t.integer  "city_code"
    t.integer  "area_code"
    t.integer  "locatlity"
    t.float    "latitude"
    t.float    "longitude"
    t.boolean  "confirm"
    t.string   "first_name"
    t.string   "last_name"
    t.text     "more_info"
    t.string   "email"
    t.boolean  "approved"
    t.boolean  "verified"
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
    t.string   "title"
    t.integer  "locatlity_code"
    t.datetime "datetime"
  end

  create_table "subscriptions", force: :cascade do |t|
    t.string   "phone_number"
    t.string   "email"
    t.float    "latitude"
    t.float    "longitude"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
  end

  add_foreign_key "report_categories", "categories"
  add_foreign_key "report_categories", "reports"
end
