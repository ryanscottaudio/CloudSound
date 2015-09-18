class Api::CommentsController < ApplicationController
  def create
    @comment = current_user.comments.new(comment_params)
    @comment.save
    render :show
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
    @comment.destroy
    render :show
  end

  private
  def comment_params
    params.require(:comment).permit(:content, :time, :track_id)
  end
end
