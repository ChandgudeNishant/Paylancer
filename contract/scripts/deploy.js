const { ethers } = require("hardhat");

async function main() {
  // Retrieve the contract factories and signer from ethers
  const BiddingContract = await ethers.getContractFactory("BiddingContract");
  const signer = (await ethers.getSigners())[0];

  // Deploy the contract
  const contract = await BiddingContract.deploy();

  // Wait for the contract to be mined and get the deployed address
  await contract.deployed();
  console.log("Contract deployed to:", contract.address);

  // Perform additional operations or interact with the contract
  // ...

  // Disconnect the signer
}

// Run the deployment script
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
});
