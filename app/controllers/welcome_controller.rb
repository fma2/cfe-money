class WelcomeController < ApplicationController
	def index
		@locations = Location.all
	end

	def why
	end

	def how
	end

	def resources
	end
	
end
