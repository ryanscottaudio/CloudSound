class Api::LikesController < ApplicationController
  def create
    @like = Like.new
    @like.liker_id = current_user.id
    @like.track_id = params[:track_id]
    @like.save
  end

  def destroy
    @like = Like.find_by(track_id: params[:track_id], liker_id: current_user.id)
    @like.destroy
  end
end
