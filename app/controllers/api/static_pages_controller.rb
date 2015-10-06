class Api::StaticPagesController < ApplicationController

  def search
    @search_results = PgSearch
      .multisearch(params[:query])
      .includes(:searchable)
      .page(params[:page])
    @total_pages = @search_results.total_pages

    render :search
  end

  def explore
    @tracks = Track.order('created_at DESC').page(params[:page])
    @total_pages = @tracks.total_pages

    render :index
  end

  def feed
    @tracks = current_user.feed_tracks.order('created_at DESC').page(params[:page])
    @total_pages = @tracks.total_pages

    render :index
  end

end
