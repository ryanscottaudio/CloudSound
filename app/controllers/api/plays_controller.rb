class Api::PlaysController < ApplicationController
  def create
    @play = Play.new
    @play.player_id = current_user.id
    @play.track_id = params[:track_id]
    @play.save
  end
end
