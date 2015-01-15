class School < ActiveRecord::Base
	include PgSearch
	multisearchable :against => [:dbn, :school]
	pg_search_scope :search_schools, :against => [:dbn, :school];
end
