json.extract!(track, :id, :title)
json.author do
  json.partial!('api/users/user', user: track.author, short: true, medium: false)
endtrack.author
json.plays track.plays.to_a.count
json.likes track.likes.to_a.count
json.comments track.comments.to_a.count
