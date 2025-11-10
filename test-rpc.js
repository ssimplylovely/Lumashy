const { ethers } = require("ethers");

async function main() {
  const url = "https://dream-rpc.somnia.network"; // RPC Somnia Testnet
  try {
    const provider = new ethers.JsonRpcProvider(url);
    const chainId = await provider.send("eth_chainId", []);
    const block = await provider.getBlockNumber();

    console.log("✅ Connected to RPC!");
    console.log("Chain ID (hex):", chainId);
    console.log("Current Block:", block);
  } catch (err) {
    console.error("❌ Connection error:", err.message);
  }
}

main();
