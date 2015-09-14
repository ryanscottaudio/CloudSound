# CloudSound

[Heroku link][heroku]

[heroku]: http://cloudsoundryancampbell.herokuapp.com

## Minimum Viable Product
CloudSound is a clone of SoundCloud built on Rails and Backbone. Users can:

<!-- This is a Markdown checklist. Use it to keep track of your progress! -->

- [ ] Create accounts
- [ ] Create sessions (log in)
- [ ] Create tracks
- [ ] Create track comments, likes, reposts, and downloads
- [ ] View tracks
- [ ] Follow users
- [ ] View a feed of tracks from followed users
- [ ] Search for tracks by title
- [ ] Search for tracks by tag

## Design Docs
* [View Wireframes][views]
* [DB schema][schema]

[views]: ./docs/views.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: User Authentication, Account Creation (~1 day)
I will implement user authentication in Rails based on the practices learned at App Academy. By the end of this phase, users will be able to create accounts using a simple text form in a Rails view. The most important part of this phase will be pushing the app to Heroku and ensuring that everything works before moving on to phase 2.

[Details][phase-one]

### Phase 2: Track Creation and Interaction (~2 days)
I will add API routes to serve track data, then add Backbone models and collections that fetch data from those routes. By the end of this phase, users will be able to create, comment on, like, repost, and download tracks, all inside a single Backbone app.

[Details][phase-two]

### Phase 3: Editing and Displaying Tracks (~2 days)
I plan to use third-party libraries to add functionality to the `TrackForm` and `TrackShow` views in this phase. Most of this time will be spent implementing the SoundCloud dynamic track bar and allowing comments to be seen at specific times on each track.

[Details][phase-three]

### Phase 4: User Feeds (~1-2 days)
I'll start by adding a `feed` route that uses the `current_user`'s `followed_users` association to serve a list of tracks ordered chronologically. On the Backbone side, I'll make a `FeedShow` view whose `tracks` collections fetch from the new route.  Ultimately, this will be the page users see after logging in.

[Details][phase-four]

### Phase 5: Searching for Users and Tracks (~2 days)
I'll need to add `search` routes to the Users and Tracks controllers. On the Backbone side, there will be a `SearchResults` composite view. These views will use plain old `tracks` and `users˜ ` collection, but they will fetch from the new `search` routes.

[Details][phase-five]

### Bonus Features (TBD)
- [ ] Create playlists
- [ ] Messaging between users
- [ ] User/track analytics
- [ ] Custom user/track/playlist urls
- [ ] Pagination/infinite scroll
- [ ] Activity history (e.g. likes, reposts)
- [ ] Multiple sessions/session management
- [ ] User avatars
- [ ] Typeahead search bar
- [ ] Follow suggestions

[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md
