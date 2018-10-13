var ShowerTokenSale = artifacts.require("./ShowerTokenSale.sol");

contract('ShowerTokenSale', function(accounts) {
    var tokenSaleInstance;
    var tokenPrice = 1000000000000000; // in Wei

    it('initializes the contract with the correct values', function(){
        return ShowerTokenSale.deployed().then(function(instance){
            tokenSaleInstance = instance;
            return tokenSaleInstance.address;
        }).then(function(address) {
            assert.notEqual(address, 0x0, 'hast contract address');
            return tokenSaleInstance.tokenContract();
        }).then(function(address) {
            assert.notEqual(address, 0x0, 'has token contract address');
            return tokenSaleInstance.tokenPrice();
        }).then(function(price) {
            assert.equal(price, tokenPrice, 'token price is correct');
        });
    });
});