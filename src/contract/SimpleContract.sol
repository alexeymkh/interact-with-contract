// SPDX-License-Identifier: MIT
pragma solidity 0.8.21;

contract SimpleContract {
    event Greeting(string message);

    function getString() public pure returns (string memory) {
        return "it's alive!";
    }

    function sendEvent() public {
        emit Greeting("Hello!");
    }
}
