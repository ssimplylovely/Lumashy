// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/// @title Lumashy Reward Token
/// @notice Token ERC20 sederhana untuk sistem reward Lumashy.
contract LumashyReward is ERC20, Ownable {
    constructor(uint256 initialSupply) ERC20("Lumashy Token", "LUMA") {
        _mint(msg.sender, initialSupply);
    }

    /// @notice Mint token baru (hanya bisa dilakukan oleh pemilik)
    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }
}
