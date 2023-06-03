require('dotenv').config();
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");

  const privateKey = process.env.REACT_APP_PRIVATE_KEY;
  const providerUrl = process.env.REACT_APP_PROVIDER_URL;

  const PUBLIC_KEY = "0x15279489697176dA1E5f0B0d15f376f1b22fD9aC";


module.exports = {
  solidity: "0.8.9",
  defaultNetwork: "polygon_mumbai",
  networks: {
    hardhat: {
    },
    polygon_mumbai: {
      url: providerUrl,
      accounts: [`0x${privateKey}`]
    },
    localhost: {
      url: "http://localhost:8545",
      chainId: 31337,
      // Localhost network URL
    },
  },


  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  mocha: {
    timeout: 20000
  }
}
