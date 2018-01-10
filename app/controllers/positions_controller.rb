class PositionsController < ApplicationController
  before_action :authenticate_user
  def index
    @positions = current_user.positions.all
    render json: @positions
  end
end
