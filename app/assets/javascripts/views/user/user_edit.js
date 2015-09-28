CloudSound.Views.UserEdit = Backbone.CompositeView.extend({

  tagName: 'div',
  className: 'userEdit',

  template: JST['users/edit'],

  initialize: function() {
    this.listenTo(this.model, "sync", this.render);
  },

  events: {
    "change #input-user-image": "pictureChange",
    "click button.save": "submit",
  },

  render: function() {
    this.eachSubview(function (subview) {subview.remove()});
    this.$el.html(this.template({user: this.model}));
    addHeader.call(this);

    return this;
  },

  pictureChange: function(e) {
    var picture = e.currentTarget.files[0];
    var reader = new FileReader();

    reader.onloadend = function(){
      this._updatePicPreview(reader.result);
    }.bind(this);

    if (picture) {
      reader.readAsDataURL(picture);
    } else {
      this._updatePicPreview("");
    }
  },

  _updatePicPreview: function(newPic) {
    this.$("#preview-user-image").attr("src", newPic)
  },

  submit: function(e) {
    e.preventDefault();

    that = this;

    var attrs = this.$('form.userEdit').serializeJSON();
    var formData = new FormData();
    for (var key in attrs.user) {
      formData.append("user[" + key + "]", attrs.user[key]);
    }
    if (this.$('#input-user-image')[0].files[0]) {
      formData.append("user[image]", this.$('#input-user-image')[0].files[0]);
    }
    this.model.saveFormData(formData, {
      success: function() {
        that.collection.add(that.model);
        CloudSound.currentUser.fetch();
        Backbone.history.navigate('users/' + that.model.id, {trigger: true});
      },
      error: function(model, response) {
        debugger;
      },
    });

  },

})
