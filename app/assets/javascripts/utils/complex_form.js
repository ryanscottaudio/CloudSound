Backbone.CFModel = Backbone.Model.extend({

  saveFormData: function (formData, options) {
    var method = this.isNew() ? "POST" : "PUT";
    var model = this;
    $.ajax({
      xhr: function() {
        var xhr = new XMLHttpRequest();
          xhr.upload.addEventListener('progress', function(e) {
            if (e.lengthComputable) {
              // console.log(e.loaded / e.total * 100 + '%');
            }
          }, false);
        return xhr;
      },
      url: _.result(model, "url"),
      type: method,
      data: formData,
      processData: false,
      contentType: false,
      success: function(response){
        model.set(model.parse(response));
        model.trigger("sync", model, response, options);
        options.success && options.success(model, response, options);
      },
      error: function(response){
        options.error && options.error(model, response, options);
      },
    });
  },

})
