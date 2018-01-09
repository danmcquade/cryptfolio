# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
User.destroy_all
Coin.destroy_all
Position.destroy_all

admin = User.new
admin.email = 'dan@gmail.com'
admin.password = 'test'
admin.password_confirmation = 'test'
admin.admin = true
admin.save


BTC = Coin.create(name: 'Bitcoin', symbol: 'BTC', api_id: 'bitcoin')
LTC = Coin.create(name: 'Litecoin', symbol: 'LTC', api_id: 'litecoin')
ZEC = Coin.create(name: 'Zcash', symbol: 'ZEC', api_id: 'zcash')
Coin.create(name: 'Bitcoin Cash', symbol: 'BCH', api_id: 'bitcoin-cash')
Coin.create(name: 'Ethereum', symbol: 'ETH', api_id: 'ethereum')
Coin.create(name: 'Ripple', symbol: 'XRP', api_id: 'ripple')
Coin.create(name: 'Monero', symbol: 'XMR', api_id: 'monero')
Coin.create(name: 'NEM', symbol: 'XEM', api_id: 'nem')
Coin.create(name: 'Dash', symbol: 'DASH', api_id: 'dash')
Coin.create(name: 'IOTA', symbol: 'XEM', api_id: 'iota')
