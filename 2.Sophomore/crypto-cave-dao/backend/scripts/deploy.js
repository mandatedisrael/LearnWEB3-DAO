const hre = require("hardhat");
const { CRYPTOCAVE_NFT_CONTRACT_ADDRESS } = require("../constants.js")

//* How to change this file
/*
- Fill in the `ContractName` with your contract name.
- Uncomment the verification process if you want to verify your contract but make sure to uncomment the same in the `hardhat.config.js` and change the values as required.

You can pass in values into your contract like doing the following :
ex : Asssume you have a string and a number to pass
` const lock = await Lock.deploy("hello", 5);`
*/

//* Sample Deployment
/*
  const Lock = await hre.ethers.getContractFactory("ContractName");
  const lock = await Lock.deploy();

  await lock.deployed();

  console.log("Contract Deployed to : ", lock.address);

  console.log("Sleeping...");
  await sleep(50000);
  await hre.run("verify:verify", {
    address: lock.address,
    constructorArguments: [],
  });
*/

async function main() {
    // Deploy the FakeNFTMarketplace contract first
    const FakeNFTMarketplace = await ethers.getContractFactory(
      "NFTMarketPlace"
    );
    const fakeNftMarketplace = await FakeNFTMarketplace.deploy();
    await fakeNftMarketplace.deployed();

    console.log("FakeNFTMarketplace deployed to: ", fakeNftMarketplace.address);

    // Now deploy the CryptoCaveDAO contract
    const cryptoCaveDAO = await ethers.getContractFactory("CryptoCaveDAO");
    const _cryptoCaveDAO = await cryptoCaveDAO.deploy(
      fakeNftMarketplace.address,
      CRYPTOCAVE_NFT_CONTRACT_ADDRESS,
      {
        // This assumes your metamask account has at least 1 ETH in its account
        // Change this value as you want
        value: ethers.utils.parseEther("0.1"),
      }
    );
    await _cryptoCaveDAO.deployed();

    console.log("CryptoCAVEDAO deployed to: ", _cryptoCaveDAO.address);
}

// Async Sleep function
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
