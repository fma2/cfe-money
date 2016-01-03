class WelcomeController < ApplicationController
	# protect_from_forgery except: :index
	def index
		# p params
		# if params["loc_code"] != nil
		# 	p params["loc_code"]
		# 	@location = Location.find_by(loc_code: params["loc_code"])
		# 	if @location.loc_code == "nyc"
		# 		@schools = School.in_nyc_location.search_nyc_schools(params["search"])
		# 		render 'search1.js.erb'
		# 	else
		# 		@schools = School.in_ros_location.search_ros_schools(params["search"])
		# 		render 'search2.js.erb'
		# 	end
		# end
		# @schools

		if params["search_text1"] != nil
			p "hi"
			# @location = params["loc_code"]
			# if params["search_text1"] != nil
			# 	@school = params["search_text1"]
			# else 
			# 	@school = params["search_text2"]
			# end
		end
		@locations = Location.all
	end
end
