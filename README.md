# bannerpreview.tech

Universal social media banner and asset previewer built with React, Vite, and Tailwind CSS.

Preview banners, headers, covers, and avatars across **all major social media platforms**:
- **Discord**: Server banner (960×540) & server icon (512×512)
- **X (Twitter)**: Header banner (1500×500) & profile picture (400×400)
- **YouTube**: Channel banner (2560×1440) & channel icon (800×800) with multi-device safe zone overlay
- **LinkedIn**: Background photo (1584×396) & profile photo (400×400)
- **Twitch**: Profile banner (1200×480) & avatar (256×256) with live status badge
- **Facebook**: Cover photo (851×315) & profile picture (170×170) with mobile crop preview
- **Reddit**: Community banner (1920×384) & icon (256×256)
- **GitHub**: Social preview (1280×640) & profile avatar (500×500)

## Features

- **Multi-Platform Instant Switching**: Upload your banner once and preview it across all 8 platforms instantly.
- **Desktop & Mobile Layouts**: Accurate UI mockups simulating real desktop and mobile app screens.
- **Platform-Specific Safe-Zone Overlays**: Visualize avatar obstructions, title overlays, and device crop boundaries.
- **Spec Sheet Generator**: Download a high-res spec sheet canvas with target specs, format, and color palette.
- **Dominant Palette Extraction**: Automatic HEX color extraction from your banner.
- **100% Client-Side**: All image processing stays private in your browser.

## Local development

```bash
npm install
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`.

## Build

```bash
npm run build
```
