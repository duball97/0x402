async function createPaywall() {
  const urlInput = document.getElementById("urlInput");
  const priceInput = document.getElementById("priceInput");
  const walletInput = document.getElementById("walletAddress");
  const resultDiv = document.getElementById("result");
  
  // Validation
  if (!urlInput.value) {
    alert("Please enter a URL");
    return;
  }
  if (!priceInput.value || parseFloat(priceInput.value) <= 0) {
    alert("Please enter a valid price");
    return;
  }
  
  // Clear previous results
  resultDiv.innerHTML = '<p class="loading">Creating paywall... ⏳</p>';
  
  try {
    // Send request to backend
    const res = await fetch("http://localhost:8080/create-paywall", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        url: urlInput.value,
        price: priceInput.value,
        walletAddress: walletInput.value || null
      })
    });
    
    const data = await res.json();
    
    // Display result
    resultDiv.innerHTML = `
      <div class="result-container">
        <h3>✅ Paywall Created!</h3>
        <div class="result-item">
          <strong>Paywall ID:</strong> <code>${data.paywall_id}</code>
        </div>
        <div class="result-item">
          <strong>Your Paywall Link:</strong>
          <div class="link-box">
            <code>${data.paywall_link}</code>
            <button onclick="copyLink('${data.paywall_link}')">📋 Copy</button>
          </div>
        </div>
        <div class="result-item">
          <strong>Price:</strong> ${data.price} ${data.currency}
        </div>
        ${data.walletAddress ? `
        <div class="result-item">
          <strong>Payout Wallet:</strong> <code>${data.walletAddress}</code>
        </div>
        ` : ''}
        <div class="result-item">
          <strong>Status:</strong> <span class="status-badge">${data.status}</span>
        </div>
        <div class="info-box">
          <p>🔗 Share this link to monetize your content</p>
          <p>💰 Payments settle to your wallet on BNB Chain</p>
          <p>⚡ Instant payouts in USDC</p>
        </div>
      </div>
    `;
  } catch (error) {
    resultDiv.innerHTML = `
      <div class="error-container">
        <h3>❌ Error</h3>
        <p>Failed to create paywall. Make sure the server is running.</p>
        <code>${error.message}</code>
      </div>
    `;
  }
}

function copyLink(link) {
  navigator.clipboard.writeText(link);
  alert("Link copied to clipboard! 📋");
}
