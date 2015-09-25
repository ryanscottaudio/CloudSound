CloudSound.Views.ExploreShow = Backbone.CompositeView.extend({

  tagName: 'div',
  className: 'explore',

  template: JST['explore/index'],

  initialize: function(options) {
    this.collection = options.collection;
    this.listenTo(this.collection, "sync", this.render);
  },

  render: function() {
    this.$el.html(this.template());
    this.addTracksIndex();
    addHeader.call(this);
    return this;
  },

  addTracksIndex: function () {
    var tracksIndexView = new CloudSound.Views.TrackIndex({
      collection: this.collection,
    });
    this.addSubview('div.tracks-index', tracksIndexView);
  },

})
