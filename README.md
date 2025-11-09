# 🌙 Lumashy — Real-Time DeFi Pulse Dashboard

**Lumashy** is a real-time DeFi dashboard powered by **Somnia Data Streams (SDS)**.  
This project was built for the **Somnia Data Streams Mini Hackathon 2025**, showcasing how on-chain data can become *live, reactive, and composable.*

---

## 🚀 Introduction

Lumashy transforms raw blockchain data into an interactive, always-synced experience.  
Instead of waiting for updates or relying on traditional oracles, it reacts instantly to on-chain changes — giving users a real-time window into DeFi market activity.

With the **Somnia Data Streams SDK**, Lumashy can:
- Display token prices, volume, and market trends **in real time**.  
- React instantly to blockchain events and transactions.  
- Deliver a **smoother, live market experience** for DeFi users and traders.  

---

## 🧩 Key Features

- 📡 **Live Market Feed:** Automatically updates via Somnia Data Streams.  
- 💹 **Dynamic Charts:** Real-time visualization of token prices and market movements.  
- 🪙 **Multi-Token Dashboard:** Monitor multiple DeFi assets in one place.  
- ⚡ **Instant Sync:** Always up-to-date with the latest blockchain state.  
- 🌐 **Somnia Testnet Integration:** Fully deployed and functional on Somnia Testnet.  

---

## 🧠 Tech Stack

- **Frontend:** React + Vite + Tailwind CSS  
- **Blockchain Integration:** Somnia Data Streams SDK  
- **Wallet Support:** MetaMask (Somnia Testnet)  
- **Charts:** Recharts  

---

## 🛠️ Getting Started

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/<your-username>/lumashy.git
cd lumashy

import { SomniaStreams } from "@somnia/sdk";

async function initStream() {
  const sds = new SomniaStreams({
    rpcUrl: "https://testnet-rpc.somnia.network",
    chainId: 50311,
  });

  // Subscribe to a token price data stream
  const stream = await sds.subscribeToStream("token-price-feed");

  stream.on("data", (event) => {
    console.log("Live update:", event);
    updateUI(event); // Example: update chart or dashboard
  });

  stream.on("error", (err) => {
    console.error("Stream error:", err);
  });
}

initStream();



---

Would you like me to:
- 🖋 Add **badges & visuals** (e.g., “Built with Somnia SDK”, “Hackathon 2025”) for a cooler GitHub look?  
- or 🎨 Make a **shorter, more eye-catching README** version for hackathon submission (with tagline + live demo section up top)?
