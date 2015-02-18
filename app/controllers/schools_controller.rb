class SchoolsController < ApplicationController

	def index
		
	end
	
	def search
		@results = School.search_schools(params["search"])
	end

	def random40
		@json = Array.new
		20.times do
			offset = rand(School.count)
			rand_record = School.offset(offset).first
			@json << {
				dbn: rand_record.dbn,
				school: rand_record.school,
				total_enrollment: rand_record.total_enrollment,
				amount_owed: rand_record.amount_owed
			}
		end
		respond_to do |format|
			format.html
			format.json { render json: @json }
		end
	end

	def districts
		districts_num_list = School.districts_num_arr
		@json = Array.new
		districts_num_list.each do |d|
			schools_in_district = School.district_schools(d)
			@json << {
				code: School.get_district_code(schools_in_district),
				district: School.get_district_name(schools_in_district),
				total_enrollment: School.district_enrollment_sum(schools_in_district),
				amount_owed: School.district_owed_sum(schools_in_district)
			}
		end
		respond_to do |format|
			format.html
			format.json { render json: @json }
		end
	end
end
