export type PlatformId = 'tiktok' | 'reels' | 'shorts' | 'linkedin' | 'twitter';

export type SubtitlePresetId = 'hormozi' | 'mrbeast' | 'neon' | 'minimal' | 'tiktok';

export interface SubtitleWordTiming {
  text: string;
  startSeconds: number;
  endSeconds: number;
  emoji?: string;
}

export interface PlatformCopy {
  tiktok: {
    caption: string;
    hashtags: string[];
    soundRecommendation: string;
  };
  reels: {
    caption: string;
    hashtags: string[];
  };
  shorts: {
    title: string;
    description: string;
    tags: string[];
  };
  linkedin: {
    headline: string;
    postBody: string;
    hashtags: string[];
  };
  twitter: {
    hookTweet: string;
    thread: string[];
  };
}

export interface ViralClip {
  id: string;
  title: string;
  viralityScore: number;
  hookStrength: number;
  retentionFactor: number;
  shareabilityIndex: number;
  viralityReason: string;
  startTime: number;
  endTime: number;
  speakerQuote: string;
  subtitles: SubtitleWordTiming[];
  platformCopy: PlatformCopy;
  videoUrl?: string;
  layout?: 'face-tracking' | 'split-screen' | 'canvas-fit';
  aspectRatio?: '9:16' | '1:1' | '16:9';
}

export interface VideoProject {
  id: string;
  title: string;
  sourceUrl: string;
  durationSeconds: number;
  speakerName?: string;
  category?: string;
  summary?: string;
  overallTheme?: string;
  clips: ViralClip[];
  transcript?: string;
  createdAt: string;
  status: 'idle' | 'analyzing' | 'ready' | 'error';
}

export interface SubtitleConfig {
  preset: SubtitlePresetId;
  fontSize: number; // in rem / px
  activeColor: string; // color for current spoken word
  textColor: string;
  backgroundColor: string;
  positionY: number; // % from top, e.g. 70
  uppercase: boolean;
  showEmojis: boolean;
  outlineColor: string;
}

export interface ScheduledPost {
  id: string;
  clipId: string;
  clipTitle: string;
  platform: PlatformId;
  scheduledFor: string; // ISO string
  status: 'scheduled' | 'publishing' | 'published' | 'failed';
  copy: string;
  hashtags: string[];
  postUrl?: string;
  estimatedViews?: number;
  createdAt: string;
}

export interface ConnectedAccount {
  id: PlatformId;
  name: string;
  platform: PlatformId;
  handle: string;
  avatar: string;
  connected: boolean;
  followers: string;
  autoPublishEnabled: boolean;
  preferredPostTime: string; // e.g. "18:00"
}
