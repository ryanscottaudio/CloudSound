json.extract!(comment, :id, :content, :time, :created_at, :track_id, :commenter_id)
json.author do
  json.partial!('api/users/user', user: comment.commenter, short: true, medium: false)
end
