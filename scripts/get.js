const {ethers, utils} = require("hardhat");
require("@nomicfoundation/hardhat-ethers");


async function main() {
 
     const fnsDeployer = await ethers.getContractAt("FNSDeployer", process.env.FNS_DEPLOYER_CONTRACT_ADDRESSS);
     const baseRegistrarImplementation =  await fnsDeployer.baseRegistrarImplementation();
     const ensRegistry =  await fnsDeployer.ensRegistry();
     const ensRegistryWithFallback =  await fnsDeployer.ensRegistryWithFallback();
     const fifsRegistrar =  await fnsDeployer.fifsRegistrar();
     const publicResolver =  await fnsDeployer.publicResolver();
     const reverseRegistrar =  await fnsDeployer.reverseRegistrar();
     const stablePriceOracle =  await fnsDeployer.stablePriceOracle();
     const zkfRegistrarController =  await fnsDeployer.zkfRegistrarController();
     

     console.log("baseRegistrarImplementation: "+ baseRegistrarImplementation);
     console.log("ensRegistry: "+ ensRegistry);
     console.log("ensRegistryWithFallback: "+ ensRegistryWithFallback);
     console.log("fifsRegistrar: "+ fifsRegistrar);
     console.log("publicResolver: "+ publicResolver);
     console.log("reverseRegistrar: "+ reverseRegistrar);
     console.log("stablePriceOracle: "+ stablePriceOracle);
     console.log("zkfRegistrarController: "+ zkfRegistrarController);
    
};

 main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});