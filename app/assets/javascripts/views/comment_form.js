CloudSound.Views.CommentForm = Backbone.View.extend({

  tagName: 'form',
  className: 'comment',

  template: JST['comments/form'],

  events: {
    "submit": "addNewComment",
    "focus input.comment-input": "activate",
    "blur input.comment-input": "deactivate",
  },

  initialize: function(options) {
    this.track = options.track;
    this.parent = options.parent;
  },

  render: function() {
    this.$el.html(this.template({comment: this.model, currentUser: CloudSound.currentUser}));

    return this;
  },

  addNewComment: function(e) {
    e.preventDefault();
    that = this;

    var attrs = this.$el.serializeJSON();
    attrs.comment.time = this.parent.wave.getCurrentTime();
    attrs.comment.track_id = this.track.get('id');
    this.model.save(attrs.comment, {
      success: function() {
        that.collection.add(that.model);
        that.model = new CloudSound.Models.Comment();
        that.render();
      },
    });
  },

  activate: function() {
    this.$('.comment-input').addClass('focused')
    this.$('.comment-surround').addClass('focused')
  },

  deactivate: function() {
    this.$('.comment-input').removeClass('focused')
    this.$('.comment-surround').removeClass('focused')
  },

})
