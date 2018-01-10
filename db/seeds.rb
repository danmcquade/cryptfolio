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

dan = User.new
dan.email = 'dan@gmail.com'
dan.password = 'test'
dan.password_confirmation = 'test'
dan.admin = true
dan.save

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

dan.positions.create(shares: 3, purchase_price: 42000.99, purchase_date: '2017-05-26', coin_id: BTC.id)
dan.positions.create(shares: 10, purchase_price: 1750.20, purchase_date: '2017-07-02', coin_id: LTC.id)
dan.positions.create(shares: 50, purchase_price: 25789.75, purchase_date: '2017-09-28', coin_id: ZEC.id)
