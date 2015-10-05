CloudSound.Views.TrackIndex = Backbone.CompositeView.extend({

  tagName: 'div',
  className: 'track-index',

  template: JST['tracks/index'],

  initialize: function() {
    this.playingId = -1;
    this.listenTo(this.collection, "add", this.addTrackView);
    this.listenTo(this.collection, "remove", this.removeTrackView);

    this.bindScroll();
    this.pageNum = 1;
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

  addTrackView: function (track) {
    var trackView = new CloudSound.Views.TrackIndexItem({
      model: track,
      comments: track.comments(),
      parentView: this,
    });
    this.addSubview('ul.tracks-list', trackView);
  },

  removeTrackView: function (track) {
    this.removeModelSubview('ul.tracks-list', track);
  },

  stopAll: function() {
    this.eachSubview(function (subview) {
      if (subview.wave) {
        if (subview.wave.loading) {
          subview.stopLoad();
        } else if (subview.wave.isPlaying()) {
          subview.externalPause();
        }
        this.$('div#audio-wave').removeClass('active');
        subview.eachSubview(function (subview) {subview.remove()});
        //this removes the comment form
        if (subview.$('button.play-pause').hasClass('playing')) {
          subview.$('button.play-pause').removeClass('playing');
          subview.$('button.play-pause').addClass('paused');
        }
      }
    });
  },

  bindScroll: function () {
    $(window).on("scroll", this.handleScroll.bind(this));
  },

  handleScroll: function (event) {
    var $doc = $(document);
    var scrolledDist = $doc.height() - window.innerHeight - $doc.scrollTop();

    if (scrolledDist < 300) {
      this.nextPageInfiniteScroll();
    }
  },

  nextPageInfiniteScroll: function () {
    if (this.requestingNextPage) return;

    this.requestingNextPage = true;
    this.collection.fetch({
      remove: false,
      data: {
        page: this.pageNum + 1
      },
      success: function () {
        this.requestingNextPage = false;
        this.pageNum++;
      }.bind(this)
    });
  },

})
