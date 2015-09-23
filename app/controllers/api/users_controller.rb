class Api::UsersController < ApplicationController
  def show
    @user = User.includes(:likes, :comments, tracks: [:likes, :plays, comments: :commenter]).find(params[:id])
    render :show
  end

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
      render :show
    else
      render json: @user.errors.full_messages, status: :unprocessable_entity
      # flash.now[:email_not_valid] = "Please enter a valid email address" unless params[:user][:email]
      # flash.now[:password_too_short] = "Please enter at least 6 characters." unless params[:user][:password].length >= 6
      # flash.now[:not_matching] = "Oops, that’s not the same password as the first one" unless params[:user][:password] == params[:user][:password_confirmation]
      # flash.now[:did_not_agree] = "Please read and accept the terms first" unless params[:user][:agree]
    end
  end

  def update
    @user = User.find(params[:id])
    if @user.update(update_params)
      render :show
    else
      render json: @user.errors.full_messages, status: :unprocessable_entity
    end
  end

  def index
    @users = User.all
    render :index
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

  def update_params
    params.require(:user).permit(:image, :display_name, :username, :fname, :lname, :location, :email)
  end

end
