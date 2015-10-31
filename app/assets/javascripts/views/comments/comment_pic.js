CloudSound.Views.CommentPic = Backbone.View.extend({

  tagName: 'div',
  className: 'comment-pic',

  template: JST['comments/pic'],

  events: {
    "hover": "toggleText",
  },

  initialize: function(options) {
    this.parentView = options.parentView;
    this.position = this.model.get('time') * 100 / this.parentView.wave.getDuration() + '%';
    this.$el.css('left', this.position);
    this.listenTo(this.model, "sync", this.render);
  },

  render: function() {
    this.$el.html(this.template({comment: this.model}));

    return this;
  },

  toggleText: function() {
    this.$('comment-text').toggleClass('hidden');
  },

})
