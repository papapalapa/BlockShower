pragma solidity ^0.4.23;

contract ShowerToken {
    string public name = 'Shower Token';
    string public symbol = 'SHOWER';
    string public standard = 'Shower Token v1.0';
    uint256 public totalSupply;

    mapping(address => uint256) public balanceOf;

    event Transfer (
        address indexed _from,
        address indexed _to,
        uint256 _value
    );

    constructor (uint256 _initialSupply) public {
        balanceOf[msg.sender] = _initialSupply;
        totalSupply = _initialSupply;
    }

    // Transfer
    function transfer (address _to, uint256 _value) public returns (bool success){
        // Must be true, else stop the function and gas consumption
        require(balanceOf[msg.sender] >= _value);

        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;

        emit Transfer(msg.sender, _to, _value);

        return true;
    }
}