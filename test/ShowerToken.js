var ShowerToken = artifacts.require("./ShowerToken.sol");

contract('ShowerToken', function(accounts) {
    var tokenInstance;
    
    // Testing initialization and validity of the contract
    it ('Initialize the contract', function() {
        return ShowerToken.deployed().then(function(instance) {
            tokenInstance = instance;
            return tokenInstance.name();
        }).then(function(name) {
            assert.equal(name, 'Shower Token', 'has the correct name');
            return tokenInstance.symbol();
        }).then(function(symbol) {
            assert.equal(symbol, 'SHOWER', 'has the correct symbol');
            return tokenInstance.standard();
        }).then(function(standard) {
            assert.equal(standard, 'Shower Token v1.0', 'has the correct standard');
        })
    });

    // Testing validity of the supply blocks
    it ('Initialize total supply upon deployment', function() {
        return ShowerToken.deployed().then(function(instance) {
            tokenInstance = instance;
            return tokenInstance.totalSupply();
        }).then(function(totalSupply) {
            assert.equal(totalSupply.toNumber(), 1000000, 'Initialize the amount of tokens to 1,000,000');
            return tokenInstance.balanceOf(accounts[0]);
        }).then(function(adminBalance) {
            assert.equal(adminBalance.toNumber(), 1000000, 'Allocate initial amount of tokens to the admin')
        });
    });

    // Testing validity of transfer method
    it ('Transfers token ownership', function() {
        return ShowerToken.deployed().then(function(instance) {
            tokenInstance = instance;
            return tokenInstance.transfer.call(accounts[1], 99999999999);
        }).then(assert.fail).catch(function(err) {
            assert(err.message.indexOf('revert') >= 0, 'error message must contain revert');
            return tokenInstance.transfer.call(accounts[1], 250000, {from: accounts[0]});
        }).then(function(success){
            assert.equal(success, true, 'It returns true');
            return tokenInstance.transfer(accounts[1], 250000, {from: accounts[0]});
        }).then(function(receipt) {
            assert.equal(receipt.logs.length, 1, 'triggers one event');
            assert.equal(receipt.logs[0].event, 'Transfer', 'Should be the "Transfer" event');
            assert.equal(receipt.logs[0].args._from, accounts[0], 'Log the sending account');
            assert.equal(receipt.logs[0].args._to, accounts[1], 'Log the receiving account');
            assert.equal(receipt.logs[0].args._value, 250000, 'Log the transaction value');
            return tokenInstance.balanceOf(accounts[1]);
        }).then(function(balance) {
            assert.equal(balance.toNumber(), 250000, 'adds the amount to the receving account');
            return tokenInstance.balanceOf(accounts[0]);
        }).then(function(balance) {
            assert.equal(balance.toNumber(), 750000, 'deducts the amount from the sending account');
        });
    });

    // Testing validity of delegated transfer transaction
    it('approves tokens for delegated transfer', function() {
        return ShowerToken.deployed().then(function(instance) {
            tokenInstance = instance;
            return tokenInstance.approve.call(accounts[1], 100);
        }).then(function(success) {
            assert.equal(success, true, 'it returns true')
            return tokenInstance.approve(accounts[1], 100);
        }).then(function(receipt){
            assert.equal(receipt.logs.length, 1, 'triggers one event');
            assert.equal(receipt.logs[0].event, 'Approval', 'Should be the "Approval" event');
            assert.equal(receipt.logs[0].args._owner, accounts[0], 'Log the sending account');
            assert.equal(receipt.logs[0].args._spender, accounts[1], 'Log the receiving account');
            assert.equal(receipt.logs[0].args._value, 100, 'Log the approved value');
            return tokenInstance.allowance(accounts[0], accounts[1]);
        }).then(function(allowance) {
            assert.equal(allowance.toNumber(), 100, 'stores the allowance for delegated transfer');
        });
    });
});