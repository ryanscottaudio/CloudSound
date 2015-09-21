CloudSound.Routers.Router = Backbone.Router.extend({

  initialize: function(options) {
    this.$rootEl = options.$rootEl;
    this.collection = new CloudSound.Collections.Users();
    this.collection.fetch();
  },

  routes: {
    "": "signIn",

    "tracks/new": "trackNew",
    "tracks/:id": "trackShow",

    "users/new": "userNew",
    "users/:id": "userShow",

    "session/new": "signIn",
  },

  feedShow: function() {
    if (!this._requireSignedIn()) {

      return;
    }

  },

  userNew: function() {
    if (!this._requireSignedOut()) {
      return;
    }

    var model = new this.collection.model();
    var formView = new CloudSound.Views.UserForm({
      collection: this.collection,
      model: model,
    });

    this._swapview(formView);
  },

  userShow: function(id) {
    var user = new CloudSound.Models.User({id: id})
    user.fetch();
    var userView = new CloudSound.Views.UserShow({
      model: user,
      collection: user.tracks(),
    });
    this._swapview(userView);
  },

  signIn: function(callback) {
    if (!this._requireSignedOut(callback)) {
      return;
    }

    var signInView = new CloudSound.Views.SessionForm({
      callback: callback,
    });
    this._swapview(signInView);
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
