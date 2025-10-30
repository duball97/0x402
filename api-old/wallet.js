export function createWallet(passkey) {
  return {
    walletAddress: `0x${Math.random().toString(16).slice(2, 42)}`,
    passkey,
    network: "BNB Chain",
    nonCustodial: true
  };
}

export function withdrawFunds(address, amount) {
  console.log(`Withdraw ${amount} USDC → ${address}`);
  return { success: true, txHash: "0xabc123" };
}
