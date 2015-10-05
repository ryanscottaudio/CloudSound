CloudSound.Views.ExploreShow = Backbone.CompositeView.extend({

  tagName: 'div',
  className: 'explore',

  template: JST['explore/index'],

  initialize: function() {
    this.bindScroll();
    this.pageNum = 1;

    // this.listenTo(this.collection, "sync", this.render);
  },

  render: function() {
    this.eachSubview(function (subview) {subview.remove()});
    this.$el.html(this.template());
    this.addTracksIndex();
    addHeader.call(this);
    return this;
  },

  addTracksIndex: function () {
    var tracksIndexView = new CloudSound.Views.TrackIndex({
      collection: this.collection,
    });
    this.addSubview('div.tracks-index', tracksIndexView);
    this.tracksIndex = tracksIndexView;
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
    this.collection.fetch({
			remove: false,
			data: {
				page: this.pageNum + 1
			},
			success: function () {
				this.requestingNextPage = false;
				this.pageNum++;
			}.bind(this)
		});
	},

})
