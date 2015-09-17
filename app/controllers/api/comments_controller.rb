class Api::CommentsController < ApplicationController
  def create
    @comment = current_user.comments.new(comment_params)
    @comment.track_id = params[:track_id]
    @comment.save
  end

  def show
    @comment = Comment.find(params[:id])
    render :show
  end

  def destroy
    @comment = Comment.find(params[:id])
    @comment.destroy
  end

  private
  def comment_params
    params.require(:comment).permit(:content, :time)
  end
end
