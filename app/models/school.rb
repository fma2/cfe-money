class School < ActiveRecord::Base
	include PgSearch
	multisearchable :against => [:dbn, :school]
	
end
