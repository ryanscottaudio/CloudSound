CloudSound.Views.TrackShow = Backbone.View.extend({

  tagName: 'div',
  className: 'track',

  initialize: function() {
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.collection, "sync", this.render);
  },

})
