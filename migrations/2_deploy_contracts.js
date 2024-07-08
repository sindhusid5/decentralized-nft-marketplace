const NFT = artifacts.require("NFT");
const Marketplace = artifacts.require("Marketplace");

module.exports = function(deployer) {
  deployer.deploy(NFT, "MyNFT", "MNFT").then(function() {
    return deployer.deploy(Marketplace);
  });
};
