class Api::TracksController < ApplicationController

  def create
    if logged_in?
      @track = current_user.tracks.new(track_params)
      if @track.save
        render :show
      else
        render json: @track.errors.full_messages, status: :unprocessable_entity
      end
    else
      redirect_to root_url
    end
  end

  def show
    @track = Track.includes(:likes, :plays, comments: :commenter, author: :tracks).find(params[:id])
    render :show
  end

  def destroy
    @track = Track.find(params[:id])
    if logged_in? && current_user.id == @track.author_id
      @track.destroy
    else
      redirect_to root_url
    end
  end

  def index
    @tracks = Track.where(author_id: params[:user_id]).order('created_at DESC').page(params[:page])

    render :index
  end

  private
  def track_params
    params.require(:track).permit(:title, :url, :description, :private, :audio, :image)
  end

end
