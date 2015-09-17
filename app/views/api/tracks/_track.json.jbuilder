json.extract!(track, :id, :title, :created_at)
json.audio_url asset_path(track.audio.url(:original))
json.image_url asset_path(track.image.url(:original))
json.author do
  json.partial!('api/users/user', user: track.author, short: false, medium: true)
end
json.plays track.plays.count
json.likes track.likes.count
json.comments do
  json.array! track.comments do |comment|
    json.partial!('api/comments/comment', comment: comment)
  end
end
