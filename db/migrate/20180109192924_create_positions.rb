class CreatePositions < ActiveRecord::Migration[5.1]
  def change
    create_table :positions do |t|
      t.integer :shares
      t.decimal :purchase_price
      t.date :purchase_date
      t.references :user, foreign_key: true
      t.references :coin, foreign_key: true
      t.timestamps
    end
  end
end
