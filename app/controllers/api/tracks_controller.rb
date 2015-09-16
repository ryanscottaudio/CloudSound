class Api::TracksController < ApplicationController
  def create
    @track = Track.new(track_params)
    @track.author_id = current_user.id
    if @track.save
      render json: @track
    else
      render json: @track.errors.full_messages, status: :unprocessable_entity
    end
  end

  def show
    @track = Track.find(params[:id])
    render json: @track
  end

  def destroy
    @track = Track.find(params[:id])
    @track.destroy
  end

  private
  def track_params
    params.require(:user).permit(:title, :url, :description, :private)
  end
end
