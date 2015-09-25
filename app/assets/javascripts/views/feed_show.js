CloudSound.Views.FeedShow = Backbone.CompositeView.extend({

  tagName: 'div',
  className: 'feed',

  template: JST['feed/index'],

  initialize: function() {
    this.listenTo(this.model, "sync", this.render);
  },

  render: function() {
    this.$el.html(this.template());
    this.addTracksIndex();
    addHeader.call(this);
    return this;
  },

  addTracksIndex: function () {
    that = this;
    var tracksIndexView = new CloudSound.Views.TrackIndex({
      collection: that.model.displayTracks(),
    });
    this.addSubview('div.tracks-index', tracksIndexView);
  },

})
