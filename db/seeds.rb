require 'csv' 
require 'faraday'

School.delete_all   

location = Location.first
url = URI(location.endpoint)
connection = Faraday.new(url: url.to_s)
response = connection.get
collection = JSON.parse(response.body)

collection.each do |item|
	location.schools << School.create!(item)
end