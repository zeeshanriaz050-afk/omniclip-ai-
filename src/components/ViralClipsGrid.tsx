import React from 'react';
import { 
  Sparkles, 
  Flame, 
  Clock, 
  Play, 
  ArrowRight, 
  Share2, 
  CheckCircle2, 
  TrendingUp,
  MessageSquareQuote
} from 'lucide-react';
import { ViralClip } from '../types';

interface ViralClipsGridProps {
  clips: ViralClip[];
  activeClipId: string;
  onSelectClip: (clip: ViralClip) => void;
  onScheduleClip: (clip: ViralClip) => void;
}

export const ViralClipsGrid: React.FC<ViralClipsGridProps> = ({
  clips,
  activeClipId,
  onSelectClip,
  onScheduleClip,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-extrabold text-white tracking-tight">
              AI Auto-Cut Viral Clips
            </h3>
            <span className="px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold">
              {clips.length} Extracted
            </span>
          </div>
          <p className="text-xs text-zinc-400 mt-0.5">
            Ranked by AI Virality Index based on hook drop-off resistance, curiosity gap, and share triggers.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {clips.map((clip, index) => {
          const isActive = clip.id === activeClipId;
          const duration = Math.round(clip.endTime - clip.startTime);

          return (
            <div
              key={clip.id}
              className={`rounded-2xl border p-4.5 transition-all flex flex-col justify-between ${
                isActive
                  ? 'bg-zinc-900 border-amber-500 shadow-xl shadow-amber-500/10 ring-1 ring-amber-500/50'
                  : 'bg-zinc-900/70 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900'
              }`}
            >
              <div>
                {/* Top header row */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-md bg-zinc-800 text-zinc-400 text-[11px] font-bold flex items-center justify-center">
                      #{index + 1}
                    </span>
                    <div className="flex items-center gap-1 text-[11px] font-medium text-zinc-400 bg-zinc-950 px-2 py-0.5 rounded-md border border-zinc-800">
                      <Clock className="w-3 h-3 text-zinc-500" />
                      <span>{duration}s</span>
                    </div>
                  </div>

                  {/* Virality Score Badge */}
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gradient-to-r from-amber-500/15 to-rose-500/15 border border-amber-500/30 text-amber-400">
                    <Flame className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span className="text-xs font-black">{clip.viralityScore}</span>
                    <span className="text-[10px] text-zinc-400">/100</span>
                  </div>
                </div>

                {/* Title */}
                <h4 className="text-sm font-bold text-white line-clamp-2 mb-1.5">
                  {clip.title}
                </h4>

                {/* Quote */}
                <div className="flex items-start gap-1.5 text-xs text-amber-200/90 italic bg-zinc-950/60 p-2.5 rounded-xl border border-zinc-800/80 mb-3">
                  <MessageSquareQuote className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <span className="line-clamp-2">"{clip.speakerQuote}"</span>
                </div>

                {/* AI Virality Reason */}
                <div className="text-[11px] text-zinc-400 mb-3 line-clamp-2 bg-zinc-950/40 p-2 rounded-lg">
                  <span className="text-zinc-300 font-semibold">Why Viral: </span>
                  {clip.viralityReason}
                </div>

                {/* Metrics Breakdown Bar */}
                <div className="grid grid-cols-3 gap-2 text-center py-2 px-1 bg-zinc-950/80 rounded-xl border border-zinc-800/80 mb-4">
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-zinc-500">Hook</div>
                    <div className="text-xs font-bold text-rose-400">{clip.hookStrength}%</div>
                  </div>
                  <div className="border-x border-zinc-800">
                    <div className="text-[10px] uppercase tracking-wider text-zinc-500">Retention</div>
                    <div className="text-xs font-bold text-amber-400">{clip.retentionFactor}%</div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-zinc-500">Share</div>
                    <div className="text-xs font-bold text-violet-400">{clip.shareabilityIndex}%</div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-2 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={() => onSelectClip(clip)}
                  className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                    isActive
                      ? 'bg-amber-500 text-black shadow-md'
                      : 'bg-zinc-800 hover:bg-zinc-700 text-white'
                  }`}
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{isActive ? 'Active in Studio' : 'Preview & Edit'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => onScheduleClip(clip)}
                  className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors"
                  title="Schedule or publish clip"
                >
                  <Share2 className="w-4 h-4 text-sky-400" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
