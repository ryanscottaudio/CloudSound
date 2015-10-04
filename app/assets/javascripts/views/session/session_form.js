CloudSound.Views.SessionForm = Backbone.View.extend({

  tagName: 'div',
  className: 'sessionTab',

  template: JST['sessions/form'],

  initialize: function(options) {
    this.parent = options.parent;
    this.callback = options.callback;
    this.listenTo(CloudSound.currentUser, "signIn", this.signInCallback);
  },

  events: {
    "submit form": "submit",
  },

  render: function() {
    this.$el.html(this.template());
    this.$('.cs-input#email').focus();

    return this;
  },

  submit: function(e) {
    e.preventDefault();
    var attrs = $(e.currentTarget).serializeJSON().user;
    CloudSound.currentUser.signIn({
      email: attrs.email,
      password: attrs.password,
      success: function() {
        CloudSound.currentUser.fetch({
          success: function() {
            this.parent.enableScroll();
            Backbone.history.navigate('_=_', {trigger: true});
          }.bind(this),
        });
      }.bind(this),
      error: function() {
        this.$('.errors').html("We couldn't sign you in; are you sure you had the right email and password?")
      }.bind(this),
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
