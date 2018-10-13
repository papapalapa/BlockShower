var ShowerToken = artifacts.require("./ShowerToken.sol");
var ShowerTokenSale = artifacts.require("./ShowerTokenSale.sol");

module.exports = function(deployer) {
  deployer.deploy(ShowerToken, 1000000).then(function() {
    var tokenPrice = 1000000000000000;
    return deployer.deploy(ShowerTokenSale, ShowerToken.address, tokenPrice);
  });
};
