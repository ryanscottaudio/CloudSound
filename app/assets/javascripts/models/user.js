CloudSound.Models.User = Backbone.CFModel.extend({

  urlRoot: "api/users",

  toJSON: function() {
    return {
      user: _.clone(this.attributes),
    };
  },

  parse: function(response) {
    if (response.tracks) {
      this.tracks().set(response.tracks, {parse: true});
      delete response.tracks;
    };
    return response;
  },

  tracks: function() {
    if (!this._tracks) {
      this._tracks = new CloudSound.Collections.Tracks([], {user: this});
    };
    return this._tracks;
  },
});

CloudSound.Models.CurrentUser = CloudSound.Models.User.extend ({

  url: "api/session",

  initialize: function(options) {
    this.listenTo(this, "change", this.fireSessionEvent);
  },

  isSignedIn: function() {
    return !this.isNew();
  },

  signIn: function(options) {
    var model = this;
    var credentials = {
      "user[email]": options.email,
      "user[password]": options.password,
    };

    $.ajax({
      url: this.url,
      type: "POST",
      data: credentials,
      dataType: "json",
      success: function(data) {
        model.set(data);
        options.success && options.success();
      },
      error: function() {
        options.error && options.error();
      },
    });
  },

  signOut: function(options) {
    var model = this;

    $.ajax({
      url: this.url,
      type: "DELETE",
      dataType: "json",
      success: function(data) {
        model.clear();
        options.success && options.success();
      }
    });
  },

  fireSessionEvent: function() {
    if (this.isSignedIn()) {
      this.trigger("signIn");
      console.log("signed in", this);
    } else {
      this.trigger("signOut");
      console.log("signed out", this);
    }
  },

});