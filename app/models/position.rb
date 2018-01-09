class Position < ApplicationRecord
  belongs_to :user, dependent: :destroy
end
