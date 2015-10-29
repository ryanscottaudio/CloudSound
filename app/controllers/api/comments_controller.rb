class Api::CommentsController < ApplicationController
  def create
    if logged_in?
      @comment = current_user.comments.new(comment_params)
      @comment.save
      render :show
    end
  end

  # def show
  #   @comment = Comment.find(params[:id])
  #   render :show
  # end
  #
  # def index
  #   @comments = Comment.where(track_id: params[:track_id])
  #   render :index
  # end

  def destroy
    @comment = Comment.find(params[:id])
    if logged_in? && current_user.id == @comment.commenter_id
      @comment.destroy
    end
  end

  private
  def comment_params
    params.require(:comment).permit(:content, :time, :track_id)
  end
end
