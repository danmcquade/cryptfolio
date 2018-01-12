require "net/http"

class CoinsController < ApplicationController

  def index
    @coin_data = []
    @coins = Coin.all
    @coins.each do |coin|
      url = "https://api.coinmarketcap.com/v1/ticker/#{coin.api_id}/"
      resp = Net::HTTP.get_response(URI.parse(url))
      data = JSON.parse(resp.body)
      @coin_data.push(data[0])
    end
    render json: @coin_data
  end

  def show
    @coin = Coin.find_by(api_id: params[:id])
    url = "https://api.coinmarketcap.com/v1/ticker/#{params[:id]}/"
    resp = Net::HTTP.get_response(URI.parse(url))
    data = JSON.parse(resp.body)
    render json: data
  end

  def symbol_lookup
    @coin = Coin.find_by(symbol: params[:id])
    url = "https://api.coinmarketcap.com/v1/ticker/#{@coin.api_id}/"
    resp = Net::HTTP.get_response(URI.parse(url))
    data = JSON.parse(resp.body)
    render json: data
  end

  def list
    @coins = Coin.all
    render json: @coins
  end

end
