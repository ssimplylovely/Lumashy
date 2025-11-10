const hre = require("hardhat");

async function main() {
  const LumashyReward = await hre.ethers.getContractFactory("LumashyReward");
  const lumashyReward = await LumashyReward.deploy(); // tidak ada argumen di sini

  await lumashyReward.waitForDeployment();

  console.log("LumashyReward deployed to:", await lumashyReward.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
