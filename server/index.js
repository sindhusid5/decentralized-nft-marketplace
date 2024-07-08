const express = require("express");
const Web3 = require("web3");
const dotenv = require("dotenv");
dotenv.config(); // Load environment variables from .env file
const app = express();
const port = 3000;

const web3 = new Web3(process.env.ETH_NODE_URL); // Use environment variable for Ethereum node URL
const marketplaceABI = require("./build/contracts/Marketplace.json").abi;
const marketplaceAddress = process.env.MARKETPLACE_CONTRACT_ADDRESS; // Use environment variable for marketplace contract address

const marketplaceContract = new web3.eth.Contract(marketplaceABI, marketplaceAddress);

app.use(express.json());

app.post("/list-nft", async (req, res) => {
    const { tokenAddress, tokenId, price } = req.body;
    try {
        const accounts = await web3.eth.getAccounts();
        await marketplaceContract.methods.listNFT(tokenAddress, tokenId, price)
            .send({ from: accounts[0] });
        res.send("NFT listed successfully");
    } catch (error) {
        console.error(error);
        res.status(500).send("Failed to list NFT");
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
