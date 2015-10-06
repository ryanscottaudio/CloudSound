json.items do
  json.array! @search_results do |search_result|
    if search_result.searchable_type == "Track"
      json.partial! "api/tracks/feed", track: search_result.searchable
      json._type "Track"
    elsif search_result.searchable_type == "User"
      json.partial!('api/users/user', user: search_result.searchable, short: false, medium: true)
      json._type "User"
    end
  end
end
json.last_page @total_pages
