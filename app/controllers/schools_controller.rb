class SchoolsController < ApplicationController

	def index
		
	end
	
	def search
		# @results = PgSearch.multisearch(params["search"])
		@results = School.search_schools(params["search"])
	end

	def show
		#AJAX to get info on single
	end

end
