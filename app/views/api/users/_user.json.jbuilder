json.extract!(user, :display_name)

if !short
  if !medium
    json.extract!(:location, :fname, :lname)
  end
  json.followers user.followers.count
  json.tracks user.tracks.count
end
