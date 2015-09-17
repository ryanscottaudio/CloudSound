CloudSound.Views.TrackForm = Backbone.View.extend({

  tagName: 'form',
  className: 'trackForm',

  template: JST['tracks/form'],

  initialize: function() {
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.collection, "sync", this.render);
  },

  events: {
    "change #input-post-image": "pictureChange",
    "change #input-post-audio": "audioChange",
    "click button.save": "submit",
  },

  render: function() {
    this.$el.html(this.template({track: this.model}));

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

  audioChange: function(e) {
    var audio = e.currentTarget.files[0];
    var reader = new FileReader();

    reader.onloadend = function(){
      this._updateAudioPreview();
    }.bind(this);

    if (audio) {
      reader.readAsDataURL(audio);
      this.$("#preview-post-audio").html("Uploading...")
    } else {
      this.$("#preview-post-audio").html("");
    }
  },

  _updateAudioPreview: function() {
    this.$("#preview-post-audio").html("Uploaded!")
  },

  submit: function(e) {
    e.preventDefault();

    that = this;

    var attrs = this.$el.serializeJSON();
    var formData = new FormData();
    var test = new Object();
    for (var key in attrs.track) {
      formData.append("track[" + key + "]", attrs.track[key]);
    }
    formData.append("track[audio]", this.$('#input-post-audio')[0].files[0]);
    formData.append("track[image]", this.$('#input-post-image')[0].files[0]);
    this.model.saveFormData(formData, {
      success: function() {
        // that.collection.add(that.model);
        Backbone.history.navigate('tracks/' + that.model.id, {trigger: true})
      },
      error: function(model, response) {
        debugger;
      },
    });

  },

})
