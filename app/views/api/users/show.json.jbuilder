json.partial!('api/users/user', user: @user)
json.tracks do
  json.array! @user.tracks do |track|
    json.partial!('api/tracks/track', track: track)
  end
end
