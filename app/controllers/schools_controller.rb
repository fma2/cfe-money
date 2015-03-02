class SchoolsController < ApplicationController

	def index
		@location = Location.find_by(loc_code:"ros")
		@location_name = @location.name
		@total_owed = School.total_owed_sum(@location.schools)
		@total_enrollment = School.total_enrollment_sum(@location.schools)
		@amount_per_student = School.amount_per_student(@total_owed, @total_enrollment)
	end

	def search
		@location = Location.find(params["id"])
		if @location.loc_code == "nyc"
			@results = School.in_nyc_location.search_nyc_schools(params["search"])
			render 'search1.js.erb'
		else
			@results = School.in_ros_location.search_ros_schools(params["search"])
			render 'search2.js.erb'
		end
	end

	def random40
		@json = Array.new
		20.times do
			offset = rand(School.count)
			rand_record = School.offset(offset).first
			@json << {
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
		districts_num_list = School.districts_arr(:district_no)
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
		ad_districts_list = School.districts_arr(:assembly_district)
		sd_districts_list = School.districts_arr(:senate_district)
		@json = Array.new
		ad_districts_list.each do |d|
			schools_in_district = School.ad_schools(d)
			@json << {
				code: "AD" + d,
				district: "AD" + School.get_district_name(schools_in_district, :assembly_district),
				total_enrollment: School.total_enrollment_sum(schools_in_district),
				amount_owed: School.total_owed_sum(schools_in_district)
			}
		end
		sd_districts_list.each do |d|
			schools_in_district = School.sd_schools(d)
			@json << {
				code: "SD" + d.to_s,
				district: "SD" + School.get_district_name(schools_in_district, :senate_district).to_s,
				total_enrollment: School.total_enrollment_sum(schools_in_district),
				amount_owed: School.total_owed_sum(schools_in_district)
			}
		end
		respond_to do |format|
			format.html
			format.json { render json: @json }
		end
	end

end
