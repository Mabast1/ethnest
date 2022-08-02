// https://eth-goerli.g.alchemy.com/v2/2tL4dOX-WXJfmfio9J-uHUEAStXf40gp
require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.9",
  networks: {
    goerli: {
      url: "https://eth-goerli.g.alchemy.com/v2/2tL4dOX-WXJfmfio9J-uHUEAStXf40gp",
      accounts: [
        "c7c648b2ba5d02bf3b5bced17025eaada84ff2556cad47d0a0f5babb5b1b1ae9",
      ],
    },
  },
};
