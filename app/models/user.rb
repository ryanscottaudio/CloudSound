class User < ActiveRecord::Base

  validates :password_digest, :session_token, presence: true
  validates :session_token, uniqueness: true
  validates :password, length: {minimum: 6, allow_nil: true}

  validates :username, uniqueness: true, if: 'username.present?'

  validates :email, presence: true, uniqueness: true, unless: :uid?
  validates :uid, presence: true, uniqueness: {scope: :provider}, unless: :email?

  has_attached_file :image, default_url: "missinguser.png", s3_protocol: ""
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/

  include PgSearch
  multisearchable against: [:display_name, :location]

  has_many :tracks,
    foreign_key: :author_id,
    dependent: :destroy

  has_many :plays,
    foreign_key: :player_id,
    dependent: :destroy

  has_many :played_tracks,
    through: :plays,
    source: :track

  has_many :likes,
    foreign_key: :liker_id,
    dependent: :destroy

  has_many :liked_tracks,
    through: :likes,
    source: :track

  has_many :comments,
    foreign_key: :commenter_id,
    dependent: :destroy

  has_many :commented_tracks,
    through: :comments,
    source: :track

  has_many :followers,
    class_name: "Follow",
    foreign_key: :followee_id

  has_many :followees,
    class_name: "Follow",
    foreign_key: :follower_id

  has_many :user_followers,
    through: :followers,
    source: :follower

  has_many :user_followees,
    through: :followees,
    source: :followee

  has_many :feed_tracks,
    through: :user_followees,
    source: :tracks

  after_initialize :ensure_session_token

  attr_reader :password

  def self.generate_session_token
    SecureRandom.urlsafe_base64
  end

  def self.find_by_credentials(email, password)
    user = User.find_by(email: email)
    user && user.is_password?(password) ? user : nil
  end

  def self.find_or_create_by_auth_hash(auth_hash)
    print auth_hash

    user = User.find_by(
      uid: auth_hash[:uid],
      provider: auth_hash[:provider])

    unless user
      user = User.create!(
        uid: auth_hash[:uid],
        provider: auth_hash[:provider],
        fname: auth_hash[:info][:name].split(" ").first,
        lname: auth_hash[:info][:name].split(" ").last,
        password: SecureRandom.urlsafe_base64
      )
    end

    user
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def reset_session_token!
    self.session_token = User.generate_session_token
    self.save!
  end

  def ensure_session_token
    self.session_token ||= User.generate_session_token
  end

end
