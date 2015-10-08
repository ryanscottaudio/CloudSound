class SiteController < ApplicationController

  def root
    render :root
  end

  def find_by_username
    user = User.find_by(username: params[:username])
    @user_id = (user ? user.id : -1)
    render :root
  end

end
