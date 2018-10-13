pragma solidity ^0.4.23;

contract ShowerToken {
    string public name = 'Shower Token';
    string public symbol = 'SHOWER';
    string public standard = 'Shower Token v1.0';
    uint256 public totalSupply;

    // Transfer Event
    event Transfer (
        address indexed _from,
        address indexed _to,
        uint256 _value
    );

    // Approval Event
    event Approval(
        address indexed _owner,
        address indexed _spender,
        uint256 _value
    );

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance; // Needs mapping for multi-approval

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

        // Evoke Transfer event
        emit Transfer(msg.sender, _to, _value);

        return true;
    }

    /*----------- Delegated Transfer ----------*/

    // Approve function
    function approve(address _spender, uint256 _value) public returns (bool success) {
        // Handle allowance
        allowance[msg.sender][_spender] = _value;
        // Approval event
        emit Approval(msg.sender, _spender, _value);
        return true;
    }

    // TransferFrom function
    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
        require(_value <= balanceOf[_from]);
        require(_value <= allowance[_from][msg.sender]);

        balanceOf[_from] -= _value;
        balanceOf[_to] += _value;

        allowance[_from][msg.sender] -= _value;

        emit Transfer(_from, _to, _value);

        return true;
    }
}