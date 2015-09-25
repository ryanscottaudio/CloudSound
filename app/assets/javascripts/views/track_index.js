CloudSound.Views.TrackIndex = Backbone.CompositeView.extend({

  tagName: 'div',
  className: 'track-index',

  template: JST['tracks/index'],

  initialize: function() {
    this.listenTo(this.collection, "remove", this.removeTrackView);
  },

  render: function() {
    this.$el.html(this.template());
    this.addTracks();
    return this;
  },

  addTracks: function () {
    this.collection.each(function (track) {
      track.author().set(track.get('author'))
      var trackView = new CloudSound.Views.TrackIndexItem({
        model: track,
        collection: track.comments(),
      });
      this.addSubview('ul.tracks-list', trackView);
    }.bind(this));
  },

  removeTrackView: function (track) {
    this.removeModelSubview('ul.tracks-list', track);
  },

})
