// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract MyFirstContract {
    uint256 totalVotes;

    constructor() {
        console.log("Hello World");
    }

    function vote() public {
        totalVotes += 1;
        console.log("%s has voted.", msg.sender);
    }

    function getTotalVotes() public view returns (uint256) {
        console.log("We have %d total votes!", totalVotes);
        return totalVotes;
    }
}