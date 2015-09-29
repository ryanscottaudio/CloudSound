window.CloudSound = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {

    this.currentUser = new CloudSound.Models.CurrentUser();
    if (typeof(currentUserId) != "undefined") {
      this.currentUser.id = currentUserId;
    }
    this.currentUser.fetch();

    this.header = new CloudSound.Views.Header({el: ".header"});
    this.router = new CloudSound.Routers.Router({
      $rootEl: $('div.cscontent'),
    });
    Backbone.history.start();

    if (typeof(needsToEdit) != "undefined") {
      Backbone.history.navigate('users/' + currentUserId + '/edit', {trigger: true});
    }
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

function addHeader() {
  var headerView = new CloudSound.Views.Header({parent: this});
  this.addSubview('div.header', headerView);
};

function renderWave(options) {
  if (this.wave) {
    this.wave.destroy();
  }

  var wave = Object.create(WaveSurfer);
  this.wave = wave;
  this.wave.playability = false;

  wave.init({
    barWidth: 2,
    cursorWidth: 0,
    container: this.$('div#audio-wave')[0],
    waveColor: options.color,
    progressColor: '#FF5100',
    cursorColor: '#FF5100',
    normalize: true,
    fillParent: true,
    height: options.height,
    loaded: false,
  });

  var progressDiv = this.$('#progress-bar');
  var progressBar = this.$('.progress-bar');
  progressDiv.css('display', 'block');
  progressBar.css('background', options.color);
  //
  // var showProgress = function (percent, xhr) {
  //   progressBar.css('width', percent + '%');
  // };
  //
  var hideProgress = function () {
    progressBar.css('opacity', '0');
    setTimeout(function(){ progressDiv.css('display', 'none'); }, 500);
  };
  //
  // wave.on('loading', showProgress);
  wave.on('ready', hideProgress);
  wave.on('destroy', hideProgress);
  wave.on('error', hideProgress);

  // wave.on("loading", function (percent, xhr) {
  //   if (typeof wave.destroyMe !== "undefined") {
  //     xhr.abort();
  //     wave.destroy();
  //   }
  // });

  wave.on("ready", function() {
    wave.loaded = true;
    wave.loading = false;
    wave.playPause();
    this.$('div#audio-wave').toggleClass('active');
    this.$('button.play-pause').removeClass('loading');
    this.$('button.play-pause').toggleClass('playing');
    this.$('.track-times').removeClass('hidden');
    this.$('.cursor-time').html('0:00');
    this.$('.end-time').html(secondsToHms(wave.getDuration()));
    this.wave.playability = false;
    this.addPlay();
    wave.on("audioprocess", function() {
      this.$('.cursor-time').html(secondsToHms(wave.getCurrentTime()));
    }.bind(this));
  }.bind(this));

  wave.on("finish", function() {
    this.endTrack();
  }.bind(this));
};
