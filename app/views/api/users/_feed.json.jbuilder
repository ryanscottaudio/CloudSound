tracks = []
user.user_followees.each do |followee|
  followee.tracks.each  do |track|
    tracks << track
  end
end
json.display_tracks do
  json.array! tracks.each do |track|
    json.partial!('api/tracks/feed', track: track)
  end
end
