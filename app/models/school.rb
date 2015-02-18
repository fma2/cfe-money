class School < ActiveRecord::Base
	include PgSearch
	pg_search_scope :search_schools, 
									:against => [[:district_code, 'B'],[:district_name, 'C'], [:school, 'A']], 
									:using => {
                    :tsearch => {:prefix => true},
                  }
  	
  def self.districts_num_arr
  	districts = School.select(:district_no).map(&:district_no).uniq
  	districts.delete_if { |d| d == nil }
  	districts.sort
  end

  def self.get_district_code(schools_arr)
  	district_code = schools_arr.map(&:district_code).uniq
  	district_code[0]
  end

  def self.get_district_name(schools_arr)
  	district_name = schools_arr.map(&:district_name).uniq
  	district_name[0]
  end

  def self.district_schools(num)
		School.where(district_no: num)
	end

	def self.district_enrollment_sum(schools_arr)
		schools_arr.sum(:total_enrollment)
	end

	def self.district_owed_sum(schools_arr)
		schools_arr.sum(:amount_owed)
	end

	def self.ad_schools(num)
	end

end
