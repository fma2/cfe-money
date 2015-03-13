class ElectoralDistrictSchool < ActiveRecord::Base
	
	belongs_to :school
	belongs_to :electoral_district

end
