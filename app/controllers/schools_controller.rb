class SchoolsController < ApplicationController

	def search
		@location = Location.find_by(loc_code: params["loc_code"])
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
	
end
