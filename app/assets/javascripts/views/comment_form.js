CloudSound.Views.CommentForm = Backbone.View.extend({

  tagName: 'form',
  className: 'comment',

  template: JST['comments/form'],

  initialize: function() {
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.collection, "sync", this.render);
  },

  render: function() {
    this.$el.html(this.template({comment: this.model}));

    return this;
  },

})
