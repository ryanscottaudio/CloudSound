CloudSound.Views.SearchDropdown = Backbone.CompositeView.extend({

	initialize: function () {
		this.searchResults = new CloudSound.Collections.SearchResults();
		this.listenTo(this.searchResults, "sync", this.reset);
	},

  tagName: 'div',

  className: 'dropdown-search-results',

	template: JST['search/dropdown'],

	render: function () {
		this.$el.html(this.template());
		return this;
	},

	reset: function () {
    this.eachSubview(function (subview) {subview.remove()});
		this.searchResults.each(function (item) {
			var view = new CloudSound.Views.SearchDropdownItem({
				model: item,
			});
  		this.addSubview('ul.items-list', view);
		}.bind(this));
	},

	search: function (term) {
		this.searchResults.fetch({
			data: {
				query: term,
				page: 1,
			}
		});
	},

});
