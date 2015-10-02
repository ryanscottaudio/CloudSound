CloudSound.Views.TrackForm = Backbone.CompositeView.extend({

  tagName: 'div',
  className: 'trackForm',

  template: JST['tracks/form'],

  initialize: function() {
    this.listenTo(this.model, "sync", this.render);
  },

  events: {
    "change #input-post-image": "pictureChange",
    "click button.save": "checkSubmit",
  },

  render: function() {
    this.eachSubview(function (subview) {subview.remove()});
    this.$el.html(this.template({track: this.model}));
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
    this.$("#preview-post-image").attr("src", newPic)
  },

  checkSubmit: function(e) {
    e.preventDefault();

    if (!this.$('button.save').hasClass('uploading')) {
      this.submit();
    }
  },

  submit: function() {

    that = this;

    this.$('button.save').addClass('uploading');
    this.$('button.save').html('Uploading...');
    var attrs = this.$('form.trackForm').serializeJSON();
    var formData = new FormData();
    for (var key in attrs.track) {
      formData.append("track[" + key + "]", attrs.track[key]);
    }
    formData.append("track[audio]", this.$('#input-post-audio')[0].files[0]);
    if (this.$('#input-post-image')[0].files[0]) {
      formData.append("track[image]", this.$('#input-post-image')[0].files[0]);
    }
    this.model.saveFormData(formData, {
      success: function(model) {
        Backbone.history.navigate('tracks/' + model.id, {trigger: true})
      },
      error: function(model, response) {
        debugger;
        that.$('button.save').removeClass('uploading');
        that.$('button.save').html('Save');
      },
    });

  },

})
