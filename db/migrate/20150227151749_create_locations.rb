class CreateLocations < ActiveRecord::Migration
  def change
    create_table :locations do |t|
    	t.string :name
    	t.string :loc_code
    	t.string :endpoint
    	
      t.timestamps
    end
  end
end
