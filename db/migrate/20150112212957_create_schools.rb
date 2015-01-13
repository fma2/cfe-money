class CreateSchools < ActiveRecord::Migration
  def change
    create_table :schools do |t|
      t.string :dbn
      t.string :school
      t.integer :total_enrollment
      t.float :amount_owed

      t.timestamps
    end
  end
end
