class Like < ActiveRecord::Base

  validates :liker_id, :track_id, presence: true
  validates :track_id, uniqueness: {scope: :liker_id}

  belongs_to :track

  belongs_to :liker,
    class_name: "User"

end
