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

    that = this;

    if (!this.doChecks()) {
      return;
    }

    var attrs = $(e.currentTarget).serializeJSON().user;
    this.model.save(attrs, {
      success: function() {
        CloudSound.currentUser.fetch({
          success: function() {
            that.parent.enableScroll();
            Backbone.history.navigate('users/' + CloudSound.currentUser.id + '/edit', {trigger: true});
          },
        });
        that.collection.add(that.model, { merge: true });
      },
      error: function(data){
        that.$('.errors').html("That email address already has an account!")
      },
    });
  },

  doChecks: function() {

    var pass = true;

    if (that.$('#email').val().length < 1) {
      that.$('.errors-email').html("Please enter an email address.");
      that.$('#email').css('border-color', 'red');
      pass = false;
    } else {
      that.$('.errors-email').empty();
      that.$('#email').css('border-color', '#ccc');
    }

    if (that.$('#password').val().length < 6) {
      that.$('.errors-password').html("Please enter at least 6 characters.");
      that.$('#password').css('border-color', 'red');
      pass = false;
    } else {
      that.$('.errors-password').empty();
      that.$('#password').css('border-color', '#ccc');
    }

    if (that.$('#password_confirmation').val() !== that.$('#password').val()) {
      that.$('.errors-password-confirm').html("Your passwords do not match.");
      that.$('#password_confirmation').css('border-color', 'red');
      pass = false;
    } else {
      that.$('.errors-password-confirm').empty();
      that.$('#password_confirmation').css('border-color', '#ccc');
    }

    if (!that.$('#terms_agree').prop('checked')) {
      that.$('.errors-checkbox').html("You must agree to the terms and conditions.");
      that.$('#terms_agree').css('border-color', 'red');
      pass = false;
    } else {
      that.$('.errors-checkbox').empty();
      that.$('#terms_agree').css('border-color', '#ccc');
    }

    return pass;
  },

})
