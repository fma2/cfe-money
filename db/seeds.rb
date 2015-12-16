require 'csv' 
require 'faraday'

Location.delete_all
School.delete_all 
ElectoralDistrict.delete_all
ElectoralDistrictSchool.delete_all

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
	p l
	location = l
	schools_url = URI(location.endpoint)
	connection = Faraday.new(url: schools_url.to_s)
	response = connection.get
	collection = JSON.parse(response.body)

	collection.each do |item|
		location.schools << School.create!(item)
	end
end

# Seed Electoral Districts

# assembly districts
assembly_districts_url = URI('https://raw.githubusercontent.com/fma2/nys-legislators-data/master/public/nys-assembly-members-2015.json')
connection = Faraday.new(url: assembly_districts_url.to_s)
response = connection.get
collection = JSON.parse(response.body)
collection.each do |item|
	district_no = item['district'].split(' ')[1]
	if district_no.length == 2
		district_no = "0#{district_no}"
	end
	ElectoralDistrict.create!(
			photo: item["photo"],
			first_name: item["first_name"],
			last_name: item["last_name"],
			full_name: item["full_name"],
			email: item["email"],
			house: "AD",
			district_no: district_no,
			district_name: item["district"],
			website: item["site"],
			albany_office_no: item["albany_office_no"],
			do_office_no: item["do_office_no"],
		)
end

# senate districts
senate_districts_url = URI('https://raw.githubusercontent.com/fma2/nys-legislators-data/master/public/nys-senate-members-2015.json')
connection = Faraday.new(url: senate_districts_url.to_s)
response = connection.get
collection = JSON.parse(response.body)
collection.each do |item|	
	albany_office = item["contact"].select {|x| x["address_title"] == "Albany Office"}
	ElectoralDistrict.create!(
			photo: item["photo"],
			first_name: item["first_name"],
			last_name: item["last_name"],
			full_name: item["full_name"],
			email: item["email"],
			house: "SD",
			district_no: "#{item['district'].split(' ')[1]}",
			district_name: item["district"],
			website: item["site"],
			albany_office_no: albany_office[0]["phone"],
			# social_facebook: item["social_facebook"],
			# social_twitter: item["social_twitter"]
			# do_office_no: ?,
		)
end

#seed join table with assembly member info
School.all.each do |school|
	p school
	district = ElectoralDistrict.where(district_no: school.assembly_district, house: "AD")
	p district
	# district = ElectoralDistrict.find_by(district_no: school.assembly_district)
	if district != [] 
		ElectoralDistrictSchool.create(school_id: school.id, electoral_district_id: district[0].id)
	end
end

#seed join table with senate member info
School.all.each do |school|
	district = ElectoralDistrict.where(district_no: school.senate_district.to_s, house: "SD")
	# district = ElectoralDistrict.find_by(district_no: school.senate_district.to_s) #5
	if district !=[]
		ElectoralDistrictSchool.create(school_id: school.id, electoral_district_id: district[0].id)
	end
end
