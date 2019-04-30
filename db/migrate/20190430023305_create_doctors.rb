class CreateDoctors < ActiveRecord::Migration[5.2]
  def change
    create_table :doctors do |t|
      t.string :name
      t.string :crm
      t.string :phone

      t.timestamps
    end
  end
end
