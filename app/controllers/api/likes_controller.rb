class Api::LikesController < ApplicationController
  def create
    if logged_in?
      @like = current_user.likes.new(track_id: params[:track_id])
      @like.save
      render :show
    else
      redirect_to root_url
    end
  end

  def destroy
    @like = Like.find(params[:id])
    if logged_in? && current_user.id = @like.liker_id
      @like.destroy
      render :show
    else
      redirect_to root_url
    end
  end
end
