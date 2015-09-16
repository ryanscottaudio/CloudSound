class Comment < ActiveRecord::Base

  validates :commenter_id, :track_id, :content, presence: true

  belongs_to :track

  belongs_to :commenter,
    class_name: "User"

end
