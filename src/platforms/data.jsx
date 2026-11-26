import React from 'react'
import {
  Globe,
  ImageIcon,
  Layout,
  Layers,
  Smartphone,
  Sparkles,
  UploadCloud,
  CheckCircle2,
  Tv,
  Monitor
} from 'lucide-react'

export const PLATFORMS = [
  {
    id: 'discord',
    name: 'Discord',
    shortName: 'Discord',
    brandColor: '#5865F2',
    accentColor: '#5865F2',
    tagline: 'Server banner (960×540) & server icon',
    badgeText: 'Built for Discord',
    heroTitle: 'See your server in a',
    heroTitleHighlight: 'new light.',
    heroDescription: 'Preview your Discord server banner and icon across desktop and mobile layouts with exact safe zones before uploading.',
    bannerSpecs: {
      width: 960,
      height: 540,
      ratio: '16:9',
      label: 'Server banner',
      hint: 'Recommended 960 × 540 px (16:9)'
    },
    iconSpecs: {
      width: 512,
      height: 512,
      shape: 'rounded-square',
      label: 'Server icon',
      hint: 'Recommended 512 × 512 px'
    },
    tip: {
      title: 'Discord banner placement tip',
      text: 'Keep key artwork near the center-right. The channel header and sidebar obscure the left 220px, and mobile view crops the banner heavily.'
    },
    guidelines: [
      {
        icon: <ImageIcon size={17} />,
        title: 'Server Banners',
        text: 'Recommended at 960 × 540px (16:9 ratio). Minimum 512 × 512px. Supports animated GIFs with Nitro boosts.'
      },
      {
        icon: <Layers size={17} />,
        title: 'Safe Zones',
        text: 'Left sidebar obscures 220px on desktop. On mobile, server icon and title card overlay the lower half.'
      },
      {
        icon: <Smartphone size={17} />,
        title: 'Mobile Optimization',
        text: 'Discord mobile dynamically pans and crops. Focal subjects should always be centered vertically.'
      }
    ]
  },
  {
    id: 'twitter',
    name: 'X (Twitter)',
    shortName: 'X / Twitter',
    brandColor: '#1D9BF0',
    accentColor: '#1D9BF0',
    tagline: 'Header banner (1500×500) & profile picture',
    badgeText: 'X / Twitter Specs',
    heroTitle: 'Perfect your profile header on',
    heroTitleHighlight: 'X & Twitter.',
    heroDescription: 'Ensure your 1500 × 500 header looks flawless across desktop and mobile without the avatar covering crucial text or art.',
    bannerSpecs: {
      width: 1500,
      height: 500,
      ratio: '3:1',
      label: 'Header banner',
      hint: 'Recommended 1500 × 500 px (3:1)'
    },
    iconSpecs: {
      width: 400,
      height: 400,
      shape: 'circle',
      label: 'Profile picture',
      hint: 'Recommended 400 × 400 px'
    },
    tip: {
      title: 'Avatar overlap warning',
      text: 'Your circular profile picture cuts into the bottom-left of your header banner (~halfway up). Keep text and logos in the center or right side.'
    },
    guidelines: [
      {
        icon: <ImageIcon size={17} />,
        title: '3:1 Aspect Ratio',
        text: '1500 × 500px is the official standard. Images up to 2MB supported (JPG, PNG, WebP).'
      },
      {
        icon: <Layers size={17} />,
        title: 'Avatar Obstruction',
        text: 'The bottom-left ~20% of your banner is covered by your circular avatar across both web and mobile.'
      },
      {
        icon: <Smartphone size={17} />,
        title: 'Mobile Crop Margins',
        text: 'Top and bottom edges (~60px) are prone to UI clipping on varying screen sizes and dark/light modes.'
      }
    ]
  },
  {
    id: 'youtube',
    name: 'YouTube',
    shortName: 'YouTube',
    brandColor: '#FF0000',
    accentColor: '#FF0000',
    tagline: 'Channel banner (2560×1440) & channel icon',
    badgeText: 'YouTube Multi-Device',
    heroTitle: 'Master the complex YouTube',
    heroTitleHighlight: 'banner safe area.',
    heroDescription: 'Preview your channel banner across TV (2560×1440), Desktop (2560×423), and Mobile (1546×423 safe zone) in one glance.',
    bannerSpecs: {
      width: 2560,
      height: 1440,
      ratio: '16:9',
      label: 'Channel banner',
      hint: 'Recommended 2560 × 1440 px'
    },
    iconSpecs: {
      width: 800,
      height: 800,
      shape: 'circle',
      label: 'Channel icon',
      hint: 'Recommended 800 × 800 px'
    },
    tip: {
      title: 'YouTube safe area rule',
      text: 'Only the central 1546 × 423 px area is guaranteed to be visible on phones and smaller screens. Place all logos, social tags, and text there!'
    },
    guidelines: [
      {
        icon: <Tv size={17} />,
        title: 'TV vs Desktop vs Mobile',
        text: 'Full 2560 × 1440 displays on smart TVs, while desktop displays a slim 423px slice, and mobile cuts the sides.'
      },
      {
        icon: <Layers size={17} />,
        title: '1546 × 423 Safe Zone',
        text: 'This central rectangle is the gold standard. Never place typography or faces outside this boundary.'
      },
      {
        icon: <ImageIcon size={17} />,
        title: 'File Size Limit',
        text: 'Max file size is 6MB. JPG, PNG, or GIF (non-animated only on YouTube channels).'
      }
    ]
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    shortName: 'LinkedIn',
    brandColor: '#0A66C2',
    accentColor: '#0A66C2',
    tagline: 'Background photo (1584×396) & profile photo',
    badgeText: 'LinkedIn Professional',
    heroTitle: 'Build a polished, professional',
    heroTitleHighlight: 'LinkedIn banner.',
    heroDescription: 'Verify your profile background photo looks crisp on desktop and mobile without your headshot blocking your credentials.',
    bannerSpecs: {
      width: 1584,
      height: 396,
      ratio: '4:1',
      label: 'Background photo',
      hint: 'Recommended 1584 × 396 px (4:1)'
    },
    iconSpecs: {
      width: 400,
      height: 400,
      shape: 'circle',
      label: 'Profile photo',
      hint: 'Recommended 400 × 400 px'
    },
    tip: {
      title: 'Profile photo obstruction',
      text: 'On desktop, your circular photo covers the lower left of your banner. On mobile, it shifts toward the center. Leave the left third free of crucial text!'
    },
    guidelines: [
      {
        icon: <ImageIcon size={17} />,
        title: '4:1 Aspect Ratio',
        text: '1584 × 396px for personal profiles (or 1128 × 191px for company pages). Max file size 8MB.'
      },
      {
        icon: <Layers size={17} />,
        title: 'Left-Side Safe Zone',
        text: 'Keep contact info, value propositions, and logos aligned in the right 60% of the banner.'
      },
      {
        icon: <Smartphone size={17} />,
        title: 'Mobile Shifting',
        text: 'LinkedIn mobile shifts the profile photo closer to the center, covering a different slice than desktop.'
      }
    ]
  },
  {
    id: 'twitch',
    name: 'Twitch',
    shortName: 'Twitch',
    brandColor: '#9146FF',
    accentColor: '#9146FF',
    tagline: 'Profile banner (1200×480) & avatar',
    badgeText: 'Twitch Streamer',
    heroTitle: 'Elevate your stream channel with',
    heroTitleHighlight: 'custom branding.',
    heroDescription: 'Preview your Twitch profile banner with avatar, live status badge, stream header, and social links before going live.',
    bannerSpecs: {
      width: 1200,
      height: 480,
      ratio: '5:2',
      label: 'Profile banner',
      hint: 'Recommended 1200 × 480 px (5:2)'
    },
    iconSpecs: {
      width: 256,
      height: 256,
      shape: 'circle',
      label: 'Profile avatar',
      hint: 'Recommended 256 × 256 px'
    },
    tip: {
      title: 'Twitch banner scaling',
      text: 'Twitch scales profile banners horizontally across wide monitors and applies dark gradients near the bottom for readability.'
    },
    guidelines: [
      {
        icon: <ImageIcon size={17} />,
        title: '5:2 Banner Ratio',
        text: '1200 × 480px recommended. Max 10MB. Twitch supports JPEG and PNG format.'
      },
      {
        icon: <Layers size={17} />,
        title: 'Avatar & Live Badge',
        text: 'The glowing circular avatar and LIVE badge overlay the lower left portion of your profile header.'
      },
      {
        icon: <Smartphone size={17} />,
        title: 'Mobile Stream Layout',
        text: 'On the Twitch mobile app, the banner shrinks to fit above the offline/live video player and chat.'
      }
    ]
  },
  {
    id: 'facebook',
    name: 'Facebook',
    shortName: 'Facebook',
    brandColor: '#1877F2',
    accentColor: '#1877F2',
    tagline: 'Cover photo (851×315) & profile picture',
    badgeText: 'Facebook Cover',
    heroTitle: 'Solve the Facebook cover photo',
    heroTitleHighlight: 'crop dilemma.',
    heroDescription: 'Facebook displays 820×312 on desktop but 640×360 on mobile. Preview the universal safe zone so you never lose crucial details.',
    bannerSpecs: {
      width: 851,
      height: 315,
      ratio: '16:9 / 2.7:1',
      label: 'Cover photo',
      hint: 'Recommended 851 × 315 px'
    },
    iconSpecs: {
      width: 170,
      height: 170,
      shape: 'circle',
      label: 'Profile picture',
      hint: 'Recommended 170 × 170 px'
    },
    tip: {
      title: 'Desktop vs mobile crop mismatch',
      text: 'Desktop crops the top and bottom off mobile-oriented covers, while mobile crops the left and right sides of desktop covers. Keep vital content in the 640 × 312 center zone!'
    },
    guidelines: [
      {
        icon: <ImageIcon size={17} />,
        title: '851 × 315px Standard',
        text: 'Load fastest as an sRGB JPG under 100 KB. PNG works best for images with text or logos.'
      },
      {
        icon: <Layers size={17} />,
        title: 'Universal Safe Center',
        text: 'Center all text and graphics within the 640 × 312px zone to be 100% visible on both mobile and desktop.'
      },
      {
        icon: <Smartphone size={17} />,
        title: 'Profile Picture Overlap',
        text: 'Circular profile picture overlaps the bottom left or bottom center depending on profile type and device.'
      }
    ]
  },
  {
    id: 'reddit',
    name: 'Reddit',
    shortName: 'Reddit',
    brandColor: '#FF4500',
    accentColor: '#FF4500',
    tagline: 'Community banner (1920×384) & icon',
    badgeText: 'Reddit Community',
    heroTitle: 'Design standout banners for your',
    heroTitleHighlight: 'subreddit.',
    heroDescription: 'Preview your community or profile header at the official 1920 × 384 Large, Medium, or Small sizes with accurate UI elements.',
    bannerSpecs: {
      width: 1920,
      height: 384,
      ratio: '5:1',
      label: 'Community banner',
      hint: 'Recommended 1920 × 384 px (5:1)'
    },
    iconSpecs: {
      width: 256,
      height: 256,
      shape: 'circle',
      label: 'Community icon',
      hint: 'Recommended 256 × 256 px'
    },
    tip: {
      title: 'Reddit header overlay',
      text: 'The community icon, Join button, and subreddit title overlap the lower edge of the banner. Keep main graphics elevated.'
    },
    guidelines: [
      {
        icon: <ImageIcon size={17} />,
        title: '1920 × 384px (Large)',
        text: 'Reddit supports Large (384px), Medium (256px), and Small (128px) banner heights. Large gives maximum visual impact.'
      },
      {
        icon: <Layers size={17} />,
        title: 'Subreddit Icon Overlap',
        text: 'Circular avatar and community info pill sit at the bottom edge. Leave bottom 80px free of critical logos.'
      },
      {
        icon: <Smartphone size={17} />,
        title: 'App Header Scaling',
        text: 'The Reddit mobile app shows a condensed horizontal crop. Focus details towards horizontal center.'
      }
    ]
  },
  {
    id: 'github',
    name: 'GitHub',
    shortName: 'GitHub',
    brandColor: '#24292F',
    accentColor: '#58a6ff',
    tagline: 'Social preview (1280×640) & profile avatar',
    badgeText: 'GitHub Developer',
    heroTitle: 'Showcase your code & profile with',
    heroTitleHighlight: 'GitHub assets.',
    heroDescription: 'Preview repo social preview cards (1280×640) and profile README banners with realistic dark-mode GitHub UI.',
    bannerSpecs: {
      width: 1280,
      height: 640,
      ratio: '2:1',
      label: 'Social preview / banner',
      hint: 'Recommended 1280 × 640 px (2:1)'
    },
    iconSpecs: {
      width: 500,
      height: 500,
      shape: 'rounded-square',
      label: 'Profile avatar',
      hint: 'Recommended 500 × 500 px'
    },
    tip: {
      title: 'Social embed card margins',
      text: 'GitHub social preview images display across Twitter cards, Slack, and Discord embeds. Leave at least 40px margin around borders.'
    },
    guidelines: [
      {
        icon: <ImageIcon size={17} />,
        title: '1280 × 640px (2:1)',
        text: 'Standard Open Graph resolution for GitHub repositories and organizations. Under 1MB recommended.'
      },
      {
        icon: <Layers size={17} />,
        title: 'Social Card Embeds',
        text: 'Used automatically when sharing repository links on Twitter, Slack, LinkedIn, and Discord.'
      },
      {
        icon: <Smartphone size={17} />,
        title: 'High Contrast Dark Mode',
        text: 'GitHub UI uses `#0d1117` and `#161b22`. Ensure your graphics stand out on deep dark backgrounds.'
      }
    ]
  }
]

export function PlatformIcon({ platformId, size = 18, className = '' }) {
  switch (platformId) {
    case 'discord':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
          <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
        </svg>
      )
    case 'twitter':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      )
    case 'youtube':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      )
    case 'linkedin':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76c-.95 0-1.72-.78-1.72-1.73a1.73 1.73 0 0 1 3.45 0c0 .95-.78 1.73-1.73 1.73M7.86 18.5V10.1H5.06v8.4h2.8z"/>
        </svg>
      )
    case 'twitch':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
          <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z"/>
        </svg>
      )
    case 'facebook':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      )
    case 'reddit':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
          <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.197-2.512-.73a.326.326 0 0 0-.232-.095z"/>
        </svg>
      )
    case 'github':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
        </svg>
      )
    default:
      return <Globe size={size} className={className} />
  }
}
