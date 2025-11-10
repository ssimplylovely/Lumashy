# LumaShy Theme System Guide

**Customizable Visual Themes for Your DeFi Dashboard**

LumaShy features a powerful theme system that allows users to personalize their dashboard experience with beautiful color schemes and gradients.

---

## 🎨 Available Themes

### 1. Aurora Dark (Default)
- **Colors:** Purple, Pink, Fuchsia
- **Mood:** Soft, elegant, professional
- **Best for:** Default experience, aurora aesthetic lovers
- **Gradient:** Fuchsia → Pink → Purple

### 2. Cyber Blue
- **Colors:** Cyan, Blue, Sky Blue
- **Mood:** Electric, futuristic, tech-forward
- **Best for:** Cyberpunk aesthetic, tech enthusiasts
- **Gradient:** Cyan → Blue → Sky

### 3. Sunset Fire
- **Colors:** Orange, Red, Amber
- **Mood:** Warm, energetic, bold
- **Best for:** High-energy traders, sunset lovers
- **Gradient:** Orange → Red → Amber

### 4. Emerald Forest
- **Colors:** Emerald, Teal, Green
- **Mood:** Fresh, natural, calming
- **Best for:** Eco-conscious users, nature themes
- **Gradient:** Emerald → Teal → Green

### 5. Midnight Blue
- **Colors:** Indigo, Blue, Violet
- **Mood:** Deep, mysterious, professional
- **Best for:** Night trading, minimal distractions
- **Gradient:** Indigo → Blue → Violet

### 6. Rose Gold
- **Colors:** Rose, Pink, Gold
- **Mood:** Elegant, luxurious, sophisticated
- **Best for:** Premium aesthetic lovers
- **Gradient:** Rose → Pink → Gold

### 7. Matrix Green
- **Colors:** Green, Lime, Emerald
- **Mood:** Classic hacker, terminal, retro
- **Best for:** Matrix fans, terminal aesthetic
- **Gradient:** Green → Lime → Emerald

### 8. Royal Purple
- **Colors:** Purple, Fuchsia, Deep Purple
- **Mood:** Rich, royal, luxurious
- **Best for:** Premium users, purple enthusiasts
- **Gradient:** Purple → Fuchsia → Deep Purple

---

## 🔧 How to Use

### Changing Themes

1. **Open Dashboard**
   - Launch the LumaShy app
   - Click "Launch App" from landing page

2. **Navigate to Settings**
   - Click the ⚙️ Settings icon in sidebar
   - Or press the Settings tab

3. **Select Your Theme**
   - Browse through available themes
   - Click on any theme card to apply it
   - See live preview of colors and gradients

4. **Theme is Auto-Saved**
   - Your preference is saved to browser localStorage
   - Theme persists across sessions
   - No need to manually save

### Reset to Default

Click the **"Default"** button in the theme selector to reset to Aurora Dark.

---

## 🎯 Theme Features

### Real-Time Preview
- See how colors look before applying
- Live preview of gradients, buttons, and borders
- Component previews included

### Persistent Storage
- Theme saved in localStorage
- Auto-loads on next visit
- No account or login required

### Smooth Transitions
- Colors transition smoothly when changing themes
- Animated background effects adapt to theme
- No jarring color changes

### Responsive to All Components
- All UI elements respect theme colors
- Charts use theme colors
- Live indicators use theme glow effects
- Buttons and borders match theme

---

## 🧑‍💻 For Developers

### Theme Structure

Each theme contains:

```typescript
interface Theme {
  id: string;                    // Unique identifier
  name: string;                  // Display name
  description: string;           // Short description
  colors: {
    primary: string;             // Primary color (hex)
    secondary: string;           // Secondary color (hex)
    accent: string;              // Accent color (hex)
    gradient: string;            // CSS gradient string
    glow: string;                // Glow effect color (rgba)
    background: string;          // Background color
    backgroundSecondary: string; // Secondary background
    border: string;              // Border color (rgba)
    text: string;                // Text color
    textSecondary: string;       // Secondary text color
  };
}
```

### Using Theme in Components

#### CSS Variables (Recommended)

