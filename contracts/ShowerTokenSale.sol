pragma solidity ^0.4.23;

import "./ShowerToken.sol";

contract ShowerTokenSale {
    address admin;
    ShowerToken public tokenContract;
    uint256 public tokenPrice;

    constructor (ShowerToken _tokenContract, uint256 _tokenPrice) public {
        admin = msg.sender; // Assign an admin
        tokenContract = _tokenContract; // Assign Token Contract
        tokenPrice = _tokenPrice; // Assign Token Price
    }
}