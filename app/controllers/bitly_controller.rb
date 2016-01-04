class BitlyController < ApplicationController
	def new
		@json = Array.new
		@json << Bitly.client.shorten(params["url"]).short_url
		respond_to do |format|
			format.html
			format.json { render json: @json }
		end
	end

end