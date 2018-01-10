require "net/http"

class PositionsController < ApplicationController

  before_action :authenticate_user
  before_action :set_positions, only: [:index, :summary]

  def index
    render json: @positions
  end

  def whoami
    @user = current_user
    @user_data = {email: @user.email, name: @user.name}
    render json: @user_data
  end

  def summary
    @summary_data = {current_value: @current_value, original_value: @original_value, gain_loss: @current_value - @original_value}
    render json: @summary_data
  end

  private

  def set_positions
    @positions = []
    @current_value = 0
    @original_value = 0

    @all_positions = current_user.positions.all
    @all_positions.each do |pos|
      coin = Coin.find(pos.coin_id)
      url = "https://api.coinmarketcap.com/v1/ticker/#{coin.api_id}/"
      resp = Net::HTTP.get_response(URI.parse(url))
      data = JSON.parse(resp.body)
      cur_price = data[0]['price_usd'].to_f
      value = pos.shares * cur_price
      @original_value += pos.purchase_price
      @current_value += value
      @positions.push({name: coin.name, symbol: coin.symbol, shares: pos.shares, price: pos.purchase_price, date: pos.purchase_date, value: value})
    end
  end

end
