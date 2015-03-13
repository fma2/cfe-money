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

ActiveRecord::Schema.define(version: 20150306190234) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "electoral_district_schools", force: true do |t|
    t.integer  "electoral_district_id"
    t.integer  "school_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "electoral_districts", force: true do |t|
    t.string   "photo"
    t.string   "first_name"
    t.string   "last_name"
    t.string   "full_name"
    t.string   "email"
    t.string   "house"
    t.string   "district_no"
    t.string   "district_name"
    t.string   "website"
    t.string   "albany_office_no"
    t.string   "do_office_no"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "locations", force: true do |t|
    t.string   "name"
    t.string   "loc_code"
    t.string   "endpoint"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "pg_search_documents", force: true do |t|
    t.text     "content"
    t.integer  "searchable_id"
    t.string   "searchable_type"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  create_table "schools", force: true do |t|
    t.string   "dbn"
    t.string   "school"
    t.integer  "total_enrollment"
    t.float    "amount_owed"
    t.string   "district_name"
    t.integer  "district_no"
    t.string   "district_code"
    t.string   "assembly_district"
    t.integer  "senate_district"
    t.integer  "location_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
