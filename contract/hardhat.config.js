require('dotenv').config();
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");
/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.0",
  networks: {
    localhost: {
      url: "http://localhost:8545",
      chainId: 31337,
      // Localhost network URL
    },
  },
};
