Backbone.GofCollection = Backbone.Collection.extend({

  getOrFetch: function (id) {
    collection = this;
    model = this.get(id);

    if (model) {
      model.fetch()
    } else {
      model = new this.model({id: id});
      collection.add(model);
      model.fetch({error: function() {collection.remove(model)}})
    };

    return model;
  },

})
