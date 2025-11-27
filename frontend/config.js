export const CHAIN_CONFIG = {
  MONAD_MAINNET_RPC: import.meta.env?.VITE_MONAD_RPC_URL || 'https://monad-mainnet.g.alchemy.com/v2/M87svOeOrOhMsnQWJXB8iQECjn8MJNW0',
  MONAD_EXPLORER: 'https://monad.xyz',
  MONAD_NETWORK_NAME: 'Monad',
  CHAIN_ID: 10143, // Monad mainnet chain ID
};

export const getCurrentNetwork = (network = 'Monad') => {
  const normalized = (network || '').toLowerCase();

  return {
    name: CHAIN_CONFIG.MONAD_NETWORK_NAME,
    rpcUrl: CHAIN_CONFIG.MONAD_MAINNET_RPC,
    explorer: CHAIN_CONFIG.MONAD_EXPLORER,
    network: 'Monad',
    chainId: CHAIN_CONFIG.CHAIN_ID,
  };
};

// Check if MetaMask or other EVM wallet is installed
export const isEVMWalletInstalled = () => {
  return typeof window !== 'undefined' && (window.ethereum || window.web3);
};

// Connect to EVM wallet (MetaMask, etc.)
export const connectEVMWallet = async () => {
  if (!isEVMWalletInstalled()) {
    throw new Error('Please install MetaMask or another EVM-compatible wallet.');
  }
  
  try {
    const provider = window.ethereum;
    
    // Request account access
    const accounts = await provider.request({ method: 'eth_requestAccounts' });
    
    if (accounts && accounts.length > 0) {
      return accounts[0];
    }
    
    throw new Error('No accounts found');
  } catch (err) {
    if (err.code === 4001) {
      throw new Error('User rejected the connection request');
    }
    if (err.message) {
      throw new Error(err.message);
    }
    throw new Error('Failed to connect to wallet');
  }
};

