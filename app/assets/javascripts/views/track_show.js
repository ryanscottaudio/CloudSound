CloudSound.Views.TrackShow = Backbone.CompositeView.extend({

  tagName: 'div',
  className: 'track',

  template: JST['tracks/show'],

  events: {
    "click button.play-pause": "playPause",
    "click button.like-button": "likeUnlike",
  },

  initialize: function() {
    this.listenTo(this.model, "sync", this.render);
  },

  render: function() {
    this.$el.html(this.template({track: this.model}));
    this.setLiked();
    this.renderWave();
    this.addCommentForm();
    this.addCommentsIndex();
    this.addHeader();
    return this;
  },

  addHeader: function() {
    that = this;
    var headerView = new CloudSound.Views.Header();
    this.addSubview('div.header', headerView);
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

  addCommentsIndex: function () {
    that = this;
    var commentsIndexView = new CloudSound.Views.CommentIndex({
      collection: that.collection,
    });
    this.addSubview('div.lower-comment-area', commentsIndexView);
  },

  renderWave: function () {

    var wave = Object.create(WaveSurfer);
    this.wave = wave;
    this.wave.playability = false;

    wave.init({
      barWidth: 2,
      cursorWidth: 0,
      container: this.$('div#audio-wave')[0],
      waveColor: '#FFFFFF',
      progressColor: '#FF5100',
      cursorColor: '#FF5100',
      normalize: true,
      fillParent: true,
      height: 100,
    });

    wave.on("ready", function() {
      this.$('.loading-text').addClass('hidden');
      this.$('button.play-pause').removeClass('loading');
      this.$('button.play-pause').addClass('paused');
      this.$('.track-times').removeClass('hidden');
      this.$('.cursor-time').html('0:00');
      this.$('.end-time').html(secondsToHms(wave.getDuration()));
      this.wave.playability = true;
      wave.on("audioprocess", function() {
        this.$('.cursor-time').html(secondsToHms(wave.getCurrentTime()));
      }.bind(this));
    }.bind(this));

    wave.on("finish", function() {
      this.endTrack();
    }.bind(this));

    wave.load(this.model.get('audio_url'));
  },

  playPause: function() {
    if (this.wave.playability === true) {
      this.addPlay();
    }
    this.wave.playPause();
    this.$('div#audio-wave').toggleClass('active');
    this.$('button.play-pause').toggleClass('playing');
    this.$('button.play-pause').toggleClass('paused');
  },

  addPlay: function() {
    var playAttrs = {track_id: this.model.id, player_id: CloudSound.currentUser.id}
    var play = new CloudSound.Models.Play()
    play.save(playAttrs, {
      success: function() {
        this.model.set({plays: this.model.get('plays') + 1});
        this.$('li.plays').html(this.model.get('plays'));
        this.wave.playability = false;
      }.bind(this),
    });
  },

  endTrack: function() {
    this.$('div#audio-wave').toggleClass('active');
    this.$('button.play-pause').toggleClass('playing');
    this.$('button.play-pause').toggleClass('paused');
    this.wave.stop();
    this.wave.playability = true;
  },

  setLiked: function() {
    this.likeAttrs = {
      track_id: this.model.id,
      liker_id: CloudSound.currentUser.id,
    };
    this.like = this.model.likes().where(this.likeAttrs)[0];
    if (typeof this.like !== 'undefined') {
      this.$('button.like-button').toggleClass('liked');
    }
  },

  likeUnlike: function(e) {
    e.preventDefault();
    if(typeof this.like === 'undefined') {
      var like = new CloudSound.Models.Like(this.likeAttrs);
      like.save({}, {
        success: function() {
          this.like = like;
          this.model.likes().add(like);
          this.$('button.like-button').toggleClass('liked');
          this.$('li.likes').html(this.model.likes().length)
        }.bind(this),
      });
    } else {
      this.like.destroy({
        success: function() {
          this.like = undefined;
          this.$('button.like-button').toggleClass('liked');
          this.$('li.likes').html(this.model.likes().length)
        }.bind(this),
      });
    }
  },

})
