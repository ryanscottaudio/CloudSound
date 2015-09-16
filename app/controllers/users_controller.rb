class UsersController < ApplicationController
  def new
    @user = User.new
    render :new
  end

  def create
    @user = User.new(user_params)
    if params[:user][:agree] &&
        params[:user][:password] == params[:user][:password_confirmation] &&
        @user.save
      log_in!(@user)
      redirect_to user_url(@user.id)
    else
      flash.now[:email_not_valid] = "Please enter a valid email address" unless params[:user][:email]
      flash.now[:password_too_short] = "Please enter at least 6 characters." unless params[:user][:password].length >= 6
      flash.now[:not_matching] = "Oops, that’s not the same password as the first one" unless params[:user][:password] == params[:user][:password_confirmation]
      flash.now[:did_not_agree] = "Please read and accept the terms first" unless params[:user][:agree]
      render :new
    end
  end

  # def destroy
  #   User.find(params[:id]).destroy
  #   log_out!
  #   redirect_to new_session_url
  # end

  private
  def user_params
    params.require(:user).permit(:email, :password)
  end
end
