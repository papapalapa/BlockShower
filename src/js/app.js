App = {
    web3Provider: null,
    contracts: {},
    account: '0x0',

    init: function() {
        console.log("App initialized");
        return App.initWeb3();
    },

    initWeb3: function() {
        if (typeof web3 !== 'undefined') {
            App.web3Provider = web3.currentProvider;
            web3 = new Web3(web3.currentProvider);
        } else {
            // Set the provider you want from Web3.providers
            App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
            web3 = new Web3(App.web3Provider);
        }

        return App.initContracts();
    },

    initContracts: function() {
        $.getJSON("ShowerTokenSale.json", function(showerTokenSale) {
            App.contracts.ShowerTokenSale = TruffleContract(showerTokenSale);
            App.contracts.ShowerTokenSale.setProvider(App.web3Provider);
            App.contracts.ShowerTokenSale.deployed().then(function(showerTokenSale) {
                console.log("Shower Token Sale Address:", showerTokenSale.address);
            });
        }).done(function() {
            $.getJSON("ShowerToken.json", function(showerToken) {
                App.contracts.ShowerToken = TruffleContract(showerToken);
                App.contracts.ShowerToken.setProvider(App.web3Provider);
                App.contracts.ShowerToken.deployed().then(function(showerToken) {
                    console.log("Shower Token Address:", showerToken.address);
                });
            });
            return App.render();
        });
    },

    render: function() {
        // Load Account Data
        web3.eth.getCoinbase(function(err, account) {
            if (err === null) {
                console.log("Account:", account);
                App.account = account;
                $('#accountAddress').html("Your Account: " + account);
            }
        })
    }
}

$(function() {
    $(window).on('load', function() {
        App.init();
    })
});