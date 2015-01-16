class SchoolsController < ApplicationController

	def index
		
	end
	
	def search
		# @results = PgSearch.multisearch(params["search"])
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
end
