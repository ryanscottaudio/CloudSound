json.extract!(user, :id, :display_name, :username)
json.image_url asset_path(user.image.url(:original))

if !short
  json.follows user.followers.to_a.count
  json.tracks user.tracks.to_a.count
  json.followers do
    json.array! user.followers do |follower|
      json.partial!('api/follows/follow', follow: follower)
    end
  end
  if !medium
    json.extract!(user, :location, :fname, :lname)
  end
end
