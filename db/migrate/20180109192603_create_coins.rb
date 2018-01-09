class CreateCoins < ActiveRecord::Migration[5.1]
  def change
    create_table :coins do |t|
      t.string :name
      t.string :symbol
      t.string :api_id
      t.timestamps
    end
  end
end
