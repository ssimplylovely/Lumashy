# LumaShy - Quick Start Guide

Get LumaShy running in **2 minutes**! 🚀

---

## ⚡ For Judges & Reviewers

### Step 1: Install & Run (30 seconds)

```bash
# Clone or open the project
cd lumashy

# Install dependencies
npm install

# Start development server
npm run dev
```

### Step 2: Open in Browser (10 seconds)

```
http://localhost:5173
```

### Step 3: Explore Features (1 minute)

1. **Landing Page** - Click "Launch App" button
2. **Dashboard** - See live data streaming
3. **Navigation** - Try all sidebar tabs:
   - 📊 Overview - All features combined
   - 💰 Tokens - Live token feed
   - 🔔 Events - On-chain events
   - 📈 Charts - Real-time charts
   - 💻 Developer - Raw JSON viewer
   - ⚙️ Settings - Configuration & **Theme Selector** 🎨

---

## 🎯 What to Look For

### ✅ Real-Time Data Streaming

**Live Data Indicator** (top-right corner)
- Should show green pulsing dot with "Live" text
- Console shows: `[SDS] Connected successfully`

**Token Feed** (left side)
- 5 tokens: STT, USDC, WETH, DAI, USDT
- Prices update every 2 seconds
- Green ↑ or Red ↓ arrows show price movement
- Click any token to see details modal

**Charts** (center)
- Line chart updates automatically
- New data points appear every 2 seconds
- Last 20 data points shown

**Event Feed** (bottom)
- New events appear with slide-in animation
- Shows swaps, liquidity changes, transfers
- Emoji indicators for event types

### ✅ Technical Features

**Console Logs** (F12 Developer Tools)
```
[SDS] Connecting to Somnia Data Streams...
[SDS] Connected successfully
[SDS] Subscribing to WETH stream...
[SDS] Subscribing to USDC stream...
```

**Developer Monitor Tab**
- Raw JSON data updates in real-time
- Connection statistics
- Copy JSON button

**Smooth Animations**
- 60fps transitions
- Theme-responsive gradient backgrounds
- Hover effects on cards

**Theme Customization** 🎨
- 8 beautiful themes to choose from
- Live theme preview
- Instant theme switching
- Persistent across sessions
- See [THEME_GUIDE.md](./THEME_GUIDE.md) for details

---

## 📁 Key Files to Review

For understanding the SDS integration:

1. **[SUBMISSION_SUMMARY.md](./SUBMISSION_SUMMARY.md)** - Complete overview
2. **[SDK_COMPLIANCE.md](./SDK_COMPLIANCE.md)** - Requirements verification
3. **[SDS_INTEGRATION.md](./SDS_INTEGRATION.md)** - Technical integration guide
4. **[/services/sdsService.ts](./services/sdsService.ts)** - Core SDS service
5. **[/hooks/useSDS.ts](./hooks/useSDS.ts)** - React hooks for data

---

## 🔍 Testing Checklist

Quick validation of all features:

```
□ Landing page loads
□ "Launch App" button works
□ Dashboard shows with sidebar
□ Live Data Indicator shows "Live" (green pulse)
□ Token feed shows 5 tokens
□ Prices update every 2 seconds
□ Chart renders and updates
□ Event feed shows events
□ Click token → modal opens
□ Developer tab shows JSON
□ All sidebar tabs work
□ No console errors
□ Animations are smooth
```

---

## 💻 Developer Quick Start

### Using LumaShy as Template

```bash
# Clone for your project
git clone https://github.com/yourusername/lumashy.git my-defi-dashboard
cd my-defi-dashboard

# Install
npm install

# Customize
# 1. Update branding in components/LandingPage.tsx
# 2. Add your tokens in services/sdsService.ts
# 3. Configure your API key in config/somnia.ts

# Run
npm run dev
```

### Integrating SDS SDK

```bash
# Install real SDK (when available)
npm install @somnia/data-streams

# Get API key
# Visit: https://developers.somnia.network

# Update .env
cp .env.example .env
# Edit .env and add your VITE_SDS_API_KEY

# Migrate service
# Copy code from services/sdsService.real.example.ts
# to services/sdsService.ts

# Test
npm run dev
```

**Time to integrate real SDK:** ~15 minutes

---

## 🎨 Customization Quick Tips

### Change Theme Colors

Edit `/styles/globals.css`:

```css
/* Replace purple theme with your brand colors */
:root {
  --color-primary: #your-color;
  --color-secondary: #your-color;
}
```

### Add New Tokens

Edit `/services/sdsService.ts`:

```typescript
const tokens = ['STT', 'USDC', 'WETH', 'YOUR_TOKEN'];
```

### Customize Landing Page

Edit `/components/LandingPage.tsx`:

```typescript
// Update logo, tagline, features, etc.
```

---

## 📊 Performance Expectations

What you should see:

| Metric | Expected |
|--------|----------|
| Initial Load | < 3 seconds |
| Data Update Interval | 2 seconds |
| Animation FPS | 60fps |
| Memory Usage | ~30MB |
| CPU Usage | ~2% |
| Console Errors | 0 |

---

## 🆘 Troubleshooting

### Issue: Can't install dependencies

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Issue: Port 5173 already in use

```bash
# Kill the process or use different port
npm run dev -- --port 3000
```

### Issue: Page is blank

```bash
# Check console for errors (F12)
# Ensure all dependencies installed
npm install
```

### Issue: Data not updating

```bash
# Check console for SDS connection logs
# Should see: [SDS] Connected successfully
# If not, check browser console for errors
```

---

## 🎯 Next Steps

After reviewing the demo:

1. **Read Documentation**
   - [SUBMISSION_SUMMARY.md](./SUBMISSION_SUMMARY.md) - Full overview
   - [SDK_COMPLIANCE.md](./SDK_COMPLIANCE.md) - Requirements proof
   - [SDS_INTEGRATION.md](./SDS_INTEGRATION.md) - Integration details

2. **Explore Code**
   - `/services/sdsService.ts` - Service layer
   - `/hooks/useSDS.ts` - React hooks
   - `/components/` - UI components

3. **Try Features**
   - Connect wallet (MetaMask)
   - View different tabs
   - Click on tokens
   - Monitor developer tab

4. **Integrate in Your Project**
   - Follow [INTEGRATION_GUIDE.md](./INTEGRATION_GUIDE.md)
   - Copy components you need
   - Use the hooks patterns

---

## 📞 Support

- **Documentation:** See `/README.md` for full docs
- **Issues:** [GitHub Issues](https://github.com/yourusername/lumashy/issues)
- **Discord:** [Somnia Discord](https://discord.gg/somnia)

---

## ✅ Verification

After running, you should have:

- ✅ Dashboard with aurora theme
- ✅ 5 tokens updating in real-time
- ✅ Live connection indicator
- ✅ Auto-updating chart
- ✅ Event stream showing
- ✅ Developer monitor working
- ✅ No console errors
- ✅ Smooth animations

**If all checks pass:** ✨ **LumaShy is working perfectly!** ✨

---

**Ready to explore?** Run `npm run dev` and open http://localhost:5173

_Soft light. Sharp data. — LumaShy_ 🌙

---

**Total time:** ~2 minutes from clone to working dashboard  
**Difficulty:** Easy  
**Requirements:** Node.js 18+, npm
