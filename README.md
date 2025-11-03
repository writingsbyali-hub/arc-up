# arc^ — Plasma for the Planet 🚀

Open research framework developing plasma-based systems for ecological regeneration.

## 🌍 About

arc^ byali is Ali Al Saleh's honours research project at RMIT exploring plasma applications for ecological repair. Part of the xbyali ecosystem. This project is built in the open from day one — no patents, no closed labs, no waiting years to publish.

**Current Status**: Early development. No lab, no funding, no team yet. Just a framework, a vision, and a commitment to doing research differently.

## 🚀 Live Site

**Production URL**: [https://arcup.xbyali.page](https://arcup.xbyali.page)

### Deployment

This site is hosted on **GitHub Pages** using GitHub Actions for automatic deployment.

**Quick Deployment Steps:**
1. Push to `main` branch
2. GitHub Actions automatically builds and deploys
3. Live at `https://arcup.xbyali.page` within 2-3 minutes

**First-time Setup:**
- Repository → Settings → Pages
- Source: GitHub Actions
- Build workflow: `.github/workflows/deploy.yml`
- Custom domain configured in `astro.config.ts`

**Manual Build:**
```bash
npm run build
# Outputs to dist/ folder
```

## 🛠️ Tech Stack

- **Framework**: [Astro 5.0](https://astro.build)
- **Styling**: [Tailwind CSS](https://tailwindcss.com)
- **Deployment**: GitHub Pages
- **Base Template**: [AstroWind](https://github.com/onwidget/astrowind) (heavily customized)

## 🏃 Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
# → http://localhost:4321

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
arcup-site/
├── src/
│   ├── pages/           # Page routes (Home, About, Research, etc.)
│   ├── components/      # Reusable UI components
│   │   ├── widgets/    # Header, Footer, Contact, etc.
│   │   └── ui/         # Buttons, Forms, etc.
│   ├── layouts/         # Page layouts
│   ├── assets/          # Images, styles, fonts
│   ├── config.yaml      # Site configuration
│   └── navigation.js    # Nav structure
├── design/              # Design docs & agent personas
├── public/              # Static assets (robots.txt, etc.)
└── .github/workflows/   # GitHub Actions for deployment
```

## 📖 Key Pages

| Page | Route | Purpose |
|------|-------|---------|
| **Home** | `/` | Vision and introduction |
| **About** | `/about` | Project background & context |
| **Research** | `/research` | Four-scale approach (energy → ecosystems) |
| **Pathways** | `/pathways` | Research streams & current work |
| **Get Started** | `/get-started` | Contributor onboarding |
| **Workspace** | `/workspace` | Documentation hub |

## 🎨 Design System

### Colors
- **arc-electric**: `#674EF3` - Primary action color, links, highlights
- **living-earth**: `#14B8A6` - Nature, growth, ecological themes
- **primary-900**: `#080E21` - Dark background

### Typography
- **Font**: System mono stack for technical aesthetic
- **Scale**: Tailwind defaults with bold headers for hierarchy

### Components
- All components use consistent spacing (4, 8, 12, 16px grid)
- Glassmorphism effects with `backdrop-blur`
- Hover states with subtle scale/shadow animations

## 🤝 Contributing

See [Get Started](./src/pages/get-started.astro) page for full contribution guidelines.

**Safety & Ethics Framework:**
- **People**: Work benefits communities without exploitation
- **Organisms**: Non-invasive environmental sensing only
- **Ecosystems**: Dynamic systems modeling, pause if degradation appears
- **Future**: Downstream effects considered, continuity over novelty

**Open Licensing:**
- **Hardware**: CERN-OHL-S v2 (designs, CAD files)
- **Documentation**: CC BY-NC-SA 4.0 (guides, protocols)
- **Software**: AGPL-3.0 (all code)

Based on [Re:Practise Framework](https://repractise.xbyali.page) for ethical open research.


## 🔗 Links

- **Re:Practise**: [repractise.xbyali.page](https://repractise.xbyali.page)
- **Workspace**: [workspace.xbyali.page](https://workspace.xbyali.page)
- **Ali's Work**: [xbyali.page](https://xbyali.page)
- **Discord**: [Join community](https://discord.com/invite/DA8BPA3VsN)
- **YouTube**: [@arc-arcup](https://www.youtube.com/@arc-arcup)

## 📞 Contact

- **Discord**: [Community server](https://discord.com/invite/DA8BPA3VsN)
- **Contact Form**: [Google Form](https://docs.google.com/forms/d/e/1FAIpQLScyVWKDifYxaVWOhdW-SPEXXDVEjBmVezv7W668lizvRCQuaQ/viewform)

## 📄 License

This project uses three licenses for different components:

- **Hardware Designs**: CERN-OHL-S v2
- **Documentation & Content**: CC BY-NC-SA 4.0
- **Software & Code**: AGPL-3.0

Not anti-commercial. **Pro-commons.**

---

## 🙏 Acknowledgements

**Template & Infrastructure:**
- Built using [AstroWind](https://github.com/onwidget/astrowind) template by onWidget
- Heavily customized for arc^ branding and research workflow
- Astro static site framework

**Inspiration & Context:**
- Part of the xbyali ecosystem of open research projects
- Influenced by Re:Practise ethical framework
- Built openly from day one, following open science principles

**Community:**
- Early feedback and support from Discord community
- Honours research supervision at RMIT University

---

## 📈 Optional Enhancements

### Analytics Setup (Optional)
To enable visitor analytics:
1. Get a **Google Analytics 4** measurement ID from [analytics.google.com](https://analytics.google.com)
2. Add to `src/config.yaml`:
   ```yaml
   analytics:
     vendors:
       googleAnalytics:
         id: "G-XXXXXXXXXX"  # Your GA4 ID
   ```

### Google Search Console (Optional)
To verify site ownership and see search performance:
1. Go to [search.google.com/search-console](https://search.google.com/search-console)
2. Add property for `https://arcup.xbyali.page`
3. Get HTML tag verification code
4. Add to `src/config.yaml`:
   ```yaml
   site:
     googleSiteVerificationId: "your-verification-code"
   ```

---

**Built with curiosity and care by Ali Al Saleh.**
For a world where science serves life and the future.
