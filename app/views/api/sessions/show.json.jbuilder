json.partial!('api/users/user', user: @user, short: false, medium: false)
json.partial!('api/users/feed', user: current_user)
