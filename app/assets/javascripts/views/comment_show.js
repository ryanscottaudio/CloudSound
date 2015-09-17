CloudSound.Views.CommentShow = Backbone.View.extend({

  tagName: 'li',
  className: 'comment',

  template: JST['comments/index_item'],

  initialize: function() {
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.collection, "sync", this.render);
  },

  render: function() {
    this.$el.html(this.template({comment: this.model}));

    return this;
  },
  
})
