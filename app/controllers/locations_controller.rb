class LocationsController < ApplicationController

	def show
	end
	
	def ros_index
		@location = Location.find_by(loc_code:"ros")
		@location_name = @location.name
		@total_owed = School.total_owed_sum(@location.schools)
		@total_enrollment = School.total_enrollment_sum(@location.schools)
		@amount_per_student = School.amount_per_student(@total_owed, @total_enrollment)
	end

	def nyc_index

	end
end
