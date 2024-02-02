const { parseEther, toBigInt, formatEther, parseUnits } = require("ethers");
const {ethers, utils, BigNumber } = require("hardhat");
require("@nomicfoundation/hardhat-ethers");

function getPrice(n) {
    return 100 * n;
};

async function main() {
 
    const [deployer] = await ethers.getSigners(); 

    const baseRegistrar = await ethers.getContractAt("BaseRegistrarImplementation", "0xd6367111d1d47629C461dAA0318D0a27b188D91e");
        
    await baseRegistrar.setBaseUri("https://metadata.zkfair.domains/zkfair/0xd6367111d1d47629C461dAA0318D0a27b188D91e/");

    
};

 main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

 