CloudSound.Views.SessionForm = Backbone.View.extend({

  initialize: function(options) {
    this.callback = options.callback;
    this.listenTo(CloudSound.currentUser, "signIn", this.signInCallback);
  },

  tagName: 'div',
  className: 'sessionTab',

  events: {
    "submit form": "submit",
  },

  template: JST['sessions/form'],

  render: function() {
    this.$el.html(this.template());

    return this;
  },

  submit: function(e) {
    e.preventDefault();
    var attrs = $(e.currentTarget).serializeJSON().user;
    CloudSound.currentUser.signIn({
      email: attrs.email,
      password: attrs.password,
      error: function() {
        alert("WRONG");
      },
    })
  },

  signInCallback: function(e) {
    if (this.callback) {
      this.callback();
    } else {
      Backbone.history.navigate('', {trigger: true});
    }
  },

})
