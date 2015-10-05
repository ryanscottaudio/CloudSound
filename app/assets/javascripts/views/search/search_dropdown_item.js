CloudSound.Views.SearchDropdownItem = Backbone.CompositeView.extend({

  tagName: 'li',

  className: 'search-dropdown-item',

  template: JST['search/dropdown_item'],

  render: function() {
    if (this.model.get('display_name')) {
      var filledTemplate = this.template({
        link: "#users/" + this.model.id,
        title: this.model.get('display_name'),
        type: "User",
      });
    } else if (this.model.get('title')) {
      var filledTemplate = this.template({
        link: "#tracks/" + this.model.id,
        title: this.model.get('title'),
        type: "Track",
      });
    }
    this.$el.html(filledTemplate);
  },

})
