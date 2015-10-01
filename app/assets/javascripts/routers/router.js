CloudSound.Routers.Router = Backbone.Router.extend({

  initialize: function(options) {
    this.$rootEl = options.$rootEl;
    this.collection = new CloudSound.Collections.Users();
    this.tracks = new CloudSound.Collections.Tracks([], {});
  },

  routes: {
    "": "feedShow",

    "explore": "exploreShow",

    "_=_": "preventLittleMan",

    "tracks/new": "trackNew",
    "tracks/:id": "trackShow",

    // "users/new": "userNew",
    "users/:id": "userShow",
    "users/:id/edit": "userEdit",

    // "session/new": "signIn",
  },

  preventLittleMan: function() {
    Backbone.history.navigate("", {trigger: true});
  },

  feedShow: function() {
    if (CloudSound.currentUser.id) {
      var feedView = new CloudSound.Views.FeedShow({
        model: CloudSound.currentUser,
      });
      this._swapview(feedView);
    } else {
      this.exploreShow();
    }
  },

  exploreShow: function() {
    var exploreView = new CloudSound.Views.ExploreShow({
      collection: this.tracks,
      model: CloudSound.currentUser,
    });
    this._swapview(exploreView);
    this.tracks.fetch();
  },

  // userNew: function() {
  //   if (!this._requireSignedOut()) {
  //     return;
  //   }
  //
  //   var model = new this.collection.model();
  //   var formView = new CloudSound.Views.UserForm({
  //     collection: this.collection,
  //     model: model,
  //   });
  //
  //   this._swapview(formView);
  // },

  userEdit: function(id) {
    if (!CloudSound.currentUser.id) {
      this._goHome();
      return;
    } else if (CloudSound.currentUser.id !== id) {
      Backbone.history.navigate("users/" + CloudSound.currentUser.id + "/edit", {trigger: true});
      id = CloudSound.currentUser.id;
    }

    var model = this.collection.getOrFetch(id);
    var editView = new CloudSound.Views.UserEdit({
      collection: this.collection,
      model: model,
    });
    this._swapview(editView);
  },

  userShow: function(id) {
    var user = this.collection.getOrFetch(id)
    var userView = new CloudSound.Views.UserShow({
      model: user,
      collection: user.tracks(),
    });
    this._swapview(userView);
  },

  // signIn: function(callback) {
  //   if (!this._requireSignedOut(callback)) {
  //     return;
  //   }
  //
  //   var signInView = new CloudSound.Views.SessionForm({
  //     callback: callback,
  //   });
  //   this._swapview(signInView);
  // },

  trackNew: function() {
    var track = new CloudSound.Models.Track()
    var trackView = new CloudSound.Views.TrackForm({
      model: track,
      collection: this.tracks,
    });
    this._swapview(trackView);
  },

  trackShow: function(id) {
    var track = this.tracks.getOrFetch(id)
    var trackView = new CloudSound.Views.TrackShow({
      model: track,
      comments: track.comments(),
    });
    this._swapview(trackView);
  },

  _swapview: function(newView) {
    this._currentView && this._currentView.remove();
    this._currentView = newView;
    this.$rootEl.html(newView.render().$el);
  },

  _requireSignedIn: function(callback) {
    if (!CloudSound.currentUser.isSignedIn()) {
      callback = callback || this._goHome.bind(this);
      this.signIn(callback);
      return false;
    }

    return true;
  },

  _requireSignedOut: function(callback) {
    if (CloudSound.currentUser.isSignedIn()) {
      callback = callback || this._goHome.bind(this);
      callback();
      return false;
    }

    return true;
  },

  _goHome: function() {
    Backbone.history.navigate("", {trigger: true});
  },

})