```tsx
// Use CSS variables in your styles
<div 
  style={{ 
    backgroundColor: 'var(--color-primary)',
    borderColor: 'var(--color-border)',
    color: 'var(--color-text)'
  }}
>
  Theme-aware content
</div>
```

#### useTheme Hook

```tsx
import { useTheme } from '../hooks/useTheme';

function MyComponent() {
  const { currentTheme, changeTheme, resetToDefault } = useTheme();
  
  return (
    <div style={{ color: currentTheme.colors.primary }}>
      Current theme: {currentTheme.name}
    </div>
  );
}
```

### Creating Custom Themes

Add new themes to `/config/themes.ts`:

```typescript
{
  id: 'my-custom-theme',
  name: 'My Custom Theme',
  description: 'A unique theme I created',
  colors: {
    primary: '#ff6b6b',
    secondary: '#4ecdc4',
    accent: '#45b7d1',
    gradient: 'linear-gradient(135deg, #ff6b6b, #4ecdc4, #45b7d1)',
    glow: 'rgba(255, 107, 107, 0.3)',
    background: '#1a1a2e',
    backgroundSecondary: '#16213e',
    border: 'rgba(255, 107, 107, 0.3)',
    text: '#ffffff',
    textSecondary: '#a8a8a8',
  },
}
```

### Theme Architecture

```
/config/themes.ts
├── Theme definitions
├── Default theme
├── Theme helpers (getThemeById, etc.)
└── Storage functions

/hooks/useTheme.ts
├── React hook for theme management
├── State management
└── Theme application logic

/components/ThemeSelector.tsx
├── UI for selecting themes
├── Theme preview cards
└── Live preview section

/components/AnimatedBackground.tsx
├── Theme-responsive background
└── Animated gradient effects

/styles/globals.css
└── CSS variables for themes
```

---

## 🎨 CSS Variables Reference

### Available Variables

```css
--color-primary           /* Primary theme color */
--color-secondary         /* Secondary theme color */
--color-accent           /* Accent theme color */
--color-glow             /* Glow effect color */
--color-background       /* Main background */
--color-background-secondary  /* Secondary background */
--color-border           /* Border color */
--color-text             /* Main text color */
--color-text-secondary   /* Secondary text color */
```

### Usage Examples

```css
/* Gradient button */
.button {
  background: linear-gradient(
    135deg, 
    var(--color-primary), 
    var(--color-secondary)
  );
}

/* Glowing border */
.card {
  border: 2px solid var(--color-border);
  box-shadow: 0 0 20px var(--color-glow);
}

/* Theme-aware text */
.text {
  color: var(--color-text);
}

.text-muted {
  color: var(--color-text-secondary);
}
```

---

## 📱 Theme Behavior

### On First Visit
- Aurora Dark theme is applied by default
- No localStorage data exists yet

### After Theme Selection
- Selected theme is saved to localStorage
- Key: `lumashy-theme`
- Value: Theme ID (e.g., `"cyber-blue"`)

### On Return Visit
- Theme is loaded from localStorage
- Applied immediately on app mount
- No flash of wrong theme

### On Theme Change
- CSS variables are updated instantly
- All components re-render with new colors
- Smooth transition effects applied
- Background animations adapt to new colors

---

## 🔍 Component Examples

### Using Theme in Cards

```tsx
<Card 
  className="border-2"
  style={{ 
    borderColor: 'var(--color-border)',
    backgroundColor: 'var(--color-background-secondary)'
  }}
>
  Card content
</Card>
```

### Theme-Aware Buttons

```tsx
<Button
  style={{
    background: 'var(--color-gradient)',
    boxShadow: `0 0 20px var(--color-glow)`
  }}
>
  Theme Button
</Button>
```

### Live Indicators

```tsx
<div 
  className="w-2 h-2 rounded-full animate-pulse"
  style={{ 
    backgroundColor: 'var(--color-primary)',
    boxShadow: `0 0 8px var(--color-glow)`
  }}
/>
```

### Gradient Text

```tsx
<h1 
  style={{ 
    background: 'var(--color-gradient)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  }}
>
  Gradient Title
</h1>
```

---

## 🎯 Best Practices

### Do's ✅

- Use CSS variables for theme colors
- Test your UI with all themes
- Provide meaningful theme names
- Use consistent color contrast ratios
- Respect user's theme preference

