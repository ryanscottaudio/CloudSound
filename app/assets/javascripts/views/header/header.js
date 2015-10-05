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
    "click a.guest": "signInGuest",
    "click .sign-in-tab": "signIn",
    "click .create-account-tab": "createAccount",
    "click .cancel-link": "back",
    "submit .search-container": "search",
    "input .search": "updateSearchDropdown",
  },

  template: JST['header/show'],

  render: function() {
    this.$el.html(this.template());
    this.addSearchDropdown();
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

  signInGuest: function(e) {
    e.preventDefault();
    CloudSound.currentUser.signIn({
      email: "guest@guest.com",
      password: "password",
      success: function() {
        CloudSound.currentUser.fetch({
          success: function() {
            Backbone.history.navigate('_=_', {trigger: true});
          },
        });
      },
      error: function() {
        that.$('.errors').html("We couldn't sign you in; are you sure you had the right email and password?")
      },
    })
    this.enableScroll();

  },

  search: function(e) {
    e.preventDefault();

    Backbone.history.navigate('search/' + this.$('.search').val(), {trigger: true});
  },

  addSearchDropdown: function() {
    var searchDropdown = new CloudSound.Views.SearchDropdown;
    this.addSubview('.search-container', searchDropdown);
    this.searchDropdown = searchDropdown;
  },

  updateSearchDropdown: function(e) {
    e.preventDefault();

    this.searchDropdown.search(this.$('.search').val());
  },

})
