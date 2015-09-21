json.array! @users.each do |user|
  json.partial!('api/users/user', user: user, short: false, medium: true)
end
