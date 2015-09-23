json.extract!(user, :id, :display_name, :username)
json.image_url asset_path(user.image.url(:original))

if !short
  if !medium
    json.extract!(user, :location, :fname, :lname)
  end
  # json.followers user.followers.count
  json.tracks user.tracks.to_a.count
end
