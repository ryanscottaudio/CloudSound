CloudSound.Views.FourOhFour = Backbone.CompositeView.extend({

  tagName: 'div',
  className: 'error',

  template: JST['404'],

  events: {
  },

  initialize: function() {
  },

  render: function() {
    this.eachSubview(function (subview) {subview.remove()});
    this.$el.html(this.template());
    addHeader.call(this);
    return this;
  },

})
