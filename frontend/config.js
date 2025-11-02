// Web3 Configuration
export const CHAIN_CONFIG = {
  BNB_CHAIN_ID: 56, // BNB Mainnet
  BNB_TESTNET_CHAIN_ID: 97, // BNB Testnet
  
  // RPC URLs
  BNB_RPC_URL: 'https://bsc-dataseed.binance.org/',
  BNB_TESTNET_RPC_URL: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
  
  // Solana Configuration - Uses environment variable with fallback
  // For Vite frontend: Use VITE_SOLANA_RPC_URL in .env
  // For backend: Use SOLANA_RPC_URL in .env
  SOLANA_MAINNET_RPC: import.meta.env?.VITE_SOLANA_RPC_URL || 'https://api.mainnet-beta.solana.com',
  SOLANA_DEVNET_RPC: 'https://api.devnet.solana.com',
  SOLANA_EXPLORER: 'https://solscan.io',
  SOLANA_DEVNET_EXPLORER: 'https://solscan.io?cluster=devnet',


  
  // Token Contract Addresses (reserved for future use)
  // Currently using native BNB for all payments
  
  // Network Names
  BNB_NETWORK_NAME: 'BNB Smart Chain',
  BNB_TESTNET_NETWORK_NAME: 'BNB Smart Chain Testnet',
  SOLANA_NETWORK_NAME: 'Solana',
  
  // Block Explorers
  BNB_EXPLORER: 'https://bscscan.com',
  BNB_TESTNET_EXPLORER: 'https://testnet.bscscan.com',
};

// Get current network config (defaulting to mainnet)
export const getCurrentNetwork = (network = 'BNB Chain') => {
  if (network === 'Solana') {
    return {
      name: CHAIN_CONFIG.SOLANA_NETWORK_NAME,
      rpcUrl: CHAIN_CONFIG.SOLANA_MAINNET_RPC,
      explorer: CHAIN_CONFIG.SOLANA_EXPLORER,
      network: 'Solana'
    };
  }
  return {
    chainId: CHAIN_CONFIG.BNB_CHAIN_ID,
    name: CHAIN_CONFIG.BNB_NETWORK_NAME,
    rpcUrl: CHAIN_CONFIG.BNB_RPC_URL,
    explorer: CHAIN_CONFIG.BNB_EXPLORER,
    network: 'BNB Chain'
  };
};

// Network switch helper for BNB Chain
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

// Check if Phantom wallet is installed
export const isPhantomInstalled = () => {
  return typeof window !== 'undefined' && window.solana && window.solana.isPhantom;
};

// Connect to Phantom wallet
export const connectPhantom = async () => {
  if (!isPhantomInstalled()) {
    throw new Error('Please install Phantom wallet. Get it at https://phantom.app/');
  }
  
  try {
    // Check if already connected
    if (window.solana.isConnected) {
      return window.solana.publicKey.toString();
    }
    
    // Connect to Phantom
    const resp = await window.solana.connect({ onlyIfTrusted: false });
    return resp.publicKey.toString();
  } catch (err) {
    if (err.code === 4001) {
      throw new Error('User rejected the connection request');
    }
    if (err.message) {
      throw new Error(err.message);
    }
    throw new Error('Failed to connect to Phantom wallet');
  }
};

