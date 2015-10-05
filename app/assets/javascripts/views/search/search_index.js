CloudSound.Views.SearchIndex = Backbone.CompositeView.extend({

	initialize: function (options) {
		this.term = options.term;
    this.playingId = -1;
		this.bindScroll();
		this.searchResults = new CloudSound.Collections.SearchResults();
		this.pageNum = 1;
		this.search();
		this.listenTo(this.searchResults, "sync", this.render);
	},

	template: JST['search/index'],

	render: function () {
    this.eachSubview(function (subview) {subview.remove()});
		this.$el.html(this.template({term: this.term}));
		this.addItems();
    addHeader.call(this);
		return this;
	},

	addItems: function () {
		this.searchResults.each(function (item) {
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
		}.bind(this));
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
			}
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
		if (this.requestingNextPage) return;

		this.requestingNextPage = true;
		this.newSearchResults = new CloudSound.Collections.SearchResults();
    this.newSearchResults.fetch({
			remove: true,
			data: {
				query: this.term,
				page: this.pageNum + 1
			},
			success: function () {
				this.requestingNextPage = false;
				this.pageNum++;
        this.appendItems(this.newSearchResults);
        this.searchResults.add(this.newSearchResults.models);
        this.newSearchResults = null;
			}.bind(this)
		});
	},

  appendItems: function (items) {
    items.each(function (item) {
      if (item.type = "User") {
        var view = new CloudSound.Views.UserIndexItem({
          model: item,
        });
      } else if (item.type = "Track") {
        var view = new CloudSound.Views.TrackIndexItem({
          model: item,
          comments: track.comments(),
          parentView: this,
        });
      }
      this.addSubview('ul.items-list', view);
    }.bind(this));
  },

});
