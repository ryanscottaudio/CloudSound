CloudSound.Views.TrackShow = Backbone.CompositeView.extend({

  tagName: 'div',
  className: 'track',

  template: JST['tracks/show'],

  events: {
    "click button.play-pause": "playPause",
    "click button.like-button": "likeUnlike",
    "click .delete-button": "primeDelete",
    "click .delete-button.sure": "deleteTrack",
  },

  initialize: function(options) {
    this.model.fetch({success: function() {
      this.render();
      setTimeout(function() {
        this.$('.player-area').removeClass('transitioning');
        this.$('.comment-area').removeClass('transitioning');
      }.bind(this), 0)
      this.$('.loading-spinner').removeClass('loader');
    }.bind(this)});
    this.comments = options.comments;
    // this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.comments(), "add remove", this.renderCommentNumber);
  },

  render: function() {
    this.eachSubview(function (subview) {subview.remove()});
    this.$el.html(this.template({track: this.model}));
    this.setLiked();
    renderWave.call(this, {height: 100, color: '#FFFFFF'});
    if (this.model.get('audio_url')) {
      this.wave.xhr = this.wave.load(this.model.get('audio_url')).xhr;
      this.wave.on("ready", function() {
        if (CloudSound.currentUser.isSignedIn()) {
          this.addCommentForm();
        }
      }.bind(this));
    }
    this.addCommentsIndex();
    addHeader.call(this);
    return this;
  },

  addCommentForm: function () {
    that = this;
    var commentFormView = new CloudSound.Views.CommentForm({
      model: new CloudSound.Models.Comment(),
      parent: that,
      track: that.model,
      collection: that.comments,
    });
    this.addSubview('div.comment-form-area', commentFormView);
    setTimeout(function() {
      this.$('form.comment').removeClass('transitioning');
    }.bind(this), 0);
  },

  addCommentsIndex: function () {
    that = this;
    var commentsIndexView = new CloudSound.Views.CommentIndex({
      collection: that.comments,
    });
    this.addSubview('div.lower-comment-area', commentsIndexView);
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
        this.$('li.plays-count').html(this.model.get('plays'));
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
          this.$('li.likes-count').html(this.model.likes().length)
        }.bind(this),
      });
    } else {
      this.like.destroy({
        success: function() {
          this.like = undefined;
          this.$('button.like-button').toggleClass('liked');
          this.$('li.likes-count').html(this.model.likes().length)
        }.bind(this),
      });
    }
  },

  renderCommentNumber: function() {
    this.$('li.comments-count').html(this.model.comments().length)
  },

  primeDelete: function() {
    this.$('button.delete-button').addClass('sure');
    var timer = setTimeout(function() {
      this.$('button.delete-button').removeClass('sure');
    }.bind(this), 3000);
  },

  deleteTrack: function() {
    this.model.destroy();
    Backbone.history.navigate('', {trigger: true});
  },

})
