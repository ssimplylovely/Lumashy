# LumaShy Deployment Guide

Complete guide for deploying LumaShy to Somnia Testnet and production environments.

## 📋 Pre-Deployment Checklist

### 1. Development Environment Setup
- [ ] Node.js v18+ installed
- [ ] npm or yarn package manager
- [ ] Git for version control
- [ ] MetaMask or compatible Web3 wallet
- [ ] Somnia Testnet added to wallet

### 2. Somnia Testnet Configuration
- [ ] Somnia Testnet RPC configured
- [ ] Test STT tokens obtained from faucet
- [ ] SDS API key acquired (if using real SDK)
- [ ] Wallet connected to Somnia Testnet

### 3. Code Preparation
- [ ] All dependencies installed (`npm install`)
- [ ] Build passes without errors (`npm run build`)
- [ ] TypeScript compilation successful
- [ ] Environment variables configured

---

## 🌐 Somnia Testnet Deployment

### Step 1: Configure Somnia Network

The app is pre-configured for Somnia Testnet in `/config/somnia.ts`:

```typescript
export const SOMNIA_TESTNET = {
  chainId: 50311,
  chainName: 'Somnia Testnet',
  rpcUrl: 'https://testnet-rpc.somnia.network',
  blockExplorer: 'https://testnet-explorer.somnia.network',
  nativeCurrency: {
    name: 'STT',
    symbol: 'STT',
    decimals: 18,
  },
};
```

### Step 2: Get Test Tokens

