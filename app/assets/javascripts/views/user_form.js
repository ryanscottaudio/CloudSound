CloudSound.Views.UserForm = Backbone.View.extend({

  tagName: 'div',
  className: 'userTab',

  template: JST['users/form'],

  initialize: function() {
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.collection, "sync", this.render);
  },

  events: {
    "submit form": "submit",
  },

  render: function() {
    this.$el.html(this.template({user: this.model}));

    return this;
  },

  submit: function(e) {
    e.preventDefault();

    that = this;

    var attrs = $(e.currentTarget).serializeJSON().user;
    this.model.save(attrs, {
      success: function() {
        CloudSound.currentUser.fetch();
        that.collection.add(that.model, { merge: true });
        Backbone.history.navigate('', {trigger: true})
      },
      error: function(data){
        alert("Form invalid. Let the user know what went wrong.");
        console.log(data);
      }
    });

  },

})
