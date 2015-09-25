CloudSound.Views.FeedShow = Backbone.CompositeView.extend({

  tagName: 'div',
  className: 'feed',

  template: JST['feed/index'],

  initialize: function() {
    this.listenTo(this.model, "sync", this.render);
    this.model.fetch();
  },

  render: function() {
    this.$el.html(this.template());
    this.addTracksIndex();
    addHeader.call(this);
    return this;
  },

  addTracksIndex: function () {
    var tracks = this.model.get('display_tracks');
    var tracksCollection = new CloudSound.Collections.Tracks({});
    tracksCollection.set(tracks, {parse: true});
    var tracksIndexView = new CloudSound.Views.TrackIndex({
      collection: tracksCollection,
    });
    this.addSubview('div.tracks-index', tracksIndexView);
  },

})
