var ShowerToken = artifacts.require("./ShowerToken.sol");

module.exports = function(deployer) {
  deployer.deploy(ShowerToken, 1000000);
};
