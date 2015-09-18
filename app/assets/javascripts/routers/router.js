CloudSound.Routers.Router = Backbone.Router.extend({

  initialize: function(options) {
    this.$rootEl = options.$rootEl;
  },

  routes: {
    "": "feedShow",

    "tracks/new": "trackNew",
    "tracks/:id": "trackShow",

    "users/new": "userNew",
    "users/:id": "userShow",
  },

  userShow: function(id) {
    var user = new CloudSound.Models.User({id: id})
    user.fetch();
    var userView = new CloudSound.Views.UserShow({
      model: user,
      collection: user.tracks(),
    });
    this._swapview(feedView);
  },

  trackNew: function() {
    var track = new CloudSound.Models.Track()
    var trackView = new CloudSound.Views.TrackForm({
      model: track,
    });
    this._swapview(trackView);
  },

  trackShow: function(id) {
    var track = new CloudSound.Models.Track({id: id})
    track.fetch();
    var trackView = new CloudSound.Views.TrackShow({
      model: track,
      collection: track.comments(),
    });
    this._swapview(trackView);
  },

  _swapview: function(newView) {
    this._currentView && this._currentView.remove();
    this._currentView = newView;
    this.$rootEl.html(newView.render().$el);
  },
})
