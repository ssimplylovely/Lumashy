// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract LumashyReward {
    string public name = "Lumashy Reward Token";
    uint256 public totalRewards;

    mapping(address => uint256) public rewards;

    function addReward(address user, uint256 amount) public {
        rewards[user] += amount;
        totalRewards += amount;
    }

    function getReward(address user) public view returns (uint256) {
        return rewards[user];
    }
}
