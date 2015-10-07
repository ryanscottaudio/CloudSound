CloudSound.Views.UserForm = Backbone.View.extend({

  tagName: 'div',
  className: 'userTab',

  template: JST['users/form'],

  initialize: function(options) {
    this.parent = options.parent;
    this.listenTo(this.model, "sync", this.render);
  },

  events: {
    "submit form": "submit",
  },

  render: function() {
    this.$el.html(this.template({user: this.model}));
    this.$('.cs-input#email').focus();

    return this;
  },

  submit: function(e) {
    e.preventDefault();

    if (!this.doChecks()) {
      return;
    }

    var attrs = $(e.currentTarget).serializeJSON().user;
    this.model.save(attrs, {
      success: function() {
        CloudSound.currentUser.fetch({
          success: function() {
            this.parent.enableScroll();
            Backbone.history.navigate('users/' + CloudSound.currentUser.id + '/edit', {trigger: true});
          }.bind(this),
        });
      }.bind(this),
      error: function(data){
        this.$('.errors').html("That email address already has an account!")
      }.bind(this),
    });
  },

  doChecks: function() {

    var pass = true;

    if (this.$('#email').val().length < 1) {
      this.$('.errors-email').html("Please enter an email address.");
      this.$('#email').css('border-color', 'red');
      pass = false;
    } else {
      this.$('.errors-email').empty();
      this.$('#email').css('border-color', '#ccc');
    }

    if (this.$('#password').val().length < 6) {
      this.$('.errors-password').html("Please enter at least 6 characters.");
      this.$('#password').css('border-color', 'red');
      pass = false;
    } else {
      this.$('.errors-password').empty();
      this.$('#password').css('border-color', '#ccc');
    }

    if (this.$('#password_confirmation').val() !== this.$('#password').val()) {
      this.$('.errors-password-confirm').html("Your passwords do not match.");
      this.$('#password_confirmation').css('border-color', 'red');
      pass = false;
    } else {
      this.$('.errors-password-confirm').empty();
      this.$('#password_confirmation').css('border-color', '#ccc');
    }

    if (!this.$('#terms_agree').prop('checked')) {
      this.$('.errors-checkbox').html("You must agree to the terms and conditions.");
      this.$('#terms_agree').css('border-color', 'red');
      pass = false;
    } else {
      this.$('.errors-checkbox').empty();
      this.$('#terms_agree').css('border-color', '#ccc');
    }

    return pass;
  },

})
