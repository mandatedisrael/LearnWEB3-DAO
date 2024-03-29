require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();


module.exports = {
  solidity: "0.8.9",
  defaultNetwork: "goerli",
  networks: {
    goerli: {
      url: process.env.ALCHEMY_HTTP_URL,
      accounts: [process.env.PRIVATE_KEY],
    }
  }
};
