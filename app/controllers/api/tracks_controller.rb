class Api::TracksController < ApplicationController
  def create
    @track = current_user.tracks.new(track_params)
    if @track.save
      render :show
    else
      render json: @track.errors.full_messages, status: :unprocessable_entity
    end
  end

  def show
    @track = Track.find(params[:id])
    render :show
  end

  def destroy
    @track = Track.find(params[:id])
    @track.destroy
  end

  private
  def track_params
    params.require(:track).permit(:title, :url, :description, :private, :audio, :image)
  end
end
