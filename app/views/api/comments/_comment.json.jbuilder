json.extract!(comment, :content, :time, :created_at)
json.author do
  json.partial!('api/users/user', user: comment.author, short: true)
end
