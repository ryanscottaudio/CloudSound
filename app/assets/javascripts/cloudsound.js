window.CloudSound = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {

    this.currentUser = new CloudSound.Models.CurrentUser();
    this.currentUser.fetch();

    this.header = new CloudSound.Views.Header({el: ".header"});
    this.router = new CloudSound.Routers.Router({
      $rootEl: $('div.cscontent'),
    });
    Backbone.history.start();
  }
};

$(document).ready(function(){
  CloudSound.initialize();
});

function secondsToHms(d) {
  d = Number(d);
  var h = Math.floor(d / 3600);
  var m = Math.floor(d % 3600 / 60);
  var s = Math.floor(d % 3600 % 60);
  return ((h > 0 ? h + ":" + (m < 10 ? "0" : "") : "") + m + ":" + (s < 10 ? "0" : "") + s);
};
