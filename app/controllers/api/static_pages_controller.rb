class Api::StaticPagesController < ApplicationController

  def search
    @search_results = PgSearch
      .multisearch(params[:query])
      .includes(:searchable)
      .page(params[:page])

    render :search
  end

  def explore
    @tracks = Track.order('created_at DESC').page(params[:page])

    render :index
  end

  def feed
    @tracks = current_user.feed_tracks.order('created_at DESC').page(params[:page])

    render :index
  end

end
