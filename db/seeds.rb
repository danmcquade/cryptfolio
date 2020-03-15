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

dan = User.create(email: 'dan@danmcq.com', name: 'Dan McQuade', password: 'test', password_confirmation: 'test', admin: true)

BTC = Coin.create(name: 'Bitcoin', symbol: 'BTC', api_id: '90')
LTC = Coin.create(name: 'Litecoin', symbol: 'LTC', api_id: '1')
ZEC = Coin.create(name: 'Zcash', symbol: 'ZEC', api_id: '134')
BCH = Coin.create(name: 'Bitcoin Cash', symbol: 'BCH', api_id: '2321')
Coin.create(name: 'Ethereum', symbol: 'ETH', api_id: '80')
Coin.create(name: 'Ripple', symbol: 'XRP', api_id: '58')
Coin.create(name: 'Monero', symbol: 'XMR', api_id: '28')
Coin.create(name: 'NEM', symbol: 'XEM', api_id: '70')
Coin.create(name: 'Dash', symbol: 'DASH', api_id: '8')
Coin.create(name: 'IOTA', symbol: 'MIOTA', api_id: '447')

dan.positions.create(shares: 3, purchase_price: 42000.99, purchase_date: '2017-05-26', coin_id: BTC.id)
dan.positions.create(shares: 10, purchase_price: 1750.20, purchase_date: '2017-07-02', coin_id: LTC.id)
dan.positions.create(shares: 50, purchase_price: 25789.75, purchase_date: '2017-09-28', coin_id: ZEC.id)
dan.positions.create(shares: 5, purchase_price: 13750.65, purchase_date: '2017-12-12', coin_id: BCH.id)
