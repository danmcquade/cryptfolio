class User < ApplicationRecord
  include Gravtastic
  gravtastic
  has_secure_password
  has_many :positions, dependent: :destroy
end
