const { parseEther, toBigInt, formatEther, parseUnits } = require("ethers");
const {ethers, utils, BigNumber } = require("hardhat");
require("@nomicfoundation/hardhat-ethers");


async function main() {
 
    const [deployer] = await ethers.getSigners(); 

    const controller = await ethers.getContractAt("ZKFRegistrarController", "0x910350d457933452a3C638317d62e2EFae6e6827");

    await controller.withdraw();
       
      
};

 main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});