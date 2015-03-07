class CreateElectoralDistricts < ActiveRecord::Migration
  def change
    create_table :electoral_districts do |t|
    	t.string :photo
    	t.string :first_name
    	t.string :last_name
    	t.string :full_name
    	t.string :email
    	t.string :house
    	t.string :district_no
    	t.string :district_name
    	t.string :website
    	t.string :albany_office_no
    	t.string :do_office_no

      t.timestamps
    end
  end
end
