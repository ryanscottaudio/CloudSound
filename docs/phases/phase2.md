# Phase 2: Track Creation and Interaction

## Rails
### Models
* Track

### Controllers
Api::TracksController (new, create, destroy, index, show, edit, update)
Api::UsersController (show)

### Views
* tracks/index.json.jbuilder
* tracks/show.json.jbuilder
* users/show.json.jbuilder


## Backbone
### Models
* Track
* User (parses nested tracks association)

### Collections
* Tracks
* Users

### Views
* UserShow (composite view, contains TracksIndex subview)
* UserForm
* TrackForm
* TrackShow
* TracksIndex (composite view, contains TracksIndexItem subviews)
* TracksIndexItem
* PostShow

## Gems/Libraries
* Paperclip
