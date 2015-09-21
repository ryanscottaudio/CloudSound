class Api::UsersController < ApplicationController
  def show
    @user = User.includes(:likes, :comments, tracks: [:likes, :plays, comments: :commenter]).find(params[:id])
    render :show
  end
end
