import React, { useState } from 'react';
import { 
  X, 
  Send, 
  Calendar, 
  Clock, 
  Sparkles, 
  Check, 
  Layers, 
  AlertCircle,
  Loader2,
  CheckCircle2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ViralClip, PlatformId, ScheduledPost } from '../types';

interface AutoPublishModalProps {
  clip: ViralClip | null;
  initialPlatform?: PlatformId;
  isOpen: boolean;
  onClose: () => void;
  onPostScheduled: (newPosts: ScheduledPost[]) => void;
}

export const AutoPublishModal: React.FC<AutoPublishModalProps> = ({
  clip,
  initialPlatform,
  isOpen,
  onClose,
  onPostScheduled,
}) => {
  if (!isOpen || !clip) return null;

  const [selectedPlatforms, setSelectedPlatforms] = useState<PlatformId[]>(
    initialPlatform ? [initialPlatform] : ['tiktok', 'reels', 'shorts']
  );
  const [publishMode, setPublishMode] = useState<'instant' | 'scheduled'>('instant');
  const [scheduleDateTime, setScheduleDateTime] = useState(() => {
    const d = new Date();
    d.setHours(d.getHours() + 4);
    return d.toISOString().slice(0, 16);
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successResult, setSuccessResult] = useState<any>(null);

  const togglePlatform = (p: PlatformId) => {
    if (selectedPlatforms.includes(p)) {
      if (selectedPlatforms.length > 1) {
        setSelectedPlatforms(selectedPlatforms.filter((item) => item !== p));
      }
    } else {
      setSelectedPlatforms([...selectedPlatforms, p]);
    }
  };

  const setPeakAiTime = () => {
    const d = new Date();
    d.setHours(18, 15, 0, 0); // 6:15 PM peak social media algorithm window
    if (d < new Date()) {
      d.setDate(d.getDate() + 1);
    }
    setScheduleDateTime(d.toISOString().slice(0, 16));
    setPublishMode('scheduled');
  };

  const handlePublish = async () => {
    setIsSubmitting(true);
    try {
      const scheduleTime = publishMode === 'scheduled' ? new Date(scheduleDateTime).toISOString() : undefined;

      const res = await fetch('/api/repurpose/publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clipId: clip.id,
          clipTitle: clip.title,
          platforms: selectedPlatforms,
          scheduleTime,
        }),
      });

      const data = await res.json();
      setSuccessResult(data);

      // Trigger celebration confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });

      // Construct ScheduledPost items
      const newPosts: ScheduledPost[] = selectedPlatforms.map((plat) => {
        let text = '';
        let tags: string[] = [];
        if (plat === 'tiktok') {
          text = clip.platformCopy.tiktok.caption;
          tags = clip.platformCopy.tiktok.hashtags;
        } else if (plat === 'reels') {
          text = clip.platformCopy.reels.caption;
          tags = clip.platformCopy.reels.hashtags;
        } else if (plat === 'shorts') {
          text = clip.platformCopy.shorts.title;
          tags = clip.platformCopy.shorts.tags;
        } else if (plat === 'linkedin') {
          text = clip.platformCopy.linkedin.headline;
          tags = clip.platformCopy.linkedin.hashtags;
        } else {
          text = clip.platformCopy.twitter.hookTweet;
          tags = ['#viral', '#repurpose'];
        }

        return {
          id: `post_${Date.now()}_${plat}`,
          clipId: clip.id,
          clipTitle: clip.title,
          platform: plat,
          scheduledFor: scheduleTime || new Date().toISOString(),
          status: publishMode === 'instant' ? 'published' : 'scheduled',
          copy: text,
          hashtags: tags,
          postUrl: `https://${plat}.com/post/omni_${Math.random().toString(36).substring(2, 8)}`,
          estimatedViews: Math.round(clip.viralityScore * 340 + Math.random() * 2000),
          createdAt: new Date().toISOString(),
        };
      });

      onPostScheduled(newPosts);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-lg bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-2xl overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {successResult ? (
          /* SUCCESS STATE */
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-xl font-extrabold text-white">
              {publishMode === 'instant'
                ? '🚀 Successfully Published!'
                : '📅 Scheduled for Auto-Drop!'}
            </h3>

            <p className="text-xs sm:text-sm text-zinc-400 max-w-sm mx-auto">
              Your 9:16 clip <span className="text-amber-300 font-semibold">"{clip.title}"</span> has been dispatched to {selectedPlatforms.length} connected channel APIs.
            </p>

            <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800 text-left space-y-2">
              <div className="text-[11px] font-semibold uppercase text-zinc-500">
                Dispatched Platform APIs:
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedPlatforms.map((p) => (
                  <span
                    key={p}
                    className="px-2.5 py-1 rounded-lg bg-zinc-900 text-xs text-white border border-zinc-800 flex items-center gap-1.5"
                  >
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span className="uppercase font-bold">{p}</span>
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                setSuccessResult(null);
                onClose();
              }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 via-rose-500 to-violet-600 text-white font-extrabold text-sm shadow-lg transition-all"
            >
              Done &amp; Return to Studio
            </button>
          </div>
        ) : (
          /* FORM STATE */
          <div className="space-y-5">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold">
                  Auto-Distribution Pipeline
                </span>
              </div>
              <h3 className="text-xl font-extrabold text-white">
                Publish or Schedule Clip
              </h3>
              <p className="text-xs text-zinc-400 mt-1 line-clamp-1">
                Clip: <span className="text-zinc-200 font-medium">"{clip.title}"</span>
              </p>
            </div>

            {/* Select Target Platforms */}
            <div>
              <label className="text-xs font-semibold text-zinc-300 block mb-2">
                Select Connected Destination Channels:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  { id: 'tiktok', name: 'TikTok', icon: '🎵' },
                  { id: 'reels', name: 'IG Reels', icon: '📸' },
                  { id: 'shorts', name: 'YouTube Shorts', icon: '🔴' },
                  { id: 'linkedin', name: 'LinkedIn', icon: '💼' },
                  { id: 'twitter', name: 'X (Twitter)', icon: '🐦' },
                ].map((plat) => {
                  const isChecked = selectedPlatforms.includes(plat.id as PlatformId);
                  return (
                    <button
                      key={plat.id}
                      type="button"
                      onClick={() => togglePlatform(plat.id as PlatformId)}
                      className={`p-2.5 rounded-xl border text-left flex items-center justify-between transition-all ${
                        isChecked
                          ? 'bg-amber-500/10 border-amber-500 text-white'
                          : 'bg-zinc-950 border-zinc-800 text-zinc-500 hover:border-zinc-700'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 text-xs font-bold">
                        <span>{plat.icon}</span>
                        <span>{plat.name}</span>
                      </div>
                      <div
                        className={`w-4 h-4 rounded-full flex items-center justify-center border ${
                          isChecked
                            ? 'bg-amber-500 border-amber-500 text-black'
                            : 'border-zinc-700'
                        }`}
                      >
                        {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Timing Mode: Instant vs Scheduled */}
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2 bg-zinc-950 p-1 rounded-xl border border-zinc-800">
                <button
                  type="button"
                  onClick={() => setPublishMode('instant')}
                  className={`py-2 text-xs rounded-lg font-bold transition-all flex items-center justify-center gap-1.5 ${
                    publishMode === 'instant'
                      ? 'bg-amber-500 text-black shadow'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Publish Now</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPublishMode('scheduled')}
                  className={`py-2 text-xs rounded-lg font-bold transition-all flex items-center justify-center gap-1.5 ${
                    publishMode === 'scheduled'
                      ? 'bg-amber-500 text-black shadow'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Schedule Drop</span>
                </button>
              </div>

              {publishMode === 'scheduled' && (
                <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-zinc-300">
                      Release Date &amp; Time
                    </label>
                    <button
                      type="button"
                      onClick={setPeakAiTime}
                      className="text-[11px] text-amber-400 hover:underline flex items-center gap-1 font-semibold"
                    >
                      <Sparkles className="w-3 h-3" />
                      <span>Set AI Peak Viral Window (6:15 PM)</span>
                    </button>
                  </div>
                  <input
                    type="datetime-local"
                    value={scheduleDateTime}
                    onChange={(e) => setScheduleDateTime(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              )}
            </div>

            {/* Virality Prediction notice */}
            <div className="p-3 bg-amber-500/5 rounded-xl border border-amber-500/20 flex items-start gap-2.5 text-xs text-amber-300/90">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>
                Based on clip hook score ({clip.viralityScore}/100), estimated initial reach is{' '}
                <strong className="text-white font-mono">
                  {(clip.viralityScore * 380).toLocaleString()}+ impressions
                </strong>{' '}
                across selected channels.
              </span>
            </div>

            {/* Submit Action */}
            <button
              type="button"
              disabled={isSubmitting}
              onClick={handlePublish}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 via-rose-500 to-violet-600 hover:from-amber-400 hover:via-rose-400 hover:to-violet-500 text-white font-extrabold text-sm shadow-xl shadow-rose-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Connecting APIs &amp; Dispatching...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>
                    {publishMode === 'instant'
                      ? `Dispatch to ${selectedPlatforms.length} Platforms Now`
                      : `Confirm Scheduled Drop`}
                  </span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
