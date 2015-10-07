class SiteController < ApplicationController

  def root
    render :root
  end

  def find_by_username
    user = User.find_by(username: params[:username])
    if user
      @user_id = user.id
      render :root
    else
      @user_id = -1
      render :root
    end
  end

end
