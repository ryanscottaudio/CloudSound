CloudSound.Collections.SearchResults = Backbone.Collection.extend({

	url: "/api/search",

	parse: function (resp) {
		return resp.results;
	},

	model: function (attrs) {
		var type = attrs._type;
		delete attrs._type;

		return new CloudSound.Models[type](attrs);
	},

	comparator: function(obj1, obj2) {
		if (obj1.get('created_at') > obj2.get('created_at')) {
			return -1;
		} else if (obj1.get('created_at') < obj2.get('created_at')) {
			return 1;
		} else {
			return 0;
		}
	},

});
