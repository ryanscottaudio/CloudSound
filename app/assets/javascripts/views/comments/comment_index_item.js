CloudSound.Views.CommentIndexItem = Backbone.View.extend({

  tagName: 'li',
  className: 'comment group',

  template: JST['comments/index_item'],

  events: {
    "mouseenter": "showButtons",
    "mouseleave": "hideButtons",
    "click .delete-comment": "deleteComment",
  },

  initialize: function() {
    this.listenTo(this.model, "sync", this.render);
  },

  render: function() {
    this.$el.html(this.template({comment: this.model}));

    return this;
  },

  showButtons: function() {
    if (CloudSound.currentUser.get('id') === this.model.get('commenter_id')) {
      this.$('a.comment-button').addClass('active');
    }
  },

  hideButtons: function() {
    if (CloudSound.currentUser.get('id') === this.model.get('commenter_id')) {
      this.$('a.comment-button').removeClass('active');
    }
  },

  deleteComment: function(e) {
    e.preventDefault();

    this.model.destroy();
  },

})
