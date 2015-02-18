require 'csv' 

School.delete_all   

csv_text = File.read('db/cfe-money-new-data-feb15.csv')
csv = CSV.parse(csv_text, :headers => true)
csv.each do |row|
  School.create!(row.to_hash)
end