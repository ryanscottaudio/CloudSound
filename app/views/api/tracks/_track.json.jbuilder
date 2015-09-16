json.extract!(track, :title, :created_at)
json.author do
  json.partial!('api/users/user', user: track.author, medium: true)
end
json.plays track.plays.count
json.likes track.likes.count
json.comments do
  json.array! track.comments do |comment|
    json.partial!('api/comments/comment', comment: comment)
  end
end
