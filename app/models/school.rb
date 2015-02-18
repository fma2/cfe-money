class School < ActiveRecord::Base
	include PgSearch
	pg_search_scope :search_schools, 
									:against => [[:district_code, 'B'],[:district_name, 'C'], [:school, 'A']], 
									:using => {
                    :tsearch => {:prefix => true},
                  }
  	
  def self.districts_arr(field)
  	districts = School.pluck(:"#{field}").uniq
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

	def self.district_enrollment_sum(schools_arr)
		schools_arr.sum(:total_enrollment)
	end

	def self.district_owed_sum(schools_arr)
		schools_arr.sum(:amount_owed)
	end



end
