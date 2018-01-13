class Position < ApplicationRecord
  belongs_to :user
  validates :shares, :presence => true
  validates :purchase_price, :presence => true
  validates :purchase_date, :presence => true
end
