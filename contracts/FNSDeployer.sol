// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import { ENSRegistry } from "./registry/ENSRegistry.sol";
import { ENSRegistryWithFallback } from "./registry/ENSRegistryWithFallback.sol";
import { FIFSRegistrar } from "./registry/FIFSRegistrar.sol";
import { ReverseRegistrar } from "./reverseRegistrar/ReverseRegistrar.sol";
import { BaseRegistrarImplementation } from "./zkfregistrar/BaseRegistrarImplementation.sol";
import { StablePriceOracle } from "./zkfregistrar/StablePriceOracle.sol";
import { ZKFRegistrarController } from "./zkfregistrar/ZKFRegistrarController.sol";
import { PublicResolver } from "./resolvers/PublicResolver.sol";

contract FNSDeployer {

    bytes32 public constant TLD_LABEL = keccak256('zkf');
    bytes32 public constant RESOLVER_LABEL = keccak256('resolver');
    bytes32 public constant REVERSE_REGISTRAR_LABEL = keccak256('reverse');
    bytes32 public constant ADDR_LABEL = keccak256('addr');

    ENSRegistry public ensRegistry;
    ENSRegistryWithFallback public ensRegistryWithFallback;
    FIFSRegistrar public fifsRegistrar;
    ReverseRegistrar public reverseRegistrar;
    BaseRegistrarImplementation public baseRegistrarImplementation;
    ZKFRegistrarController public zkfRegistrarController;
    StablePriceOracle public stablePriceOracle;
    PublicResolver public publicResolver;

    constructor() {
 
        ensRegistry = new ENSRegistry();

        ensRegistryWithFallback = new ENSRegistryWithFallback(ensRegistry);
        //ensRegistryWithFallback.setSubnodeOwner(bytes32(0), REVERSE_REGISTRAR_LABEL, msg.sender);
        ensRegistryWithFallback.setSubnodeOwner(bytes32(0), RESOLVER_LABEL, address(this));

        // fifs registrar
        fifsRegistrar = new FIFSRegistrar(ensRegistryWithFallback, namehash(bytes32(0), TLD_LABEL));
        // setup fifs
        ensRegistryWithFallback.setSubnodeOwner(bytes32(0), TLD_LABEL, address(fifsRegistrar));

        // reverse registrar
        reverseRegistrar = new ReverseRegistrar(ensRegistryWithFallback);
        // setup registry
        ensRegistryWithFallback.setSubnodeOwner(bytes32(0), REVERSE_REGISTRAR_LABEL, address(this));
        ensRegistryWithFallback.setSubnodeOwner(namehash(bytes32(0), REVERSE_REGISTRAR_LABEL), ADDR_LABEL, address(reverseRegistrar));

        // base registrar (erc721)
        baseRegistrarImplementation = new BaseRegistrarImplementation(ensRegistryWithFallback, namehash(bytes32(0), TLD_LABEL));
        // setup base registrar (this is not necessary)
        ensRegistryWithFallback.setSubnodeOwner(bytes32(0), TLD_LABEL, address(baseRegistrarImplementation));
        
         // price oracle
        stablePriceOracle= new StablePriceOracle();

        // registrar controller
        zkfRegistrarController = new ZKFRegistrarController(baseRegistrarImplementation, stablePriceOracle, 15, 86400, reverseRegistrar, ensRegistryWithFallback);
        // setup controller
        baseRegistrarImplementation.addController(address(zkfRegistrarController));
        reverseRegistrar.setController(address(zkfRegistrarController), true);

        // public resolver
        publicResolver = new PublicResolver(ensRegistryWithFallback, address(zkfRegistrarController), address(reverseRegistrar));
        
        // setup
        publicResolver.setAddr(namehash(bytes32(0), RESOLVER_LABEL), address(publicResolver));
        ensRegistryWithFallback.setResolver(namehash(bytes32(0), RESOLVER_LABEL), address(publicResolver));
  
    }

    function namehash(bytes32 node, bytes32 label) public pure returns (bytes32) {
        return keccak256(abi.encodePacked(node, label));
    }
}
