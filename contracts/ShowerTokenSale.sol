pragma solidity ^0.4.23;

import "./ShowerToken.sol";

contract ShowerTokenSale {
    address admin;
    ShowerToken public tokenContract;
    uint256 public tokenPrice;
    uint256 public tokensSold;

    event Sell(address _buyer, uint256 _amount);

    constructor (ShowerToken _tokenContract, uint256 _tokenPrice) public {
        admin = msg.sender; // Assign an admin
        tokenContract = _tokenContract; // Assign Token Contract
        tokenPrice = _tokenPrice; // Assign Token Price
    }

    // Multiply
    function multiply(uint x, uint y) internal pure returns (uint z) {
        require(y == 0 || (z = x * y) / y == x);
    }

    // Purchase Token
    function buyTokens(uint256 _numberOfTokens) public payable {
        require(msg.value == multiply(_numberOfTokens, tokenPrice));
        require(tokenContract.balanceOf(this) >= _numberOfTokens);
        require(tokenContract.transfer(msg.sender, _numberOfTokens));
        
        tokensSold += _numberOfTokens;

        emit Sell(msg.sender, _numberOfTokens);
    }

    // End Token Sales
    function endSale() public {
        require(msg.sender == admin); // Require admin
        require(tokenContract.transfer(admin, tokenContract.balanceOf(this)));
        
        admin.transfer(address(this).balance);
    }
}