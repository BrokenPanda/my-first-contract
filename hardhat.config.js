require("@nomiclabs/hardhat-waffle");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  defaultNetwork: "goerli",
  networks: {
    goerli: {
      chainId: 5,
      url: process.env['STAGING_ALCHEMY_URL'],
      accounts: [process.env['PRIVATE_KEY']],
    },
    mainnet: {
      chainId: 1,
      url: process.env['PROD_ALCHEMY_URL'],
      accounts: [process.env['PRIVATE_KEY']],
    },
  },
  solidity: "0.8.4",
};
