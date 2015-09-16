CloudSound.Views.TrackIndexItem = Backbone.View.extend({

  tagName: 'li',
  className: 'trackItem',

  initialize: function() {
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.collection, "sync", this.render);
  },

})
