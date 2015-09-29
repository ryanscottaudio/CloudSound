CloudSound.Views.ExploreShow = Backbone.CompositeView.extend({

  tagName: 'div',
  className: 'explore',

  template: JST['explore/index'],

  initialize: function(options) {
    this.collection = options.collection;
    this.listenTo(this.collection, "sync", this.render);
    this.listenTo(this.model, "sync", this.render);
  },

  render: function() {
    this.eachSubview(function (subview) {subview.remove()});
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
    this.tracksIndex = tracksIndexView;
  },

})
