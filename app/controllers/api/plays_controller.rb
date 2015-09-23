class Api::PlaysController < ApplicationController
  def create
    @play = current_user.plays.new(track_id: params[:track_id])
    @play.save
    render :show
  end
end
