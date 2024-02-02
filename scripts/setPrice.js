const { parseEther, toBigInt, formatEther, parseUnits } = require("ethers");
const {ethers, utils, BigNumber } = require("hardhat");
require("@nomicfoundation/hardhat-ethers");

function getPrice(n) {
    return 100 * n;
};

async function main() {
 
    const [deployer] = await ethers.getSigners(); 

    const stablePriceOracle = await ethers.getContractAt("StablePriceOracle", "0x20044e113aa9aEADB3b4d7C068fc28a2307A7D2c");
       
    console.log("----------------------------------------------------------");

    // set prices
    const oneYearDuration =  toBigInt(1 * 60 * 60 * 24 * 365);
     

    const price1Letter = (toBigInt(toBigInt(499) ** 18n) / oneYearDuration)
    const price2Letter = (toBigInt(toBigInt(499) ** 18n) / oneYearDuration)
    const price3Letter = (toBigInt(toBigInt(199) ** 18n) / oneYearDuration)
    const price4Letter = (toBigInt(toBigInt(49) ** 18n) / oneYearDuration)
    const price5Letter = (toBigInt(toBigInt(5) ** 18n) / oneYearDuration)
    
 
    
    console.log("oneYearDuration: "+ oneYearDuration);
      
    console.log( "Send price1Letter:"+ (price1Letter)); 
    console.log( "Send price2Letter:"+ (price2Letter)); 
    console.log( "Send price3Letter:"+ (price3Letter)); 
    console.log( "Send price4Letter:"+ (price4Letter)); 
    console.log( "Send price5Letter:"+ (price5Letter)); 
    console.log("------------------")
    
    console.log(parseEther("0.000000000000158231"));
    console.log(parseEther("0.000000000000158231"));
    console.log(parseEther("0.000000000000063102"));
    console.log(parseEther("0.000000000000015537"));
    console.log(parseEther("0.000000000000001585"));

    console.log(parseEther("0.000000000000158231").toString());
    console.log(parseEther("0.000000000000158231").toString());
    console.log(parseEther("0.000000000000063102").toString());
    console.log(parseEther("0.000000000000015537").toString());
    console.log(parseEther("0.000000000000001585").toString());


    await stablePriceOracle.setPrices([
        parseEther("0.000000000000158231"), 
        parseEther("0.000000000000158231"), 
        parseEther("0.000000000000063102"),
        parseEther("0.000000000000015537"), 
        parseEther("0.000000000000001585")
    ]);

    
};

 main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});


