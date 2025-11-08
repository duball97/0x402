export const CHAIN_CONFIG = {
  SOLANA_MAINNET_RPC: import.meta.env?.VITE_SOLANA_RPC_URL || 'https://api.mainnet-beta.solana.com',
  SOLANA_DEVNET_RPC: 'https://api.devnet.solana.com',
  SOLANA_EXPLORER: 'https://solscan.io',
  SOLANA_DEVNET_EXPLORER: 'https://solscan.io?cluster=devnet',
  SOLANA_NETWORK_NAME: 'Solana',
};

export const getCurrentNetwork = (network = 'Solana') => {
  const normalized = (network || '').toLowerCase();
  if (normalized === 'devnet') {
    return {
      name: `${CHAIN_CONFIG.SOLANA_NETWORK_NAME} Devnet`,
      rpcUrl: CHAIN_CONFIG.SOLANA_DEVNET_RPC,
      explorer: CHAIN_CONFIG.SOLANA_DEVNET_EXPLORER,
      network: 'Solana',
    };
  }

  return {
    name: CHAIN_CONFIG.SOLANA_NETWORK_NAME,
    rpcUrl: CHAIN_CONFIG.SOLANA_MAINNET_RPC,
    explorer: CHAIN_CONFIG.SOLANA_EXPLORER,
    network: 'Solana',
  };
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

