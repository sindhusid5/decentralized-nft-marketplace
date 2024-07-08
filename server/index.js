// const express = require('express');
// const {Web3} = require('web3');
// const app = express();
// const port = 3000;

// // Replace with your actual ABI and contract address
// const NFTMarketplaceABI = require('../build/contracts/NFTMarketplace.json');  
// const NFTMarketplaceAddress = '0x...'; // Replace with your deployed contract address

// // Initialize Web3 with a provider
// const web3 = new Web3('http://localhost:8545');
// const NFTMarketplace = new web3.eth.Contract(NFTMarketplaceABI, NFTMarketplaceAddress);

// app.get('/auctions', async (req, res) => {
//     try {
//         const auctions = await NFTMarketplace.methods.getAuctions().call();
//         res.json(auctions); // Send JSON response
//     } catch (error) {
//         console.error('Error fetching auctions:', error);
//         res.status(500).json({ error: 'Error fetching auctions' }); // Send JSON error response
//     }
// });

// app.listen(port, () => {
//     console.log(`Server listening at http://localhost:${port}`);
// });
const express = require("express");
const Web3 = require("web3");
const NFTMarketplace = require("../build/contracts/NFTMarketplace.json");

const app = express();
const web3 = new Web3("http://localhost:8545");
const networkId = await web3.eth.net.getId();
const deployedNetwork = NFTMarketplace.networks[networkId];
const contract = new web3.eth.Contract(
    NFTMarketplace.abi,
    deployedNetwork && deployedNetwork.address
);

app.use(express.json());

app.post("/mint", async (req, res) => {
    const { tokenURI } = req.body;
    const accounts = await web3.eth.getAccounts();
    await contract.methods.mintNFT(tokenURI).send({ from: accounts[0] });
    res.send("NFT minted successfully");
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
