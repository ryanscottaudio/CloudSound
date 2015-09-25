json.extract!(track, :id, :title, :created_at)
json.audio_url asset_path(track.audio.url(:original))
json.image_url asset_path(track.image.url(:original))
json.author do
  json.partial!('api/users/user', user: track.author, short: true)
end
json.plays track.plays.to_a.count
json.likes do
  json.array! track.likes do |like|
    json.partial!('api/likes/like', like: like)
  end
end
json.comments do
  json.array! track.comments do |comment|
    json.partial!('api/comments/comment', comment: comment)
  end
end
