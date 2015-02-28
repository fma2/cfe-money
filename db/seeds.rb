require 'csv' 
require 'faraday'

Location.delete_all
School.delete_all   

# Seed Locations
loc_url = URI("https://cfe-data.herokuapp.com/locations")
connection = Faraday.new(url: loc_url.to_s)
response = connection.get
collection = JSON.parse(response.body)
collection.each do |item|
	Location.create!(item)
end


# Seed Schools
locations = Location.all
locations.each do |l|
	location = l
	schools_url = URI(location.endpoint)
	connection = Faraday.new(url: schools_url.to_s)
	response = connection.get
	collection = JSON.parse(response.body)

	collection.each do |item|
		location.schools << School.create!(item)
	end
end