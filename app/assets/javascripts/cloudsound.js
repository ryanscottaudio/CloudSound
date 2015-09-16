window.CloudSound = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    var router = new CloudSound.Routers.Router({
      $rootEl: $('div.cscontent'),
    });
    Backbone.history.start();
  }
};

$(document).ready(function(){
  CloudSound.initialize();
});
