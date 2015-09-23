class Api::SessionsController < ApplicationController

  def show
    if current_user
      @user = current_user
      render :show
    else
      render json: {}
    end
  end

  def new
    @user = User.new
    render :new
  end

  def create
    @user = User.find_by_credentials(user_params[:email], user_params[:password])
    if @user
      log_in!(@user)
      render :show
    else
      head :unprocessable_entity
    end
  end

  def destroy
    log_out!
    render json: {}
  end

  def omniauth
    @user = User.find_or_create_by_auth_hash(omniauth_hash)
    log_in!(@user)
    redirect_to root_url
  end

  private
  def user_params
    params.require(:user).permit(:email, :password, :remember)
  end

  def omniauth_hash
    request.env["omniauth.auth"]
  end
end
