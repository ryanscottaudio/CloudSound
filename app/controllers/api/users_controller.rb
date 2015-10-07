class Api::UsersController < ApplicationController
  def show
    @user = User.includes(:likes, :comments).find(params[:id])
    @tracks = @user.tracks.order('created_at DESC').page(params[:page])
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
    end
  end

  def update
    @user = User.find(params[:id])
    if logged_in? && current_user.id = @user.id
      if @user.update(update_params)
        render :show
      else
        render json: @user.errors.full_messages, status: :unprocessable_entity
      end
    else
      redirect_to root_url
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
