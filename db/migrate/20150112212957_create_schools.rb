class CreateSchools < ActiveRecord::Migration
  def change
    create_table :schools do |t|
    	t.string :dbn
      t.string :school
      t.integer :total_enrollment
      t.float :amount_owed
      t.string :district_name
      t.integer :district_no
      t.string :district_code
      t.integer :assembly_district
      t.integer :senate_district
      t.string :addl_district_tag1
      t.string :addl_district_tag2
      t.references :location

      t.timestamps
    end
  end
end
