class Play < ActiveRecord::Base

  validates :track_id, presence: true

  belongs_to :track

  belongs_to :player,
    class_name: "User"

end
