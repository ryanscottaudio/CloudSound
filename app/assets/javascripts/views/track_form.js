CloudSound.Views.TrackForm = Backbone.View.extend({

  tagName: 'form',
  className: 'trackForm',

  template: JST['tracks/form'],

  initialize: function() {
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.collection, "sync", this.render);
  },

  render: function() {
    this.$el.html(this.template({track: this.model}));

    return this;
  },

})
