class School < ActiveRecord::Base
	include PgSearch
	
	belongs_to :location
	
	pg_search_scope :search_nyc_schools, 
									:against => [[:addl_district_tag2, 'B'],[:district_name, 'C'], [:school, 'A']], 
									:using => {
                    :tsearch => {:prefix => true},
                  }
  scope :in_nyc_location, -> { where(location_id: Location.find_by(loc_code:"nyc").id
  	)}

	pg_search_scope :search_ros_schools, 
									:against => [[:district_name, 'B'],[:district_code, 'C'], [:school, 'A']],
									:using => {
                    :tsearch => {:prefix => true},
                  }
  scope :in_ros_location, -> { where(location_id: Location.find_by(loc_code:"ros").id )}

  def self.districts_arr(num,field)
  	districts = Location.find(num).schools.pluck(:"#{field}").uniq
  	districts.delete_if { |d| d == nil }
  	districts.sort
  end

  def self.get_district_code(schools_arr, param)
  	district_code = schools_arr.map(&:"#{param}").uniq
  	district_code[0]
  end

  def self.get_district_name(schools_arr, param)
  	district_name = schools_arr.map(&:"#{param}").uniq
  	district_name[0]
  end

  def self.district_schools(num)
		School.where(district_no: num)
	end

	def self.ad_schools(str)
		School.where(assembly_district: str)	
	end

	def self.sd_schools(num)
		School.where(senate_district:num)
	end

	def self.total_enrollment_sum(schools_arr)
		schools_arr.sum(:total_enrollment)
	end

	def self.total_owed_sum(schools_arr)
		schools_arr.sum(:amount_owed)
	end

	def self.amount_per_student(owed, enrollment)
		owed / enrollment
	end

end
