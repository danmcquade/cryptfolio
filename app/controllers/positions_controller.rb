require "net/http"

class PositionsController < ApplicationController
  before_action :authenticate_user
  def index
    @position_data = []
    @positions = current_user.positions.all
    @positions.each do |pos|
      coin = Coin.find(pos.coin_id)
      url = "https://api.coinmarketcap.com/v1/ticker/#{coin.api_id}/"
      resp = Net::HTTP.get_response(URI.parse(url))
      data = JSON.parse(resp.body)
      cur_price = data[0]['price_usd'].to_f
      value = pos.shares * cur_price
      @position_data.push({name: coin.name, symbol: coin.symbol, shares: pos.shares, price: pos.purchase_price, date: pos.purchase_date, value: value})
    end
    render json: @position_data
  end
end
