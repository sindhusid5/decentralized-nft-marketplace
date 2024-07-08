// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract Marketplace {
    struct Listing {
        address seller;
        address tokenAddress;
        uint256 tokenId;
        uint256 price;
    }

    Listing[] public listings;

    function listNFT(address tokenAddress, uint256 tokenId, uint256 price) external {
        IERC721(tokenAddress).transferFrom(msg.sender, address(this), tokenId);
        listings.push(Listing({
            seller: msg.sender,
            tokenAddress: tokenAddress,
            tokenId: tokenId,
            price: price
        }));
    }

    function buyNFT(uint256 listingId) external payable {
        Listing storage listing = listings[listingId];
        require(msg.value >= listing.price, "Insufficient funds");

        IERC721(listing.tokenAddress).transferFrom(address(this), msg.sender, listing.tokenId);
        payable(listing.seller).transfer(msg.value);
    }
}
