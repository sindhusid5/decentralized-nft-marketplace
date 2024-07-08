module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",     // Localhost (default: ganache)
      port: 8545,            // Standard Ethereum port
      network_id: "*",       // Match any network id
      gas: 8000000,          // Gas limit used for deployment
    },
  },
  compilers: {
    solc: {
      version: "^0.8.20",   // Specify compiler version
      optimizer: {
        enabled: false,
        runs: 200,
      },
    },
  },
};
