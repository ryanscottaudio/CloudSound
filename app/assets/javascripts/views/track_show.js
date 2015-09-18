CloudSound.Views.TrackShow = Backbone.CompositeView.extend({

  tagName: 'div',
  className: 'track',

  template: JST['tracks/show'],

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
    this.addCommentsIndex();
    return this;
  },

  addCommentForm: function () {
    that = this;
    var commentFormView = new CloudSound.Views.CommentForm({
      model: new CloudSound.Models.Comment(),
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

    that = this;

    var wave = Object.create(WaveSurfer);
    this.wave = wave;

    wave.init({
      backend: 'MediaElement',
      barWidth: 2,
      cursorWidth: 0,
      container: this.$('div#audio-wave')[0],
      waveColor: '#FFFFFF',
      progressColor: '#FF5100',
      cursorColor: '#FF5100',
      normalize: true,
      fillParent: true,
    });

    wave.load(that.model.get('audio_url'));
  },

  playPause: function(e) {
    e.preventDefault();

    this.wave.playPause();
    this.$('button.play-pause').toggleClass('playing');
  },

})
