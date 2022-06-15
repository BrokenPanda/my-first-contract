// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract MyFirstContract {
    uint256 totalVotes;

  event newVote(address indexed voter, uint proposalId, string message, uint timestamp);

  struct Vote {
    address voter;
    uint proposalId;
    string message;
    uint timestamp;
  }

    Vote[] votes;
  
    constructor() payable {
        console.log("Voting Contract got initialized!");
    }

    function vote(uint _proposalId, string memory _message) public {
        totalVotes += 1;
        console.log("%s has voted for proposal %s with message %s.", msg.sender, _proposalId, _message);

      votes.push(Vote(msg.sender, _proposalId, _message, block.timestamp));
      emit newVote(msg.sender, _proposalId, _message, block.timestamp);
      
      uint prizeAmount = 0.0001 ether;
      require(prizeAmount <= address(this).balance, "Trying to withdraw more money than the contract has.");
      (bool success, ) = (msg.sender).call{value: prizeAmount}("");
      require(success, "Failed to withdraw money from contract.");
    }

  function getVotes() public view returns (Vote[] memory) {
    return votes;
  }
  
    function getTotalVotes() public view returns (uint256) {
        console.log("We have %d total votes!", totalVotes);
        return totalVotes;
    }
}