class User < ApplicationRecord
  has_secure_password
  has_many :positions, dependent: :destroy
end
