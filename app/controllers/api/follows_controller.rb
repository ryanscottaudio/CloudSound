class Api::FollowsController < ApplicationController
  def create
    if logged_in?
      @follow = current_user.followees.new(followee_id: params[:follow][:followee_id])
      @follow.save
      render :show
    else
      redirect_to root_url
    end
  end

  def destroy
    @follow = Follow.find(params[:id])
    if logged_in? && current_user.id == @follow.follower_id
      @follow.destroy
      render :show
    else
      redirect_to root_url
    end
  end
end
