class SessionsController < ApplicationController
  def new
    @user = User.new
    render :new
  end

  def create
    @user = User.find_by_credentials(user_params[:email], user_params[:password])
    if @user
      log_in!(@user)
      redirect_to user_url(@user)
    else
      flash.now[:errors] = "We couldn’t sign you in, sure you had the right credentials?"
      @user = User.new(email: user_params[:email])
      render :new
    end
  end

  def destroy
    log_out!
    redirect_to new_session_url
  end

  private
  def user_params
    params.require(:user).permit(:email, :password, :remember)
  end
end
