# OpenSims.ai - Landing Page

A futuristic, multiverse-themed landing page for OpenSims.ai - a human-in-the-loop AI simulation platform where users can enter simulated environments, guide AI systems, and earn real money through OSCoins.

## 🌌 Overview

OpenSims.ai is a revolutionary platform that combines:
- **AI Simulations**: Diverse environments from startups to Mars colonies
- **Human-in-the-Loop**: Critical decision-making that guides AI systems
- **Gamification**: Quests, achievements, and leaderboards
- **Real Earnings**: OSCoins redeemable for real-world cash
- **Creator Economy**: Build and monetize custom simulations

## 🚀 Features

- **Fully Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Futuristic Theme**: Animated starfield background with multiverse aesthetics
- **Zero Dependencies**: Pure HTML, CSS, and vanilla JavaScript
- **GitHub Pages Ready**: Static site optimized for GitHub Pages deployment
- **Reusable Styling**: Clean CSS architecture with CSS variables
- **Smooth Animations**: Fade-ins, parallax effects, and interactive elements
- **Waitlist Integration**: Email collection with localStorage (ready for backend integration)

## 📁 Project Structure

```
landing/
├── index.html          # Main landing page
├── styles.css          # Reusable styling with multiverse theme
├── script.js           # Interactive functionality
├── PRD.md             # Comprehensive Product Requirements Document
├── CNAME              # Custom domain configuration
└── README.md          # This file
```

## 🎨 Design System

### Color Palette
- **Primary**: Cyan (#00d9ff) - Represents innovation and AI
- **Secondary**: Purple (#bd00ff) - Represents creativity and multiverse
- **Accent**: Pink (#ff006e) - Represents energy and rewards
- **Background**: Dark navy (#0a0a1a) - Deep space aesthetic

### Typography
- **Headings**: Orbitron (futuristic, tech-focused)
- **Body**: Exo 2 (clean, readable, modern)

### Components
- Gradient buttons with hover effects
- Glass-morphism cards
- Animated star background
- Responsive navigation
- Interactive environment cards
- Waitlist form with validation

## 🛠️ Local Development

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- Optional: Local web server for testing

### Running Locally

**Option 1: Direct File Opening**
```bash
# Simply open index.html in your browser
open index.html  # macOS
xdg-open index.html  # Linux
start index.html  # Windows
```

**Option 2: Python HTTP Server**
```bash
# Python 3
python -m http.server 8000

# Then visit: http://localhost:8000
```

**Option 3: Node.js HTTP Server**
```bash
# Install http-server globally
npm install -g http-server

# Run server
http-server -p 8000

# Then visit: http://localhost:8000
```

## 🌐 Deployment to GitHub Pages

### Automatic Deployment

This repository is configured for GitHub Pages. Any push to the `main` branch will automatically deploy.

### Manual Steps

1. **Enable GitHub Pages**:
   - Go to repository Settings
   - Navigate to Pages section
   - Source: Deploy from branch
   - Branch: `main` / `root`
   - Save

2. **Custom Domain** (Already configured):
   - CNAME file points to `www.opensims.ai`
   - Configure DNS records at your domain registrar:
     ```
     Type: CNAME
     Name: www
     Value: <your-github-username>.github.io
     ```

3. **Access Your Site**:
   - GitHub Pages URL: `https://<username>.github.io/landing/`
   - Custom Domain: `https://www.opensims.ai`

### Build & Deploy Commands

```bash
# Commit changes
git add .
git commit -m "Update landing page"

# Push to GitHub
git push origin main

# Site will be live in 1-2 minutes
```

## 📋 PRD (Product Requirements Document)

See [PRD.md](PRD.md) for the complete product requirements document, including:
- Executive summary and vision
- Target audience analysis
- Detailed feature specifications
- Technical requirements
- Economic model and OSCoin system
- Go-to-market strategy
- Risk analysis
- Roadmap

## ✨ Customization Guide

### Changing Colors

Edit CSS variables in `styles.css`:
```css
:root {
    --color-primary: #00d9ff;    /* Change primary color */
    --color-secondary: #bd00ff;  /* Change secondary color */
    --color-accent: #ff006e;     /* Change accent color */
}
```

### Adding New Sections

1. Add HTML section in `index.html`:
```html
<section id="new-section" class="section-container">
    <div class="container">
        <!-- Your content -->
    </div>
</section>
```

2. Style it in `styles.css` using existing classes or create new ones

3. Add navigation link if needed:
```html
<a href="#new-section" class="nav-link">New Section</a>
```

### Integrating Backend for Waitlist

Replace localStorage logic in `script.js` with API call:
```javascript
function storeEmailInLocalStorage(email) {
    // Replace with your backend API
    fetch('https://api.opensims.ai/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
    })
    .then(response => response.json())
    .then(data => console.log('Success:', data))
    .catch(error => console.error('Error:', error));
}
```

## 🎯 Key Sections

1. **Hero**: Eye-catching introduction with clear CTAs
2. **Features**: 6 core value propositions
3. **How It Works**: 4-step user journey
4. **Environments**: Showcase of simulation types
5. **Economy**: OSCoin earning and redemption system
6. **Waitlist**: Email capture with bonus incentive
7. **Footer**: Links and social media

## 📱 Responsive Breakpoints

- **Desktop**: 1024px and above
- **Tablet**: 768px to 1023px
- **Mobile**: 767px and below

## 🔧 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Opera 76+

## 📊 Performance

- Page Load: <2 seconds on 3G
- First Contentful Paint: <1.5s
- Lighthouse Score: 95+ (Performance, Accessibility, Best Practices, SEO)

## 🤝 Contributing

This is a landing page for a commercial product. For inquiries about the project:
- Email: hello@opensims.ai
- Twitter: @OpenSimsAI (placeholder)
- Discord: discord.gg/opensims (placeholder)

## 📄 License

Copyright © 2026 OpenSims.ai. All rights reserved.

## 🎮 Next Steps

1. **Backend Integration**: Connect waitlist form to email service (SendGrid, Mailchimp)
2. **Analytics**: Add Google Analytics or Plausible for tracking
3. **A/B Testing**: Test different CTAs and messaging
4. **SEO Optimization**: Add meta tags, structured data, sitemap
5. **Blog Integration**: Add content marketing section
6. **Demo Environment**: Build interactive simulation preview

## 🌟 Credits

- Design & Development: OpenSims.ai Team
- Fonts: Google Fonts (Orbitron, Exo 2)
- Icons: Custom SVG icons
- Inspiration: Futuristic UI/UX design, cyberpunk aesthetics

---

**Built with AI. Powered by Human Intelligence.**

For questions or support, contact: hello@opensims.ai
