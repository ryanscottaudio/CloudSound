class Track < ActiveRecord::Base


  has_attached_file :audio, s3_protocol: ""
  validates_attachment_presence :audio
  validates_attachment_content_type :audio, content_type: /\Aaudio\/.*\Z/

  has_attached_file :image, default_url: "missingtrackpic.png"
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/
  validates_attachment_size :image, less_than: 2.megabytes
  validates :author_id, :title, :url, presence: true
  validates :url, uniqueness: true

  belongs_to :author,
    class_name: "User"

  has_many :plays, dependent: :destroy

  has_many :listeners,
    through: :plays,
    source: :player

  has_many :likes, dependent: :destroy

  has_many :likers,
    through: :likes,
    source: :liker

  has_many :comments, dependent: :destroy

  has_many :commenters,
    through: :comments,
    source: :commenter

end
