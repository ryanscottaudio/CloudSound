class Track < ActiveRecord::Base

  validates :author_id, :title, :url, :private, presence: true
  validates :url, uniqueness: true

  has_attached_file :image, default_url: "missingtrack.png"
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/

  belongs_to :author,
    class_name: "User"

  has_many :plays

  has_many :listeners,
    through: :plays,
    source: :player

  has_many :likes

  has_many :likers,
    through: :likes,
    source: :liker

  has_many :comments

  has_many :commenters,
    through: :comments,
    source: :commenter

end
