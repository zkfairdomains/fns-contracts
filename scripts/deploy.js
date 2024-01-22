const {ethers, utils} = require("hardhat");
require("@nomicfoundation/hardhat-ethers");
 
const namehash = require('eth-ens-namehash');
const tld = "zkf"; 
const labelhash = (label) => ethers.keccak256(ethers.toUtf8Bytes(label))
const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
const ZERO_HASH = "0x0000000000000000000000000000000000000000000000000000000000000000";

async function main() {
 
  const [deployer] = await ethers.getSigners();
    
  const registry = await deployRegistry();

  await setupRegistry(registry, deployer);

  const registryWithFallback = await deployRegistryWithFallback(registry);
 
  await setupRegistry(registryWithFallback, deployer);
   
  const registrar = await deployRegistrar(registryWithFallback, tld);
 
  await setupRegistrar(registryWithFallback, registrar);

  const reverseRegistrar = await deployReverseRegistrar(registryWithFallback);

  await setupReverseRegistrar(registryWithFallback, registrar, reverseRegistrar, deployer)

  const baseRegistrarImplementation = await deployBaseRegistrarImplementation(registryWithFallback);

  await setupBaseRegistrarImplementation(registryWithFallback, baseRegistrarImplementation);
 
  const stablePriceOracle = await deployStablePriceOracle();

  await setupStablePriceOracle(stablePriceOracle, ethers.parseEther("0.000000000000000025"), ethers.parseEther("0.000000000000000025"), ethers.parseEther("0.000000000000000025"), ethers.parseEther("0.000000000000000025"), ethers.parseEther("0.000000000000000025"));

  const zkfRegistrarController = await deployZKFRegistrarController(baseRegistrarImplementation, stablePriceOracle, 10, 86400, reverseRegistrar, registryWithFallback);
  
  await setupZKFRegistrarController(reverseRegistrar, baseRegistrarImplementation, zkfRegistrarController);
  
  const publicResolver  = await deployPublicResolver(registryWithFallback, zkfRegistrarController, reverseRegistrar);

  await setupResolver(registryWithFallback, publicResolver)
 

};
 
async function deployRegistry() { 
  const registry = await ethers.deployContract("ENSRegistry");
  await registry.waitForDeployment();
  console.log(`Registry Deployed: ${registry.target}`);
  return registry;
}

async function deployRegistryWithFallback(registry) { 
  const registryWithFallback = await ethers.deployContract("ENSRegistryWithFallback", [registry.target]);
  await registryWithFallback.waitForDeployment();
  console.log(`RegistryWithFallback Deployed: ${registryWithFallback.target} with params: ${registry.target}`);
  return registryWithFallback;
}

async function deployRegistrar(registry, tld) { 
  const registrar = await ethers.deployContract("FIFSRegistrar", [registry.target, namehash.hash(tld)]); 
  await registrar.waitForDeployment();
  console.log(`FIFS Registrar Deployed: ${registrar.target} with the params: ${registry.target}, ${namehash.hash(tld)}`)
  return registrar;
}
 
async function deployReverseRegistrar(registry) { 
  const reverseRegistrar = await ethers.deployContract("ReverseRegistrar", [registry.target]);
  await reverseRegistrar.waitForDeployment();
  console.log(`Reverse Registrar Deployed: ${reverseRegistrar.target} with the params: ${registry.target}`);
  return reverseRegistrar;
}
  
async function deployBaseRegistrarImplementation(registry) { 
  const baseRegistrarImplementation = await ethers.deployContract("BaseRegistrarImplementation",[registry.target, namehash.hash(tld)]);
  await baseRegistrarImplementation.waitForDeployment();
  console.log(`BaseRegistrarImplementation Deployed: ${baseRegistrarImplementation.target} with the params: ${registry.target}, ${namehash.hash(tld)}`)
  return baseRegistrarImplementation;
}

async function deployStablePriceOracle() { 
  const stablePriceOracle = await ethers.deployContract("StablePriceOracle");
  await stablePriceOracle.waitForDeployment();
  console.log(`StablePriceOracle Deployed: ${stablePriceOracle.target}`)
  return stablePriceOracle;
}

async function deployZKFRegistrarController(baseRegistrarImplementation, stablePriceOracle, minCommitmentAge, maxCommitmentAge, reverseRegistrar, registry) { 
  const zkfRegistrarController = await ethers.deployContract("ZKFRegistrarController",[baseRegistrarImplementation.target, stablePriceOracle.target, minCommitmentAge, maxCommitmentAge, reverseRegistrar.target, registry.target]);
  await zkfRegistrarController.waitForDeployment();
  console.log(`ZKFRegistrarController Deployed: ${zkfRegistrarController.target} with the params: ${baseRegistrarImplementation.target} ${stablePriceOracle.target} ${minCommitmentAge} ${maxCommitmentAge} ${reverseRegistrar.target} ${registry.target}`)
  return zkfRegistrarController;
}

async function deployPublicResolver(registry, zkfRegistrarController, reverseRegistrar) { 
  const publicResolver = await ethers.deployContract("PublicResolver",[registry.target, zkfRegistrarController.target, reverseRegistrar.target]);
  await publicResolver.waitForDeployment();
  console.log(`Public Resolver Deployed: ${publicResolver.target} with the params; registry: ${registry.target} ${zkfRegistrarController.target} ${reverseRegistrar.target}`)
  return publicResolver;
}

 
async function setupRegistry(registry, deployer) { 
  await registry.setSubnodeOwner(ZERO_HASH, labelhash("reverse"), deployer);
  await registry.setSubnodeOwner(ZERO_HASH, labelhash("resolver"), deployer);
  console.log(`Completed setupRegistry.`)
}

async function setupRegistrar(registry, registrar) {
  await registry.setSubnodeOwner(ZERO_HASH, labelhash(tld), registrar.target);
  console.log(`Completed setupRegistrar.`)
}
 
async function setupReverseRegistrar(registry, registrar, reverseRegistrar, deployer) {
  await registry.setSubnodeOwner(namehash.hash("reverse"), labelhash("addr"), reverseRegistrar.target);
  console.log(`Completed Setup Reverse Register Owner.`)
}

async function setupBaseRegistrarImplementation(registry, baseRegistrarImplementation) {
  await registry.setSubnodeOwner(ZERO_HASH, labelhash(tld), baseRegistrarImplementation.target);
  console.log(`Completed setupBaseRegistrarImplementation.`)
}

async function setupStablePriceOracle(stablePriceOracle, priceLetter1, priceLetter2, priceLetter3, priceLetter4, priceLetter5) {
  await stablePriceOracle.setPrices([priceLetter1, priceLetter2, priceLetter3, priceLetter4, priceLetter5]);  
  console.log(`Completed setupStablePriceOracle.`)
}

async function setupZKFRegistrarController(reverseRegistrar, baseRegistrarImplementation, zkfRegistrarController) {
  await baseRegistrarImplementation.addController(zkfRegistrarController.target);
  await reverseRegistrar.setController(zkfRegistrarController.target, true);
  console.log(`Completed setupZKFRegistrarController.`)
}
 
async function setupResolver(registry, publicResolver) { 
  await publicResolver['setAddr(bytes32,address)'](namehash.hash("resolver"), publicResolver.target);
  await registry.setResolver(namehash.hash("resolver"), publicResolver.target);
  console.log(`Completed setupResolver`)
}
  

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});