class Api::PlaysController < ApplicationController
  def create
    @play = current_user.likes.new(track_id: params[:track_id])
    @play.save
  end
end
