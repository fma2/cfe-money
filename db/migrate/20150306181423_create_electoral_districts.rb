class CreateElectoralDistricts < ActiveRecord::Migration
  def change
    create_table :electoral_districts do |t|
    	t.string :photo
    	t.string :full_name
    	t.string :email
    	t.string :house
    	t.string :district_no
    	t.string :district_name
    	t.string :website
    	t.string :number
    	
      t.timestamps
    end
  end
end
