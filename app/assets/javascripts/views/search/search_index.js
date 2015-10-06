CloudSound.Views.SearchIndex = Backbone.CompositeView.extend({

	tagName: 'div',

	className: 'searchIndex',

	template: JST['search/index'],

	initialize: function (options) {
		this.term = options.term;
    this.playingId = -1;
		this.bindScroll();
		this.searchResults = new CloudSound.Collections.SearchResults();
		this.pageNum = 1;
		this.listenTo(this.searchResults, "add", this.addItemView);
		this.listenTo(this.searchResults, "remove", this.removeItemView);
		this.search();
	},

	render: function () {
    this.eachSubview(function (subview) {subview.remove()});
		this.$el.html(this.template({term: this.term}));
    addHeader.call(this);
		return this;
	},

	addItemView: function (item) {
		if (item.get('display_name')) {
			var view = new CloudSound.Views.UserIndexItem({
				model: item,
			});
		} else if (item.get('title')) {
			var view = new CloudSound.Views.TrackIndexItem({
				model: item,
				comments: item.comments(),
				parentView: this,
			});
		}
		this.addSubview('ul.items-list', view);
  },

  removeItemView: function (item) {
    this.removeModelSubview('ul.items-list', item);
  },

	stopAll: function() {
		this.eachSubview(function (subview) {
			if (subview.wave) {
				if (subview.wave.loading) {
					subview.stopLoad();
				} else if (subview.wave.isPlaying()) {
					subview.externalPause();
				}
				this.$('div#audio-wave').removeClass('active');
				subview.eachSubview(function (subview) {subview.remove()});
				//this removes the comment form
				if (subview.$('button.play-pause').hasClass('playing')) {
					subview.$('button.play-pause').removeClass('playing');
					subview.$('button.play-pause').addClass('paused');
				}
			}
		});
	},

	search: function () {
		this.searchResults.fetch({
			data: {
				query: this.term,
				page: 1,
			},
			success: function(response) {
	      this.lastPage = response.lastPage;
	      this.$('.loading-spinner').removeClass('loader');
	    }.bind(this),
		});
	},

	bindScroll: function () {
		$(window).on("scroll", this.handleScroll.bind(this));
	},

	handleScroll: function (event) {
		var $doc = $(document);
		var scrolledDist = $doc.height() - window.innerHeight - $doc.scrollTop();

		if (scrolledDist < 300) {
			this.nextPageInfiniteScroll();
		}
	},

	nextPageInfiniteScroll: function () {
		if (this.requestingNextPage || this.pageNum === this.lastPage) return;

    this.$('.loading-spinner').addClass('loader');
		this.requestingNextPage = true;
    this.searchResults.fetch({
			remove: false,
			data: {
				query: this.term,
				page: this.pageNum + 1
			},
			success: function () {
				this.requestingNextPage = false;
				this.pageNum++;
				this.$('.loading-spinner').removeClass('loader');
			}.bind(this)
		});
	},

});
