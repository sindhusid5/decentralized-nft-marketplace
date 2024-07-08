// test/NFT.test.js
const NFT = artifacts.require("NFT");

contract("NFT", (accounts) => {
    it("should create a new token", async () => {
        const nft = await NFT.deployed();
        const tokenId = await nft.createToken("testURI");
        assert.equal(tokenId.toNumber(), 0, "Token ID should be 0");
    });
});
