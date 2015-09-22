CloudSound.Views.FeedShow = Backbone.CompositeView.extend({

  tagName: 'div',
  className: 'feed',

  template: JST['feed/index'],

  initialize: function() {
    this.listenTo(this.collection, "sync", this.render);
  },

  render: function() {
    this.$el.html(this.template());
    this.addTracksIndex();
    this.addHeader();
    return this;
  },

  addHeader: function() {
    that = this;
    var headerView = new CloudSound.Views.Header();
    this.addSubview('div.header', headerView);
  },

  addTracksIndex: function () {
    that = this;
    var tracksIndexView = new CloudSound.Views.TrackIndex({
      collection: that.collection,
    });
    this.addSubview('div.tracks-index', tracksIndexView);
  },

})
