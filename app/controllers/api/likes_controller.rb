class Api::LikesController < ApplicationController
  def create
    @like = current_user.likes.new(track_id: params[:track_id])
    @like.save
    render :show
  end

  def destroy
    @like = Like.find_by(track_id: params[:track_id], liker_id: current_user.id)
    @like.destroy
    render :show
  end
end
