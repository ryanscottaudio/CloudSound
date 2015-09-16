json.extract!(track, :title)
json.author do
  json.partial!('api/users/user', user: track.author, short: true)
endtrack.author
json.plays track.plays.count
json.likes track.likes.count
json.comments track.comments.count
