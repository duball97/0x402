// Web3 Configuration
export const CHAIN_CONFIG = {
  BNB_CHAIN_ID: 56, // BNB Mainnet
  BNB_TESTNET_CHAIN_ID: 97, // BNB Testnet
  
  // RPC URLs
  BNB_RPC_URL: 'https://bsc-dataseed.binance.org/',
  BNB_TESTNET_RPC_URL: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
  
  // Token Contract Addresses (reserved for future use)
  // Currently using native BNB for all payments
  
  // Network Names
  BNB_NETWORK_NAME: 'BNB Smart Chain',
  BNB_TESTNET_NETWORK_NAME: 'BNB Smart Chain Testnet',
  
  // Block Explorers
  BNB_EXPLORER: 'https://bscscan.com',
  BNB_TESTNET_EXPLORER: 'https://testnet.bscscan.com',
};

// Get current network config (defaulting to mainnet)
export const getCurrentNetwork = () => ({
  chainId: CHAIN_CONFIG.BNB_CHAIN_ID,
  name: CHAIN_CONFIG.BNB_NETWORK_NAME,
  rpcUrl: CHAIN_CONFIG.BNB_RPC_URL,
  explorer: CHAIN_CONFIG.BNB_EXPLORER,
});

// Network switch helper
export const switchToBNBChain = async () => {
  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: `0x${CHAIN_CONFIG.BNB_CHAIN_ID.toString(16)}` }],
    });
    return true;
  } catch (switchError) {
    // This error code indicates that the chain has not been added to MetaMask
    if (switchError.code === 4902) {
      try {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: `0x${CHAIN_CONFIG.BNB_CHAIN_ID.toString(16)}`,
              chainName: CHAIN_CONFIG.BNB_NETWORK_NAME,
              nativeCurrency: {
                name: 'BNB',
                symbol: 'BNB',
                decimals: 18,
              },
              rpcUrls: [CHAIN_CONFIG.BNB_RPC_URL],
              blockExplorerUrls: [CHAIN_CONFIG.BNB_EXPLORER],
            },
          ],
        });
        return true;
      } catch (addError) {
        console.error('Failed to add BNB Chain:', addError);
        return false;
      }
    }
    console.error('Failed to switch to BNB Chain:', switchError);
    return false;
  }
};

