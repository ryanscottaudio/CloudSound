CloudSound.Views.Header = Backbone.CompositeView.extend({

  initialize: function(options) {
    this.parent = options.parent;
    this.listenTo(CloudSound.currentUser, "signIn sync signOut", this.render);
  },

  events: {
    "click .sign-out-tab-link": "signOut",
    "click .sign-in-tab-link": "signIn",
    "click .create-account": "createAccount",
    "click .modal-background": "back",
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

  signIn: function(e) {
    e.preventDefault();

    this.eachSubview(function (subview) {subview.remove()});

    var signInView = new CloudSound.Views.SessionForm({
      parent: this,
    });
    this.$('.modal').addClass('on');
    this.addSubview('.modal-menu', signInView);
    this.preventScroll();
    this.stopTracks();
  },

  createAccount: function(e) {
    e.preventDefault();

    this.eachSubview(function (subview) {subview.remove()});

    var model = new CloudSound.Models.User();
    var formView = new CloudSound.Views.UserForm({
      model: model,
      parent: this,
    });
    this.$('.modal').addClass('on');
    this.addSubview('.modal-menu', formView);
    this.preventScroll();
    this.stopTracks();
  },

  stopTracks: function() {
    if (this.parent.tracksIndex) {
      this.parent.tracksIndex.stopAll();
    } else if (this.parent.wave && this.parent.$('button.play-pause').hasClass('playing')) {
      this.parent.playPause();
    }
  },

  preventScroll: function() {
    $('.cscontent').on({
      'mousewheel': function(e) {
          e.preventDefault();
          e.stopPropagation();
      }
    });
  },

  enableScroll: function() {
    $('.cscontent').unbind('mousewheel');
  },

  back: function(e) {
    e.preventDefault();

    this.$('.modal').removeClass('on');
    this.enableScroll();
  },

})
