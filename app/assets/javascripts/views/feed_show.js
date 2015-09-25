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
    this.addHeader();
    return this;
  },

  addHeader: function() {
    that = this;
    var headerView = new CloudSound.Views.Header();
    this.addSubview('div.header', headerView);
  },

  addTracksIndex: function () {
    var tracks = this.model.get('display_tracks');
    var tracksCollection = new CloudSound.Collections.Tracks({});
    tracksCollection.set(tracks);
    var tracksIndexView = new CloudSound.Views.TrackIndex({
      collection: tracksCollection,
    });
    this.addSubview('div.tracks-index', tracksIndexView);
  },

})
