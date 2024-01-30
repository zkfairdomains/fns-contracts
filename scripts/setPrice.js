const { parseEther, toBigInt, formatEther, parseUnits } = require("ethers");
const {ethers, utils, BigNumber } = require("hardhat");
require("@nomicfoundation/hardhat-ethers");


async function main() {
 
    const [deployer] = await ethers.getSigners(); 

    const stablePriceOracle = await ethers.getContractAt("StablePriceOracle", process.env.STABLE_PRICE_ORACLE_CONTRACT_ADDRESS);
      
    console.log("price1Letter: "+ await stablePriceOracle.price1Letter());
    console.log("price2Letter: "+ await stablePriceOracle.price2Letter());
    console.log("price3Letter: "+ await stablePriceOracle.price3Letter());
    console.log("price4Letter: "+ await stablePriceOracle.price4Letter());
    console.log("price5Letter: "+ await stablePriceOracle.price5Letter());

    console.log("----------------------------------------------------------");

    // set prices
    const oneYearDuration =  toBigInt((1 * 60 * 60 * 24 * 365));
    const ether999 = parseEther("999");
    const ether499 = parseEther("499");
    const ether99 = parseEther("99");
    const ether49 = parseEther("49");
    const ether5 = parseEther("5");

    const price1Letter = ether999 / oneYearDuration;
    const price2Letter = ether999 / oneYearDuration;
    const price3Letter = ether499 / oneYearDuration;
    const price4Letter = ether49 / oneYearDuration;
    const price5Letter = ether5 / oneYearDuration;

    
    console.log("oneYearDuration: "+ oneYearDuration);
    console.log("oneEther:"+ ether5); 
    console.log( "price1Letter per duration:"+ ethers.parseEther(price1Letter.toString()) ); 
    console.log( "price2Letter per duration:"+ ethers.parseEther(price2Letter.toString()) ); 
    console.log( "price3Letter per duration:"+ ethers.parseEther(price3Letter.toString()) ); 
    console.log( "price4Letter per duration:"+ ethers.parseEther(price4Letter.toString()) ); 
    console.log( "price5Letter per duration:"+ ethers.parseEther(price5Letter.toString()) ); 

    console.log( "Format price1Letter:"+ ethers.formatUnits(price1Letter * oneYearDuration) ); 
    console.log( "Format price2Letter:"+ ethers.formatUnits(price2Letter * oneYearDuration) ); 
    console.log( "Format price3Letter:"+ ethers.formatUnits(price3Letter * oneYearDuration) ); 
    console.log( "Format price4Letter:"+ ethers.formatUnits(price4Letter * oneYearDuration) ); 
    console.log( "Format price5Letter:"+ ethers.formatUnits(price5Letter * oneYearDuration) ); 

    await stablePriceOracle.connect(deployer).setPrices([[
        ethers.parseEther(price1Letter.toString()), 
        ethers.parseEther(price2Letter.toString()),
        ethers.parseEther(price3Letter.toString()), 
        ethers.parseEther(price4Letter.toString()), 
        ethers.parseEther(price5Letter.toString())
    ]], { from: deployer.address })
};

 main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});


