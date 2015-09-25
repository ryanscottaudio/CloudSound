CloudSound.Views.CommentIndex = Backbone.CompositeView.extend({

  tagName: 'div',
  className: 'comments-index',

  template: JST['comments/index'],

  initialize: function() {
    this.listenTo(this.collection, "add", this.addCommentView);
    this.listenTo(this.collection, "remove", this.removeCommentView);
  },

  render: function() {
    this.$el.html(this.template({commentCount: this.collection.length}));
    this.addComments();
    return this;
  },

  addComments: function () {
    this.collection.each(function (comment) {
      var commentView = new CloudSound.Views.CommentIndexItem({model: comment});
      this.addSubview('ul', commentView);
    }.bind(this));
  },

  addCommentView: function (comment) {
    var commentView = new CloudSound.Views.CommentIndexItem({model: comment});
    this.addSubview('ul', commentView);
    this.updateCommentsCount();
  },

  removeCommentView: function (comment) {
    this.removeModelSubview('ul', comment);
    this.$('.number-of-comments').html(this.collection.length + ' comments');
    this.updateCommentsCount();
  },

  updateCommentsCount: function () {
    if (this.collection.length === 1) {
      this.$('.number-of-comments').html(this.collection.length + ' comment');
    } else {
      this.$('.number-of-comments').html(this.collection.length + ' comments');
    }
  },

})
