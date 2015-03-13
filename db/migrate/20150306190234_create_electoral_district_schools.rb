class CreateElectoralDistrictSchools < ActiveRecord::Migration
  def change
    create_table :electoral_district_schools do |t|
    	t.references :electoral_district
    	t.references :school

      t.timestamps
    end
  end
end
