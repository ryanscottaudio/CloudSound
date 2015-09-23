CloudSound.Views.Header = Backbone.View.extend({

  initialize: function(options) {
    this.listenTo(CloudSound.currentUser, "signIn sync signOut", this.render);
  },

  events: {
    "click .sign-out": "signOut",
  },

  template: JST['header/show'],

  render: function() {
    this.$el.html(this.template());

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

})
