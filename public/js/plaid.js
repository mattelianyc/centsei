

  $("#menu-toggle").click(function(e) {
      e.preventDefault();
      $("#wrapper").toggleClass("toggled");
  });

  $('#link-btn').on('click', function(e) {
    handler.open();
  });
  $('#log-out-btn').on('click', function(e) {
    logoutHandler.exit();
  });

  $('#get-accounts-btn').on('click', function(e) {
    $.get('/accounts', function(data) {
      if (data.error) {
        console.log(data.error);
      } else {
        console.log('accounts'+data);
      }
    });
   });

  $('#get-item-btn').on('click', function(e) {
    $.post('/item', function(data) {
      if (data.error) {
        console.log(data.error);
      } else {
        console.log(data);
      }
    });
  });

  $('#get-transactions-btn').on('click', function(e) {
    $.post('/transactions', function(data) {
      if (data.error) {
        console.log(data.error);
      } else {
        console.log(data);
      }
    });
  });

  var handler = Plaid.create({
    apiVersion: 'v2',
    clientName: 'Plaid Walkthrough Demo',
    env: '<%= PLAID_ENV %>',
    product: ['transactions'],
    key: '<%= PLAID_PUBLIC_KEY %>',
    onSuccess: function(public_token) {
      $.post('/get_access_token', {
        public_token: public_token
      }, function() {
        $('#login-container').hide();
        $('#authenticated-container').fadeIn();
      });
    },
  });

  var logoutHandler = Plaid.create({
    apiVersion: 'v2',
    clientName: 'Plaid Walkthrough Demo',
    env: '<%= PLAID_ENV %>',
    product: ['transactions'],
    key: '<%= PLAID_PUBLIC_KEY %>',
    onSuccess: function(public_token) {
      $.post('/logout', {
        public_token: public_token
      }, function() {
        $('#authenticated-container').fadeOut();
        $('#login-container').fadeIn();
      });
    },
  });
