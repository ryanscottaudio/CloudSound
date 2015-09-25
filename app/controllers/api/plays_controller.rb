class Api::PlaysController < ApplicationController
  def create
    if logged_in?
      @play = current_user.plays.new(track_id: params[:track_id])
    else
      @play = Play.new(track_id: params[:track_id])
    end
    @play.save
    render :show
  end
end
