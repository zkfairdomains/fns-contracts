require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");   


/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: "0.8.20",
    paths: {
        artifacts: "./src",
    },
    networks: {
        zkFair: {
            url: process.env.RPC_URL,
            accounts: [process.env.DEPLOYER_PRIVATE_KEY],
        },
        sepolia: {
            url: `https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`,
          accounts: [process.env.DEPLOYER_PRIVATE_KEY]
        },
        goerli: {
            url: `https://goerli.infura.io/v3/${process.env.INFURA_API_KEY}`,
            accounts: [process.env.DEPLOYER_PRIVATE_KEY]
        }
    },
    etherscan: {
        apiKey: "FS1QSVDXCPUFGE1VCX74EQJKZ4JG8WE8SI",
    },
};