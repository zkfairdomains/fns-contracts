require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");   


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
    etherscan: {
        apiKey: "FS1QSVDXCPUFGE1VCX74EQJKZ4JG8WE8SI",
    },
};