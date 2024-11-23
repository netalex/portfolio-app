# Assets Structure

```
assets/
├── images/
│   ├── og/                    # Open Graph images for social sharing
│   │   ├── home.jpg
│   │   ├── projects.jpg
│   │   ├── skills.jpg
│   │   ├── experience.jpg
│   │   ├── blog.jpg
│   │   └── design-system.jpg
│   ├── projects/             # Project screenshots and images
│   │   ├── portfolio/
│   │   │   ├── thumbnail.webp
│   │   │   ├── screenshot1.webp
│   │   │   └── screenshot2.webp
│   │   └── other-projects/
│   ├── blog/                 # Blog post images
│   │   ├── design-system.webp
│   │   └── testing.webp
│   ├── icons/               # App icons for PWA
│   │   ├── icon-72x72.png
│   │   ├── icon-96x96.png
│   │   ├── icon-128x128.png
│   │   ├── icon-144x144.png
│   │   ├── icon-152x152.png
│   │   ├── icon-192x192.png
│   │   ├── icon-384x384.png
│   │   └── icon-512x512.png
│   └── profile/             # Personal photos and branding
│       ├── avatar.webp
│       └── logo.svg
├── fonts/                   # Self-hosted fonts
│   └── inter/
│       ├── inter-regular.woff2
│       ├── inter-medium.woff2
│       └── inter-bold.woff2
├── data/                    # Static JSON data
│   ├── projects.json
│   ├── skills.json
│   └── experiences.json
└── i18n/                    # Translation files
    ├── en.json
    ├── it.json
    └── fr.json
```

All images should be optimized and provided in modern formats (WebP) with fallbacks when necessary.
SVGs should be optimized using SVGO.
