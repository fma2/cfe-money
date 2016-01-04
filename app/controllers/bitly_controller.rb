class BitlyController < ApplicationController
	def new
		# u = Bitly.client.shorten(params["url"])
		u = Bitly.client.shorten("http://cfemoneyowednys.org")
		p u
		p u.short_url
		# p u
		# if !(u)
		# 	u = Bitly.client.shorten("http://cfemoneyowednys.org")
		# 	return @url = u.short_url
		# end
		@json = u.short_url
		respond_to do |format|
			format.html
			format.json { render json: @json }
		end
	end

end