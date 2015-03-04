class WelcomeController < ApplicationController
	def index
		@locations = Location.all
		@totals = Array.new
		Location.all.each do |l |
			total_owed = School.total_owed_sum(l.schools)
			total_enrollment = School.total_enrollment_sum(l.schools)
			@totals << {
								l.loc_code => {
										id: l.id,
										location_name: l.name,
										total_owed: total_owed,
										total_enrollment: total_enrollment,
										amount_per_student: School.amount_per_student(total_owed, total_enrollment)
								} 
								}	
		end
		@totals
	end
end
