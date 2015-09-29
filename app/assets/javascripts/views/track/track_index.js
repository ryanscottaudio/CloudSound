CloudSound.Views.TrackIndex = Backbone.CompositeView.extend({

  tagName: 'div',
  className: 'track-index',

  template: JST['tracks/index'],

  initialize: function() {
    this.playingId = -1;
    this.listenTo(this.collection, "remove", this.removeTrackView);
  },

  render: function() {
    this.eachSubview(function (subview) {subview.remove()});
    this.$el.html(this.template());
    this.addTracks();
    return this;
  },

  addTracks: function () {
    this.collection.each(function (track) {
      var trackView = new CloudSound.Views.TrackIndexItem({
        model: track,
        comments: track.comments(),
        parentView: this,
      });
      this.addSubview('ul.tracks-list', trackView);
    }.bind(this));
  },

  removeTrackView: function (track) {
    this.removeModelSubview('ul.tracks-list', track);
  },

  stopAll: function() {
    this.eachSubview(function (subview) {
      if (subview.wave) {
        if (subview.wave.loading) {
          subview.stopLoad();
        }
        subview.wave.pause();
        this.$('div#audio-wave').removeClass('active');
        subview.eachSubview(function (subview) {subview.remove()});
        if (subview.$('button.play-pause').hasClass('playing')) {
          subview.$('button.play-pause').removeClass('playing');
          subview.$('button.play-pause').addClass('paused');
        }
      }
    });
  },

})
