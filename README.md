# CloudSound

[Live link][live]

[Heroku link][heroku]

[live]: http://cloudsound.xyz
[heroku]: http://cloudsoundryancampbell.herokuapp.com

## Features

CloudSound is a SoundCloud-inspired social network for music-makers built on Rails and Backbone. Users can:

- Create accounts
- Create sessions (log in)
- Log in through Facebook using OmniAuth
- Upload tracks using Paperclip; files are hosted on AWS S3
- View and listen to tracks using a representative waveform drawn with wavesurfer.js
- Add track likes and comments
- Follow users
- View a feed of the latest tracks from followed users
- Search for tracks and users using PgSearch and a polymorphic table

## To Do
- Track genres/tags
- Notifications
- Custom user/track urls
- User/track analytics
- Create playlists
- Editing tracks
- Follow suggestions
