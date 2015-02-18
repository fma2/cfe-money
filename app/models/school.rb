class School < ActiveRecord::Base
	include PgSearch
	pg_search_scope :search_schools, 
									:against => [[:district_code, 'B'],[:district_name, 'C'], [:school, 'A']], 
									:using => {
                    :tsearch => {:prefix => true},
                  }
end
