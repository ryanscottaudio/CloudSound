json.tracks do
  json.array! @tracks.each do |track|
    json.partial!('api/tracks/track', track: track)
  end
end
json.last_page @total_pages
