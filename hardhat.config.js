require("dotenv").config();
//require("@nomicfoundation/hardhat-toolbox");
//require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require('hardhat-deploy');

/** @type import('hardhat/config').HardhatUserConfig */

module.exports = {
    solidity: {
        compilers: [
          {
            version: "0.8.20",
            settings: {
              optimizer: {
                enabled: true,
                runs: 200
              }
            }
          }
        ]
    },
    paths: {
        artifacts: "./src",
    },
    networks: {
        zkfair: {
            url: "https://rpc.zkfair.io",
            accounts: [process.env.DEPLOYER_PRIVATE_KEY],
        },
        sepolia: {
            //url: `https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`,
            url: `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
            accounts: [process.env.DEPLOYER_PRIVATE_KEY],
            allowUnlimitedContractSize: true
        },
        goerli: {
            //url: `https://goerli.infura.io/v3/${process.env.INFURA_API_KEY}`,
            url: `https://eth-goerli.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
            accounts: [process.env.DEPLOYER_PRIVATE_KEY],
            allowUnlimitedContractSize: true,
        }
    },
    sourcify: {
      enabled: true
    },
    etherscan: {
        apiKey: process.env.ETHER_SCAN_API_KEY,
        customChains: [
          {
            network: "zkfair",
            chainId: 42766,
            urls: {
              apiURL: "https://scan.zkfair.io/api/?module=contract&action=verify",
              browserURL: "https://scan.zkfair.io"
            }
          }
        ]
    },
    
};