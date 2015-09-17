CloudSound.Views.TrackShow = Backbone.CompositeView.extend({

  tagName: 'div',
  className: 'track',

  template: JST['tracks/show'],

  initialize: function() {
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.collection, "add", this.addCommentView);
    this.listenTo(this.collection, "remove", this.render);
    this.collection.fetch({success: this.addComments.bind(this)});
  },

  render: function() {
    this.$el.html(this.template({track: this.model}));
    this.addCommentForm();
    return this;
  },

  addComments: function () {
    this.collection.each(function (comment) {
      var commentView = new CloudSound.Views.CommentShow({model: comment});
      this.addSubview('ul.comments', commentView);
    }.bind(this));
  },

  addCommentView: function () {
    var commentView = new CloudSound.Views.CommentShow({model: comment});
    this.addSubview('ul.comments', commentView);
  },

  addCommentForm: function () {
    var commentFormView = new CloudSound.Views.CommentForm({
      model: new CloudSound.Models.Comment(),
    });
    this.addSubview('div.comment-form-area', commentFormView)
  },

})
