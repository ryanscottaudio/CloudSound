CloudSound.Views.TrackIndexItem = Backbone.CompositeView.extend({

  tagName: 'div',
  className: 'track-index-item',

  template: JST['tracks/index_item'],

  events: {
    "click button.play-pause": "playPause",
  },

  initialize: function() {
    this.listenTo(this.model, "sync", this.render);
  },

  render: function() {
    this.$el.html(this.template({track: this.model}));
    this.renderWave();
    this.addCommentForm();
    // this.addCommentsIndex();
    return this;
  },

  addCommentForm: function () {
    that = this;
    var commentFormView = new CloudSound.Views.CommentForm({
      model: new CloudSound.Models.Comment(),
      parent: that,
      track: that.model,
      collection: that.collection,
    });
    this.addSubview('div.comment-form-area', commentFormView)
  },

  // addCommentsIndex: function () {
  //   that = this;
  //   var commentsIndexView = new CloudSound.Views.CommentIndex({
  //     collection: that.collection,
  //   });
  //   this.addSubview('div.lower-comment-area', commentsIndexView);
  // },

  renderWave: function () {

    var wave = Object.create(WaveSurfer);
    this.wave = wave;

    wave.init({
      backend: 'MediaElement',
      barWidth: 2,
      cursorWidth: 0,
      container: this.$('div#audio-wave')[0],
      waveColor: '#666666',
      progressColor: '#FF5100',
      cursorColor: '#FF5100',
      normalize: true,
      fillParent: true,
      height: 60,
    });

    wave.on("ready", function() {
      this.$('.end-time').html(secondsToHms(wave.getDuration()));
      wave.on("audioprocess", function() {
        this.$('.cursor-time').html(secondsToHms(wave.getCurrentTime()));
      }.bind(this));
    }.bind(this));

    wave.on("finish", function() {
      this.endTrack();
    }.bind(this));

    $(window).on("resize", function() {
      wave.drawer.containerWidth = wave.drawer.container.clientWidth;
      wave.drawBuffer();
    });

    wave.load(this.model.get('audio_url'));
  },

  playPause: function() {
    this.wave.playPause();
    this.$('div#audio-wave').toggleClass('active');
    this.$('button.play-pause').toggleClass('playing');
    this.$('button.play-pause').toggleClass('paused');
  },

  endTrack: function() {
    this.$('div#audio-wave').toggleClass('active');
    this.$('button.play-pause').toggleClass('playing');
    this.$('button.play-pause').toggleClass('paused');
  },

})
