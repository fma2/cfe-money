class ElectoralDistrict < ActiveRecord::Base
	has_many :electoral_district_schools
	has_many :schools, through: :electoral_district_schools
end
