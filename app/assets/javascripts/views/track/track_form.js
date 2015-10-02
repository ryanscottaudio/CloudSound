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

    if (!this.doChecks()) {
      return;
    }

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
        if (response.responseJSON.indexOf('Audio content type is invalid') != -1) {
          that.$('.errors').html("That's not a valid audio file. Please choose a different one.")
        } else if (response.responseJSON.indexOf('Url has already been taken') != -1) {
          that.$('.errors').html("That URL is taken. Please enter another one.")
        } else {
          that.$('.errors').html("Something went wrong. Please try again.")
        }
        that.$('button.save').removeClass('uploading');
        that.$('button.save').html('Save');
      },
    });

  },

  doChecks: function() {

    var pass = true;

    if (that.$('#input-post-audio').val().length < 1) {
      that.$('.errors-audio').html("Please choose an audio track to upload.");
      that.$('#input-post-audio').css('border-color', 'red');
      pass = false;
    } else {
      that.$('.errors-audio').empty();
      that.$('#input-post-audio').css('border-color', '#ccc');
    }

    if (that.$('#input-post-title').val().length < 1) {
      that.$('.errors-title').html("Please enter a title for your track.");
      that.$('#input-post-title').css('border-color', 'red');
      pass = false;
    } else {
      that.$('.errors-title').empty();
      that.$('#input-post-title').css('border-color', '#ccc');
    }

    if (that.$('#input-post-url').val().length < 1) {
      that.$('.errors-url').html("Please enter a URL for your track.");
      that.$('#input-post-url').css('border-color', 'red');
      pass = false;
    } else {
      that.$('.errors-url').empty();
      that.$('#input-post-url').css('border-color', '#ccc');
    }

    return pass;
  },

})
