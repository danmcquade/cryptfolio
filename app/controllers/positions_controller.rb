require "net/http"

class PositionsController < ApplicationController

  before_action :authenticate_user
  before_action :set_positions, only: [:index, :summary, :delete]

  def index
    render json: @positions
  end

  def show
    @position = Position.find(params["id"])
    coin = Coin.find(@position.coin_id)
    @position_data = {id: @position.id, name: coin.name, symbol: coin.symbol, shares: @position.shares, price: @position.purchase_price.round(2), date: @position.purchase_date}
    render json: @position_data
  end

  def create
    user = current_user
    coin = Coin.find_by(symbol: params["currency"])
    user.positions.create(shares: params["shares"], purchase_price: params["purchase_price"], purchase_date: params["purchase_date"], coin_id: coin.id)
  end

  def update
    @position = Position.find(params["position_id"])
    @coin = Coin.find_by(symbol: params["currency"])
    @position.update(shares: params["shares"], purchase_price: params["purchase_price"], purchase_date: params["purchase_date"], coin_id: @coin.id)
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

  def delete
    Position.destroy(params[:id])
    set_positions
    render json: @positions
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
      @positions.push({id: pos.id, api_id: coin.api_id, name: coin.name, symbol: coin.symbol, shares: pos.shares, price: pos.purchase_price, date: pos.purchase_date, value: value})
    end
  end

end
