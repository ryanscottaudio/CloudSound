CloudSound.Views.UserShow = Backbone.CompositeView.extend({

  tagName: 'div',
  className: 'user',

  template: JST['users/show'],

  events: {
  },

  initialize: function() {
    // this.listenTo(this.model, "sync", this.renderTop);
    // this.listenTo(this.model.followers(), "add remove", this.renderFollowerNumber);
  },

  render: function() {
    this.eachSubview(function (subview) {subview.remove()});
    this.$el.html(this.template());
    this.addTop();
    this.addTracksIndex();
    addHeader.call(this);
    return this;
  },

  addTop: function () {
    var userTopView = new CloudSound.Views.UserTop({
      model: this.model,
    });
    this.addSubview('div.user-top', userTopView);
  },

  addTracksIndex: function () {
    var tracksIndexView = new CloudSound.Views.TrackIndex({
      collection: this.model.tracks(),
      model: this.model,
    });
    this.addSubview('div.tracks-index', tracksIndexView);
  },

})