1. Visit [Somnia Testnet Faucet](https://faucet.somnia.network)
2. Connect your wallet
3. Request test STT tokens
4. Wait for transaction confirmation

### Step 3: Configure SDS API Key

Update `/config/somnia.ts` with your SDS API key:

```typescript
export const SDS_CONFIG = {
  endpoint: 'wss://sds-testnet.somnia.network',
  apiKey: 'YOUR_ACTUAL_SDS_API_KEY', // Replace this!
  version: 'v1',
};
```

**Where to get SDS API Key:**
- Visit [Somnia Developer Portal](https://developers.somnia.network)
- Sign up / Log in
- Navigate to "Data Streams" section
- Generate new API key
- Copy and paste into config

### Step 4: Test Locally

Before deploying, test the application locally:

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open browser to http://localhost:5173
# Test all features:
# - Connect wallet
# - Switch to Somnia Testnet
# - Verify real-time data updates
# - Check all dashboard views
# - Test token detail modal
```

### Step 5: Build for Production

```bash
# Create optimized production build
npm run build

# Preview production build locally
npm run preview
```

The build output will be in the `dist/` directory.

---

## 🚀 Hosting Deployment

### Option A: Vercel (Recommended)

Vercel offers seamless deployment with automatic builds:

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/lumashy.git
   git push -u origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Configure project:
     - **Framework Preset:** Vite
     - **Build Command:** `npm run build`
     - **Output Directory:** `dist`
     - **Install Command:** `npm install`

3. **Add Environment Variables** (if needed)
   - Go to Project Settings → Environment Variables
   - Add any sensitive keys
   - Example: `VITE_SDS_API_KEY`

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Your app will be live at `https://your-project.vercel.app`

**Custom Domain (Optional):**
- Go to Project Settings → Domains
- Add your custom domain
- Configure DNS settings as instructed

### Option B: Netlify

1. **Push to GitHub** (same as Vercel)

2. **Import to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect to GitHub and select repository

3. **Configure Build Settings**
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
   - **Node version:** 18

4. **Deploy**
   - Click "Deploy site"
   - Wait for build to complete
   - Site will be live at `https://your-site.netlify.app`

### Option C: IPFS (Decentralized)

For fully decentralized hosting:

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Install IPFS Desktop or CLI**
   - Download from [ipfs.io](https://ipfs.io)

3. **Add to IPFS**
   ```bash
   ipfs add -r dist/
   ```

4. **Pin to Pinata (recommended for persistence)**
   - Go to [pinata.cloud](https://pinata.cloud)
   - Upload `dist` folder
   - Get IPFS hash
   - Access via: `https://gateway.pinata.cloud/ipfs/YOUR_HASH`

---

## 🔐 Environment Variables

For production deployments, use environment variables for sensitive data:

### Create `.env` file (local only, DO NOT commit):

```env
VITE_SDS_API_KEY=your_actual_api_key_here
VITE_SOMNIA_RPC_URL=https://testnet-rpc.somnia.network
VITE_ENABLE_ANALYTICS=true
```

### Update `/config/somnia.ts`:

```typescript
export const SDS_CONFIG = {
  endpoint: 'wss://sds-testnet.somnia.network',
  apiKey: import.meta.env.VITE_SDS_API_KEY || 'YOUR_SDS_API_KEY_HERE',
  version: 'v1',
};
```

---

## 📊 Post-Deployment Verification

After deployment, verify all features work correctly:

### Checklist:

- [ ] **Landing Page**
  - [ ] Logo and branding display correctly
  - [ ] "Launch App" button works
  - [ ] All sections visible
  - [ ] Responsive on mobile

- [ ] **Dashboard**
  - [ ] Real-time data updates visible
  - [ ] Live Data Indicator shows "Connected"
  - [ ] Token feed updates automatically
  - [ ] Charts render correctly
  - [ ] On-Chain Event Feed shows events

- [ ] **Wallet Connection**
  - [ ] Connect Wallet button works
  - [ ] Somnia Testnet auto-add prompt appears
  - [ ] Address displays after connection
  - [ ] Disconnect works

- [ ] **Navigation**
  - [ ] All sidebar tabs work
  - [ ] Overview, Tokens, Events, Charts, Developer views load
  - [ ] Back to landing button works

- [ ] **Modals & Interactions**
  - [ ] Token detail modal opens
  - [ ] Subscribe button works
  - [ ] Close button works
  - [ ] Developer monitor shows JSON data

- [ ] **Performance**
  - [ ] Page loads in < 3 seconds
  - [ ] Animations are smooth (60fps)
  - [ ] No console errors
  - [ ] Memory usage stable

---

## 🐛 Troubleshooting

### Issue: Build fails with TypeScript errors
**Solution:**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Try building again
npm run build
```

### Issue: WebSocket connection fails
**Solution:**
- Check SDS API key is correct
- Verify network connectivity
- Check browser console for CORS errors
- Ensure wss:// (not ws://) is used for production

### Issue: Wallet doesn't connect
**Solution:**
- Ensure MetaMask is installed
- Check if user rejected connection
- Verify Somnia Testnet is configured correctly
- Try reloading the page

### Issue: Data not updating in real-time
**Solution:**
- Check SDS connection status in Developer Monitor
- Verify API key is valid
- Check browser console for errors
- Ensure WebSocket connection is established

---

## 📈 Monitoring & Analytics

### Recommended Tools:

1. **Vercel Analytics** (if using Vercel)
   - Automatic page view tracking
   - Performance metrics
   - Web Vitals monitoring

2. **Google Analytics**
   - Add tracking code to `index.html`
   - Track user interactions
   - Monitor user flow

3. **Sentry** (Error Tracking)
   ```bash
   npm install @sentry/react
   ```
   - Real-time error tracking
   - Performance monitoring
   - User feedback

---

## 🔄 CI/CD Pipeline

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build
        run: npm run build
        
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

---

## 🎯 Production Best Practices

### Security:
- ✅ Use environment variables for API keys
- ✅ Enable HTTPS (automatic on Vercel/Netlify)
- ✅ Implement rate limiting for API calls
- ✅ Validate user inputs
- ✅ Use CSP (Content Security Policy) headers

### Performance:
- ✅ Lazy load components
- ✅ Optimize images (use WebP)
- ✅ Minimize bundle size
- ✅ Enable compression (gzip/brotli)
- ✅ Implement caching strategies

### SEO:
- ✅ Add meta tags for social sharing
- ✅ Create sitemap.xml
- ✅ Add robots.txt
- ✅ Implement structured data (JSON-LD)

---

## 📞 Support

For deployment issues:
- Check [Somnia Documentation](https://docs.somnia.network)
- Visit [Somnia Discord](https://discord.gg/somnia)
- Open GitHub issue in repository
- Contact support@somnia.network

---

**Deployment Checklist Complete! 🚀**

Your LumaShy dashboard is now ready for the world to see!

_Soft light. Sharp data. — LumaShy_
