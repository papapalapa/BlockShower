App = {
    web3Provider: null,
    contracts: {},
    account: '0x0',
    loading: false,
    tokenPrice: 1000000000000000,
    tokensSold: 0,
    tokensAvailable: 750000,
  
    init: function() {
      console.log("App initialized...")
      return App.initWeb3();
    },
  
    initWeb3: function() {
      if (typeof web3 !== 'undefined') {
        // If a web3 instance is already provided by Meta Mask.
        App.web3Provider = web3.currentProvider;
        web3 = new Web3(web3.currentProvider);
      } else {
        // Specify default instance if no web3 instance provided
        App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
        web3 = new Web3(App.web3Provider);
      }
      return App.initContracts();
    },
  
    initContracts: function() {
      $.getJSON("ShowerTokenSale.json", function(ShowerTokenSale) {
        App.contracts.ShowerTokenSale = TruffleContract(ShowerTokenSale);
        App.contracts.ShowerTokenSale.setProvider(App.web3Provider);
        App.contracts.ShowerTokenSale.deployed().then(function(ShowerTokenSale) {
          console.log("Shower Token Sale Address:", ShowerTokenSale.address);
        });
      }).done(function() {
        $.getJSON("ShowerToken.json", function(ShowerToken) {
          App.contracts.ShowerToken = TruffleContract(ShowerToken);
          App.contracts.ShowerToken.setProvider(App.web3Provider);
          App.contracts.ShowerToken.deployed().then(function(ShowerToken) {
            console.log("Shower Token Address:", ShowerToken.address);
          });
  
          App.listenForEvents();
          return App.render();
        });
      })
    },
  
    // Listen for events emitted from the contract
    listenForEvents: function() {
      App.contracts.ShowerTokenSale.deployed().then(function(instance) {
        instance.Sell({}, {
          fromBlock: 0,
          toBlock: 'latest',
        }).watch(function(error, event) {
          console.log("event triggered", event);
          App.render();
        })
      })
    },
  
    render: function() {
      if (App.loading) {
        return;
      }
      App.loading = true;
  
      var loader  = $('#loader');
      var content = $('#content');
  
      loader.show();
      content.hide();
  
      // Load account data
      web3.eth.getCoinbase(function(err, account) {
        if(err === null) {
          App.account = account;
          $('#accountAddress').html("Your Account: " + account);
        }
        else {
            console.log("Error loading account address")
        }
      })

      console.log("Address retrieved")
      // Load token sale contract
      App.contracts.ShowerTokenSale.deployed().then(function(instance) {
        ShowerTokenSaleInstance = instance;
        return ShowerTokenSaleInstance.tokenPrice();
      }).then(function(tokenPrice) {
        App.tokenPrice = tokenPrice;
        $('.token-price').html(web3.fromWei(App.tokenPrice, "ether").toNumber());
        console.log("Token Price sent to ether")
        return ShowerTokenSaleInstance.tokensSold();
      }).then(function(tokensSold) {
        App.tokensSold = tokensSold.toNumber();
        $('.tokens-sold').html(App.tokensSold);
        $('.tokens-available').html(App.tokensAvailable);
  
        var progressPercent = (Math.ceil(App.tokensSold) / App.tokensAvailable) * 100;
        $('#progress').css('width', progressPercent + '%');
  
        console.log("Everything set to go")
        // Load token contract
        App.contracts.ShowerToken.deployed().then(function(instance) {
          ShowerTokenInstance = instance;
          return ShowerTokenInstance.balanceOf(App.account);
        }).then(function(balance) {
          $('.token-balance').html(balance.toNumber());
          App.loading = false;
          loader.hide();
          content.show();
        })
      });
    },
  
    buyTokens: function() {
      $('#content').hide();
      $('#loader').show();
      var numberOfTokens = $('#numberOfTokens').val();
      App.contracts.ShowerTokenSale.deployed().then(function(instance) {
        return instance.buyTokens(numberOfTokens, {
          from: App.account,
          value: numberOfTokens * App.tokenPrice,
          gas: 500000 // Gas limit
        });
      }).then(function(result) {
        console.log("Tokens bought...")
        $('form').trigger('reset') // reset number of tokens in form
        // Wait for Sell event
      });
    }
  }
  
  $(function() {
    $(window).load(function() {
      App.init();
    })
  });