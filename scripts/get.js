const { parseEther, toBigInt, formatEther } = require("ethers");
const {ethers, utils, BigNumber } = require("hardhat");
require("@nomicfoundation/hardhat-ethers");


async function main() {
  
    const fnsDeployer = await ethers.getContractAt("ZKFRegistrarController", "0x910350d457933452a3C638317d62e2EFae6e6827");
    const owner =  await fnsDeployer.owner();
     
     
    console.log("owner: "+ owner);
     
 
};

 main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});