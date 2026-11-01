import { ConnectedAccount, SubtitleConfig } from '../types';

export const INITIAL_ACCOUNTS: ConnectedAccount[] = [
  {
    id: 'tiktok',
    name: 'TikTok Creator Hub',
    platform: 'tiktok',
    handle: '@viral.omniclip',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
    connected: true,
    followers: '284.5K',
    autoPublishEnabled: true,
    preferredPostTime: '17:30',
  },
  {
    id: 'reels',
    name: 'Instagram Professional',
    platform: 'reels',
    handle: '@omniclip_official',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80',
    connected: true,
    followers: '192.1K',
    autoPublishEnabled: true,
    preferredPostTime: '18:15',
  },
  {
    id: 'shorts',
    name: 'YouTube Shorts Studio',
    platform: 'shorts',
    handle: 'OmniClip Shorts [Partner]',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=120&auto=format&fit=crop&q=80',
    connected: true,
    followers: '520.0K',
    autoPublishEnabled: true,
    preferredPostTime: '12:00',
  },
  {
    id: 'linkedin',
    name: 'LinkedIn Thought Leadership',
    platform: 'linkedin',
    handle: 'OmniClip Media Group',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    connected: true,
    followers: '48.9K',
    autoPublishEnabled: false,
    preferredPostTime: '09:00',
  },
  {
    id: 'twitter',
    name: 'X (Twitter) Viral Radar',
    platform: 'twitter',
    handle: '@omniclip_ai',
    avatar: 'https://images.unsplash.com/photo-1628157582853-a796fa650a6a?w=120&auto=format&fit=crop&q=80',
    connected: true,
    followers: '85.2K',
    autoPublishEnabled: true,
    preferredPostTime: '14:00',
  },
];

export const DEFAULT_SUBTITLE_CONFIG: SubtitleConfig = {
  preset: 'hormozi',
  fontSize: 22,
  activeColor: '#FACC15', // Neon Yellow
  textColor: '#FFFFFF',
  backgroundColor: 'rgba(0, 0, 0, 0.75)',
  positionY: 72, // 72% from top (ideal 9:16 safe area above captions/UI)
  uppercase: true,
  showEmojis: true,
  outlineColor: '#000000',
};

export const SUBTITLE_PRESETS = [
  {
    id: 'hormozi',
    name: 'Hormozi Pop',
    description: 'High energy, uppercase, glowing yellow active word with heavy drop-shadow',
    activeColor: '#FACC15',
    uppercase: true,
    sample: 'MOST FOUNDERS FAIL',
  },
  {
    id: 'mrbeast',
    name: 'MrBeast Impact',
    description: 'Bold condensed typography with electric green & cyan punch',
    activeColor: '#4ADE80',
    uppercase: true,
    sample: 'DELIVER THE PROMISE',
  },
  {
    id: 'neon',
    name: 'Cyber Neon',
    description: 'Vibrant cyberpunk glow with cyan & magenta accents',
    activeColor: '#22D3EE',
    uppercase: false,
    sample: 'Rewire your focus today',
  },
  {
    id: 'minimal',
    name: 'Minimal Clean',
    description: 'High-end aesthetic pill caption, clean white typography',
    activeColor: '#FFFFFF',
    uppercase: false,
    sample: 'The secret to compounding',
  },
  {
    id: 'tiktok',
    name: 'TikTok Classic',
    description: 'Classic semi-transparent black backing with centered white text',
    activeColor: '#FE2C55',
    uppercase: false,
    sample: 'Wait till you hear this...',
  },
] as const;