### Don'ts ❌

- Don't hardcode colors in components
- Don't forget to test with all themes
- Don't use theme colors for critical UI elements without fallbacks
- Don't override theme colors locally without good reason
- Don't forget to handle theme transitions

---

## 🧪 Testing Themes

### Manual Testing

1. Open dashboard
2. Go to Settings → Theme
3. Try each theme one by one
4. Check:
   - Colors apply correctly
   - Text is readable
   - Buttons are visible
   - Charts render properly
   - Animations work smoothly

### Automated Testing

```typescript
import { getThemeById, themes } from '../config/themes';

describe('Theme System', () => {
  it('should have all required themes', () => {
    expect(themes.length).toBeGreaterThan(0);
  });

  it('should return valid theme by ID', () => {
    const theme = getThemeById('aurora-dark');
    expect(theme).toBeDefined();
    expect(theme.colors).toBeDefined();
  });

  it('should have all required color properties', () => {
    themes.forEach(theme => {
      expect(theme.colors.primary).toBeDefined();
      expect(theme.colors.secondary).toBeDefined();
      expect(theme.colors.accent).toBeDefined();
      // ... test all properties
    });
  });
});
```

---

## 🚀 Future Enhancements

Potential improvements to the theme system:

1. **Custom Theme Builder**
   - Let users create their own themes
   - Color picker for each property
   - Save custom themes

2. **Theme Import/Export**
   - Export theme as JSON
   - Share themes with others
   - Import community themes

3. **Auto Theme Switching**
   - Based on time of day
   - Based on market conditions
   - Based on system dark/light mode

4. **Accessibility**
   - High contrast themes
   - Color blind friendly themes
   - Reduced motion options

5. **More Themes**
   - Seasonal themes
   - Holiday themes
   - Brand-specific themes
   - Community-created themes

---

## 📊 Theme Usage Analytics

Track which themes are most popular:

```typescript
// Track theme changes
function trackThemeChange(themeId: string) {
  // Analytics code here
  console.log(`Theme changed to: ${themeId}`);
}

// In useTheme hook
const changeTheme = (theme: Theme) => {
  setCurrentTheme(theme);
  saveThemeToStorage(theme.id);
  applyThemeToDocument(theme);
  trackThemeChange(theme.id); // Track usage
};
```

---

## 🎨 Color Psychology

Why each theme works:

### Aurora Dark (Default)
- **Purple/Pink:** Creativity, luxury, innovation
- **Use case:** Professional trading, general use

### Cyber Blue
- **Blue/Cyan:** Trust, technology, efficiency
- **Use case:** Tech-focused users, modern aesthetic

### Sunset Fire
- **Orange/Red:** Energy, passion, urgency
- **Use case:** Active traders, high-energy sessions

### Emerald Forest
- **Green/Teal:** Growth, stability, wealth
- **Use case:** Long-term investors, calming experience

### Midnight Blue
- **Indigo/Blue:** Depth, professionalism, focus
- **Use case:** Night trading, serious analysis

### Rose Gold
- **Pink/Gold:** Elegance, luxury, sophistication
- **Use case:** Premium users, aesthetic preference

### Matrix Green
- **Green/Lime:** Terminal, hacker, technical
- **Use case:** Developers, terminal aesthetic fans

### Royal Purple
- **Purple/Fuchsia:** Royalty, wealth, luxury
- **Use case:** Premium aesthetic, purple lovers

---

## 📚 Additional Resources

- **Theme System Code:** `/config/themes.ts`
- **Theme Hook:** `/hooks/useTheme.ts`
- **Theme Selector UI:** `/components/ThemeSelector.tsx`
- **CSS Variables:** `/styles/globals.css`
- **Main Integration:** `/App.tsx`

---

## 💡 Tips & Tricks

### Quick Theme Switch
Access Settings tab with a single click on the sidebar

### Preview Before Applying
All themes show live preview with gradients and colors

### Persistent Preferences
Your theme choice is saved automatically

### Share Your Setup
Screenshot your themed dashboard to share with others

---

**Enjoy customizing your LumaShy experience!** 🎨✨

_Soft light. Sharp data. — LumaShy_
