import React from 'react';
import { 
  Sparkles, 
  Video, 
  CalendarClock, 
  Share2, 
  BarChart3, 
  Zap, 
  CheckCircle2, 
  Layers
} from 'lucide-react';

interface HeaderProps {
  activeTab: 'studio' | 'queue' | 'channels' | 'analytics';
  setActiveTab: (tab: 'studio' | 'queue' | 'channels' | 'analytics') => void;
  onLoadQuickDemo: () => void;
  onOpenGuide: () => void;
  scheduledCount: number;
  hasApiKey: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onLoadQuickDemo,
  onOpenGuide,
  scheduledCount,
  hasApiKey,
}) => {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-violet-600 p-[1px] shadow-lg shadow-rose-500/20">
            <div className="w-full h-full bg-zinc-950 rounded-[11px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-amber-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
                OmniClip
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30">
                AI Engine
              </span>
            </div>
            <p className="text-[11px] text-zinc-400 hidden sm:block">
              1-Click Repurpose &amp; Multi-Platform Auto-Publish
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 bg-zinc-900/80 p-1 rounded-xl border border-zinc-800">
          <button
            onClick={() => setActiveTab('studio')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'studio'
                ? 'bg-zinc-800 text-white shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
            }`}
          >
            <Video className="w-3.5 h-3.5 text-rose-400" />
            <span>Studio</span>
          </button>

          <button
            onClick={() => setActiveTab('queue')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all relative ${
              activeTab === 'queue'
                ? 'bg-zinc-800 text-white shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
            }`}
          >
            <CalendarClock className="w-3.5 h-3.5 text-amber-400" />
            <span>Auto-Publish Queue</span>
            {scheduledCount > 0 && (
              <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-amber-500 text-black">
                {scheduledCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('channels')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'channels'
                ? 'bg-zinc-800 text-white shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
            }`}
          >
            <Share2 className="w-3.5 h-3.5 text-sky-400" />
            <span className="hidden md:inline">Connected Channels</span>
            <span className="md:hidden">Channels</span>
          </button>

          <button
            onClick={() => setActiveTab('analytics')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'analytics'
                ? 'bg-zinc-800 text-white shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden md:inline">Analytics</span>
          </button>
        </nav>

        {/* Quick Actions & AI Status */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenGuide}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 hover:text-amber-200 text-xs font-semibold transition-all"
            title="Kaise chalayein - Step-by-step guide"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Guide</span>
          </button>

          <button
            onClick={onLoadQuickDemo}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 hover:text-white text-xs font-medium transition-all"
            title="Load ready-made viral podcast with clips & captions"
          >
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>Load Demo</span>
          </button>

          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="hidden sm:inline">Gemini 3.8 Flash</span>
            <span className="sm:hidden">AI Online</span>
          </div>
        </div>
      </div>
    </header>
  );
};
