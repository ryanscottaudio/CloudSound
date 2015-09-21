CloudSound.Views.Header = Backbone.View.extend({

  initialize: function(options) {
    this.listenTo(CloudSound.current_user, "signIn signOut", this.render);
    this.render();
  },

  events: {
    "click .sign-out": "signOut",
    "click .upload": "upload",
  },

  template: JST['header/show'],

  render: function() {
    this.$el.html(this.template({currentUser: CloudSound.currentUser}));

    return this;
  },

  signOut: function(e) {
    e.preventDefault();

    CloudSound.currentUser.signOut({
      success: function() {
        Backbone.history.navigate("", {trigger: true})
      },
    });
  },

  upload: function(e) {
    e.preventDefault();

    Backbone.history.navigate("tracks/new", {trigger: true})
  },

})
