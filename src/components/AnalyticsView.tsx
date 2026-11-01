import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Clock, 
  Zap, 
  Flame, 
  Share2, 
  Sparkles,
  Users,
  Target
} from 'lucide-react';
import { VideoProject, ScheduledPost } from '../types';

interface AnalyticsViewProps {
  currentProject: VideoProject;
  posts: ScheduledPost[];
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({
  currentProject,
  posts,
}) => {
  const avgVirality = Math.round(
    currentProject.clips.reduce((acc, c) => acc + c.viralityScore, 0) /
      (currentProject.clips.length || 1)
  );

  const totalClips = currentProject.clips.length;
  const potentialImpressions = (avgVirality * 450 * totalClips * 5); // 5 platforms
  const hoursSaved = (totalClips * 2.8).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-violet-500/10 border border-zinc-800 rounded-3xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-2">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>Heavy Automation ROI Report</span>
            </div>
            <h2 className="text-2xl font-black text-white">
              Repurposing Engine Performance
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-xl">
              1 Long-Form Video ➔ {totalClips} High-Retention 9:16 Clips ➔ 5 Platforms ➔ {totalClips * 5} Content Assets generated automatically.
            </p>
          </div>

          <div className="bg-zinc-950/80 border border-zinc-800 p-4 rounded-2xl flex items-center gap-4">
            <div>
              <div className="text-[11px] uppercase tracking-wider text-zinc-500 font-bold">
                Time Saved This Batch
              </div>
              <div className="text-2xl font-black text-emerald-400">
                {hoursSaved} hrs
              </div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Clock className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4">
          <div className="text-xs uppercase tracking-wider text-zinc-500 font-bold mb-1">
            Average Virality Index
          </div>
          <div className="flex items-center gap-2">
            <span className="text-3xl font-black text-amber-400">{avgVirality}</span>
            <span className="text-xs text-zinc-500">/ 100</span>
          </div>
          <div className="text-[11px] text-zinc-400 mt-2 flex items-center gap-1">
            <Flame className="w-3.5 h-3.5 text-amber-500" />
            <span>Top 5% algorithmic percentile</span>
          </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4">
          <div className="text-xs uppercase tracking-wider text-zinc-500 font-bold mb-1">
            Omni-Channel Multiplier
          </div>
          <div className="flex items-center gap-2">
            <span className="text-3xl font-black text-rose-400">25x</span>
            <span className="text-xs text-zinc-500">Leverage</span>
          </div>
          <div className="text-[11px] text-zinc-400 mt-2 flex items-center gap-1">
            <Share2 className="w-3.5 h-3.5 text-rose-500" />
            <span>5 Platforms x {totalClips} Cuts</span>
          </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4">
          <div className="text-xs uppercase tracking-wider text-zinc-500 font-bold mb-1">
            Est. Audience Impressions
          </div>
          <div className="flex items-center gap-2">
            <span className="text-3xl font-black text-violet-400">
              {potentialImpressions.toLocaleString()}+
            </span>
          </div>
          <div className="text-[11px] text-zinc-400 mt-2 flex items-center gap-1">
            <Users className="w-3.5 h-3.5 text-violet-400" />
            <span>Across TikTok, Reels &amp; Shorts</span>
          </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4">
          <div className="text-xs uppercase tracking-wider text-zinc-500 font-bold mb-1">
            Auto-Publish Accuracy
          </div>
          <div className="flex items-center gap-2">
            <span className="text-3xl font-black text-sky-400">99.8%</span>
          </div>
          <div className="text-[11px] text-zinc-400 mt-2 flex items-center gap-1">
            <Target className="w-3.5 h-3.5 text-sky-400" />
            <span>Zero manual uploads needed</span>
          </div>
        </div>
      </div>

      {/* Virality Leaderboard & Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Clips Virality Ranking */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 shadow-lg">
          <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
            <Flame className="w-4 h-4 text-amber-400" />
            <span>Clips Virality Ranking</span>
          </h3>

          <div className="space-y-3">
            {currentProject.clips.map((clip, i) => (
              <div
                key={clip.id}
                className="p-3 bg-zinc-950 rounded-xl border border-zinc-800 flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-lg bg-zinc-800 text-zinc-400 text-xs font-bold flex items-center justify-center">
                    #{i + 1}
                  </span>
                  <div>
                    <h5 className="text-xs font-bold text-white line-clamp-1">
                      {clip.title}
                    </h5>
                    <div className="text-[10px] text-zinc-500 font-mono mt-0.5">
                      Duration: {Math.round(clip.endTime - clip.startTime)}s • Hook: {clip.hookStrength}%
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-black">
                  <span>{clip.viralityScore}</span>
                  <span className="text-[9px] text-zinc-500">pts</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Traditional Manual vs OmniClip AI Breakdown */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 shadow-lg">
          <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <span>Workflow Comparison (Masla vs Solution)</span>
          </h3>

          <div className="space-y-3 text-xs">
            <div className="p-3 bg-red-950/20 border border-red-500/20 rounded-xl space-y-1">
              <div className="font-bold text-red-400">❌ Purana Thaka Dene Wala Tareeqa (Manual)</div>
              <ul className="text-zinc-400 space-y-1 pl-4 list-disc text-[11px]">
                <li>Video baar baar dekh kar timestamps note karna (2-3 ghante)</li>
                <li>Premiere Pro mein 9:16 crop aur keyframing karna (1 ghanta)</li>
                <li>Hormozi style subtitles haath se type aur time karna (1.5 ghanta)</li>
                <li>5 alag platforms par jaakar caption likhna aur upload karna (1 ghanta)</li>
                <li><strong>Total Time: ~6 ghante per video!</strong></li>
              </ul>
            </div>

            <div className="p-3 bg-emerald-950/20 border border-emerald-500/20 rounded-xl space-y-1">
              <div className="font-bold text-emerald-400">✅ OmniClip AI Heavy Automation</div>
              <ul className="text-zinc-300 space-y-1 pl-4 list-disc text-[11px]">
                <li>1-Click YouTube link drop ➔ Gemini AI scan &amp; auto-cut (10 seconds)</li>
                <li>Animated bouncing captions with emoji auto-generated (Instant)</li>
                <li>Tailored TikTok, Reels, Shorts, LinkedIn, X copy (Instant)</li>
                <li>Direct APIs scheduled auto-publish (0 manual work)</li>
                <li><strong>Total Time: &lt; 2 minutes! (98% time saved)</strong></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
