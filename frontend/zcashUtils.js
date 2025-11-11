import axios from 'axios';
import { CHAIN_CONFIG } from './config';

/**
 * Validates a Zcash address (transparent or shielded)
 * @param {string} address - The Zcash address to validate
 * @returns {boolean} - True if valid Zcash address
 */
export const isValidZcashAddress = (address) => {
  if (!address || typeof address !== 'string') return false;

  // Transparent addresses: t1 (mainnet) or t2 (testnet) - 35 chars
  const transparentRegex = /^t[12][a-zA-Z0-9]{33}$/;
  
  // Sapling shielded addresses: zs1 (mainnet) or ztestsapling (testnet) - variable length
  const saplingRegex = /^zs1[a-z0-9]{75}$/;
  const testnetSaplingRegex = /^ztestsapling1[a-z0-9]{64}$/;
  
  // Sprout shielded addresses: zc (legacy, ~95 chars)
  const sproutRegex = /^zc[a-zA-Z0-9]{93}$/;
  
  // Unified addresses: u1 (mainnet) - variable length, can be 141+ chars
  const unifiedRegex = /^u1[a-z0-9]{100,}$/;
  
  return transparentRegex.test(address) || 
         saplingRegex.test(address) || 
         testnetSaplingRegex.test(address) ||
         sproutRegex.test(address) ||
         unifiedRegex.test(address);
};

/**
 * Fetches the balance of a Zcash transparent address
 * @param {string} address - The Zcash transparent address
 * @returns {Promise<number>} - Balance in ZEC
 */
export const getZcashBalance = async (address) => {
  try {
    const response = await axios.get(
      `${CHAIN_CONFIG.ZCASH_API_BASE}/dashboards/address/${address}`
    );

    if (response.data && response.data.data && response.data.data[address]) {
      // Balance is in satoshis (zatoshis), convert to ZEC
      const balanceZatoshis = response.data.data[address].address.balance;
      return balanceZatoshis / 1e8;
    }

    return 0;
  } catch (error) {
    console.error('Error fetching Zcash balance:', error);
    throw new Error('Failed to fetch balance from Blockchair API');
  }
};

/**
 * Creates a Zcash payment URI
 * @param {string} address - Recipient address
 * @param {number} amount - Amount in ZEC
 * @param {string} label - Optional label
 * @returns {string} - Zcash URI
 */
export const createZcashPaymentURI = (address, amount, label = '') => {
  let uri = `zcash:${address}`;
  const params = [];

  if (amount && amount > 0) {
    params.push(`amount=${amount}`);
  }

  if (label) {
    params.push(`label=${encodeURIComponent(label)}`);
  }

  if (params.length > 0) {
    uri += `?${params.join('&')}`;
  }

  return uri;
};

/**
 * Checks if a transaction exists and is confirmed
 * Note: For shielded transactions, verification is limited as amounts/addresses are encrypted
 * @param {string} txHash - Transaction hash
 * @returns {Promise<{confirmed: boolean, amount: number, shielded: boolean}>}
 */
export const verifyZcashTransaction = async (txHash) => {
  try {
    const response = await axios.get(
      `${CHAIN_CONFIG.ZCASH_API_BASE}/dashboards/transaction/${txHash}`
    );

    if (response.data && response.data.data && response.data.data[txHash]) {
      const txData = response.data.data[txHash];
      
      // Check if transaction involves shielded pool
      const hasShieldedComponent = 
        (txData.transaction.input_count_shielded && txData.transaction.input_count_shielded > 0) ||
        (txData.transaction.output_count_shielded && txData.transaction.output_count_shielded > 0);

      return {
        confirmed: txData.transaction.block_id !== -1,
        amount: hasShieldedComponent ? 0 : (txData.transaction.output_total / 1e8), // Can't see shielded amounts
        blockHeight: txData.transaction.block_id,
        time: txData.transaction.time,
        shielded: hasShieldedComponent,
      };
    }

    return { confirmed: false, amount: 0, shielded: false };
  } catch (error) {
    console.error('Error verifying Zcash transaction:', error);
    throw new Error('Failed to verify transaction. Please ensure the transaction is confirmed on-chain.');
  }
};

/**
 * Opens a Zcash payment in the user's wallet app
 * @param {string} address - Recipient address
 * @param {number} amount - Amount in ZEC
 * @param {string} label - Optional label
 */
export const openZcashWallet = (address, amount, label = '') => {
  const uri = createZcashPaymentURI(address, amount, label);

  // Try to open in wallet app
  window.location.href = uri;

  // Fallback: show instructions
  setTimeout(() => {
    alert(
      `Please send ${amount} ZEC to:\n\n${address}\n\n` +
      `You can use any Zcash wallet (Zecwallet Lite, Exodus, etc.)\n\n` +
      `After sending, return to this page to verify your payment.`
    );
  }, 1000);
};

/**
 * Formats a Zcash address for display (shortened)
 * @param {string} address - Full address
 * @param {number} startChars - Number of characters to show at start
 * @param {number} endChars - Number of characters to show at end
 * @returns {string}
 */
export const formatZcashAddress = (address, startChars = 6, endChars = 4) => {
  if (!address || address.length < startChars + endChars) return address;
  return `${address.slice(0, startChars)}...${address.slice(-endChars)}`;
};

/**
 * Gets the Zcash explorer URL for a transaction
 * @param {string} txHash - Transaction hash
 * @returns {string}
 */
export const getZcashTxExplorerUrl = (txHash) => {
  return `${CHAIN_CONFIG.ZCASH_EXPLORER}/transaction/${txHash}`;
};

/**
 * Gets the Zcash explorer URL for an address
 * @param {string} address - Zcash address
 * @returns {string}
 */
export const getZcashAddressExplorerUrl = (address) => {
  return `${CHAIN_CONFIG.ZCASH_EXPLORER}/address/${address}`;
};
