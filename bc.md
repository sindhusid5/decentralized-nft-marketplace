//bc.md
// SPDX-License-Identifier: MIT
 
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFT is ERC721, Ownable {
    uint256 public tokenCounter;

    constructor() ERC721("NFT", "NFT") {
        tokenCounter = 0;
    }

    function createToken(string memory tokenURI) public returns (uint256) {
        uint256 newItemId = tokenCounter;
        _safeMint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);
        tokenCounter++;
        return newItemId;
    }
}




//NFTMarketplace.sol
// SPDX-License-Identifier: MIT
 
pragma solidity ^0.8.0;

import "./NFT.sol";

contract NFTMarketplace {
    struct Auction {
        address seller;
        uint256 price;
        uint256 tokenId;
        bool isActive;
    }

    mapping(uint256 => Auction) public auctions;
    NFT public nft;

    constructor(address nftAddress) {
        nft = NFT(nftAddress);
    }

    function createAuction(uint256 tokenId, uint256 price) public {
        nft.transferFrom(msg.sender, address(this), tokenId);
        auctions[tokenId] = Auction(msg.sender, price, tokenId, true);
    }

    function buyNFT(uint256 tokenId) public payable {
        Auction memory auction = auctions[tokenId];
        require(auction.isActive, "Auction is not active");
        require(msg.value >= auction.price, "Insufficient payment");

        nft.transferFrom(address(this), msg.sender, tokenId);
        payable(auction.seller).transfer(msg.value);
        auctions[tokenId].isActive = false;
    }
}




