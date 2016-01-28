class DistrictsController < ApplicationController
	def index
	end

	def school_districts
		location_id = Location.find_by(loc_code: "nyc").id
		districts_num_list = School.districts_arr(location_id, :district_no)
		@json = Array.new
		districts_num_list.each do |d|
			schools_in_district = School.district_schools(d)
			@json << {
				code: School.get_district_code(schools_in_district, :district_code),
				district: School.get_district_name(schools_in_district, :district_name),
				total_enrollment: School.total_enrollment_sum(schools_in_district),
				amount_owed: School.total_owed_sum(schools_in_district)

			}
		end
		respond_to do |format|
			format.html
			format.json { render json: @json }
		end
	end

	def electoral_districts
		leg_chamber = params[:leg_chamber]
		leg_district = params[:leg_district]
		schools_in_district = Array.new
		if leg_chamber == "upper"
			schools_in_district = School.where(senate_district: leg_district)
		elsif leg_chamber == "lower"
			schools_in_district = School.where(assembly_district: leg_district)
		end

		schools_list = schools_in_district.map do |school|
			school.school
		end

		@json = Array.new
		@json << {
			total_enrollment: School.total_enrollment_sum(schools_in_district),
			amount_owed: School.total_owed_sum(schools_in_district),
			schools: schools_list.sort
		}
		respond_to do |format|
			format.html
			format.json { render json: @json }
		end
	end
end
