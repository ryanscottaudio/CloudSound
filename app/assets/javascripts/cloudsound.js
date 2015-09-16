window.CloudSound = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    var router = CloudSound.Routers.router({
      $rootEl: $(div.cscontent),
    });
    Backbone.history.start();
  }
};

$(document).ready(function(){
  CloudSound.initialize();
});
