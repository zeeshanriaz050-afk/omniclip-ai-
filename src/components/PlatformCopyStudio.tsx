import React, { useState } from 'react';
import { 
  Copy, 
  Check, 
  Sparkles, 
  Send, 
  Calendar, 
  MessageSquare, 
  Hash, 
  Music, 
  RefreshCw,
  Loader2,
  ExternalLink
} from 'lucide-react';
import { ViralClip, PlatformId, PlatformCopy } from '../types';

interface PlatformCopyStudioProps {
  clip: ViralClip;
  onUpdatePlatformCopy: (platformCopy: PlatformCopy) => void;
  onOpenScheduleModal: (clip: ViralClip, targetPlatform?: PlatformId) => void;
}

export const PlatformCopyStudio: React.FC<PlatformCopyStudioProps> = ({
  clip,
  onUpdatePlatformCopy,
  onOpenScheduleModal,
}) => {
  const [selectedPlatform, setSelectedPlatform] = useState<PlatformId>('tiktok');
  const [copied, setCopied] = useState(false);
  const [isRefining, setIsRefining] = useState(false);
  const [refineInstruction, setRefineInstruction] = useState('');
  const [showRefineInput, setShowRefineInput] = useState(false);

  const copy = clip.platformCopy;

  const handleCopyClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRefineCopy = async (instruction: string) => {
    setIsRefining(true);
    try {
      const res = await fetch('/api/repurpose/generate-copy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clipTitle: clip.title,
          speakerQuote: clip.speakerQuote,
          platform: selectedPlatform,
          toneInstruction: instruction,
        }),
      });

      if (!res.ok) throw new Error('Refine copy failed');
      const data = await res.json();

      // Update specific platform copy
      const updated = { ...clip.platformCopy };
      if (selectedPlatform === 'tiktok') {
        updated.tiktok.caption = data.content || updated.tiktok.caption;
        if (data.hashtags?.length) updated.tiktok.hashtags = data.hashtags;
      } else if (selectedPlatform === 'reels') {
        updated.reels.caption = data.content || updated.reels.caption;
        if (data.hashtags?.length) updated.reels.hashtags = data.hashtags;
      } else if (selectedPlatform === 'shorts') {
        updated.shorts.description = data.content || updated.shorts.description;
      } else if (selectedPlatform === 'linkedin') {
        updated.linkedin.postBody = data.content || updated.linkedin.postBody;
      } else if (selectedPlatform === 'twitter') {
        updated.twitter.hookTweet = data.content || updated.twitter.hookTweet;
      }

      onUpdatePlatformCopy(updated);
      setShowRefineInput(false);
      setRefineInstruction('');
    } catch (err) {
      console.error(err);
    } finally {
      setIsRefining(false);
    }
  };

  return (
    <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-5 md:p-6 shadow-xl">
      {/* Header and Platform Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800 mb-5">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-extrabold text-white tracking-tight">
              Multi-Platform Copy &amp; Distribution
            </h3>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-violet-500/10 text-violet-400 border border-violet-500/20">
              AI Tailored
            </span>
          </div>
          <p className="text-xs text-zinc-400 mt-0.5">
            Format, tone, and hashtags auto-customized for the unique algorithm of each channel.
          </p>
        </div>

        {/* Platform Tabs */}
        <div className="flex items-center gap-1 bg-zinc-950 p-1 rounded-xl border border-zinc-800 overflow-x-auto">
          {[
            { id: 'tiktok', label: 'TikTok', icon: '🎵', badge: 'Short' },
            { id: 'reels', label: 'IG Reels', icon: '📸', badge: 'Aesthetic' },
            { id: 'shorts', label: 'YT Shorts', icon: '🔴', badge: 'High CTR' },
            { id: 'linkedin', label: 'LinkedIn', icon: '💼', badge: 'B2B Post' },
            { id: 'twitter', label: 'X (Thread)', icon: '🐦', badge: 'Viral Hook' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedPlatform(tab.id as PlatformId)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                selectedPlatform === tab.id
                  ? 'bg-zinc-800 text-white shadow-sm ring-1 ring-zinc-700'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Copy Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Content and Inputs */}
        <div className="lg:col-span-2 space-y-4">
          {/* TIKTOK VIEW */}
          {selectedPlatform === 'tiktok' && (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-zinc-300 block mb-1">
                  TikTok Caption (Fast Hook &amp; Curiosity)
                </label>
                <textarea
                  rows={3}
                  value={copy.tiktok.caption}
                  onChange={(e) => {
                    const updated = { ...copy };
                    updated.tiktok.caption = e.target.value;
                    onUpdatePlatformCopy(updated);
                  }}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-xs sm:text-sm text-zinc-100 focus:outline-none focus:border-amber-500 transition-colors"
                />
              </div>

              {/* Sound & Hashtags */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-zinc-950/70 p-3 rounded-xl border border-zinc-800">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-zinc-400 mb-1.5">
                    <Music className="w-3.5 h-3.5 text-pink-400" />
                    <span>Recommended Audio Vibe</span>
                  </div>
                  <input
                    type="text"
                    value={copy.tiktok.soundRecommendation}
                    onChange={(e) => {
                      const updated = { ...copy };
                      updated.tiktok.soundRecommendation = e.target.value;
                      onUpdatePlatformCopy(updated);
                    }}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1 text-xs text-zinc-200"
                  />
                </div>

                <div className="bg-zinc-950/70 p-3 rounded-xl border border-zinc-800">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-zinc-400 mb-1.5">
                    <Hash className="w-3.5 h-3.5 text-sky-400" />
                    <span>Viral Hashtags</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {copy.tiktok.hashtags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded bg-zinc-800 text-[11px] text-zinc-300 font-mono"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* INSTAGRAM REELS VIEW */}
          {selectedPlatform === 'reels' && (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-zinc-300 block mb-1">
                  Instagram Caption (Storytelling + Save Trigger CTA)
                </label>
                <textarea
                  rows={6}
                  value={copy.reels.caption}
                  onChange={(e) => {
                    const updated = { ...copy };
                    updated.reels.caption = e.target.value;
                    onUpdatePlatformCopy(updated);
                  }}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-xs sm:text-sm text-zinc-100 focus:outline-none focus:border-amber-500 whitespace-pre-line"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-zinc-400 block mb-1.5">
                  High-Engagement Reels Hashtags
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {copy.reels.hashtags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-lg bg-zinc-950 border border-zinc-800 text-xs text-rose-300 font-mono"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* YOUTUBE SHORTS VIEW */}
          {selectedPlatform === 'shorts' && (
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-zinc-300 mb-1">
                  <span>High-CTR Shorts Title (Under 55 Chars)</span>
                  <span className="font-mono text-amber-400">
                    {copy.shorts.title.length}/55
                  </span>
                </div>
                <input
                  type="text"
                  value={copy.shorts.title}
                  onChange={(e) => {
                    const updated = { ...copy };
                    updated.shorts.title = e.target.value;
                    onUpdatePlatformCopy(updated);
                  }}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-sm text-zinc-100 font-bold focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-zinc-300 block mb-1">
                  SEO Description &amp; Timestamps
                </label>
                <textarea
                  rows={4}
                  value={copy.shorts.description}
                  onChange={(e) => {
                    const updated = { ...copy };
                    updated.shorts.description = e.target.value;
                    onUpdatePlatformCopy(updated);
                  }}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-xs text-zinc-200 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-zinc-400 block mb-1">
                  Search &amp; Algorithmic Tags
                </label>
                <div className="flex flex-wrap gap-1">
                  {copy.shorts.tags.map((t, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-zinc-800 text-xs text-zinc-300">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* LINKEDIN VIEW */}
          {selectedPlatform === 'linkedin' && (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-zinc-300 block mb-1">
                  Executive Headline Hook
                </label>
                <input
                  type="text"
                  value={copy.linkedin.headline}
                  onChange={(e) => {
                    const updated = { ...copy };
                    updated.linkedin.headline = e.target.value;
                    onUpdatePlatformCopy(updated);
                  }}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-sm text-zinc-100 font-semibold focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-zinc-300 block mb-1">
                  Thought Leadership Post Body (Formatted with bullet takeaways)
                </label>
                <textarea
                  rows={6}
                  value={copy.linkedin.postBody}
                  onChange={(e) => {
                    const updated = { ...copy };
                    updated.linkedin.postBody = e.target.value;
                    onUpdatePlatformCopy(updated);
                  }}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-xs sm:text-sm text-zinc-100 focus:outline-none focus:border-amber-500 whitespace-pre-line font-sans"
                />
              </div>
            </div>
          )}

          {/* TWITTER / X VIEW */}
          {selectedPlatform === 'twitter' && (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-zinc-300 block mb-1">
                  Hook Tweet (Stop the Scroll)
                </label>
                <textarea
                  rows={3}
                  value={copy.twitter.hookTweet}
                  onChange={(e) => {
                    const updated = { ...copy };
                    updated.twitter.hookTweet = e.target.value;
                    onUpdatePlatformCopy(updated);
                  }}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-xs sm:text-sm text-zinc-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-zinc-400 block mb-1">
                  Thread Follow-ups (3 Tweets)
                </label>
                <div className="space-y-2">
                  {copy.twitter.thread.map((tweet, i) => (
                    <div key={i} className="flex gap-2">
                      <span className="text-xs font-mono font-bold text-zinc-500 pt-1">
                        {i + 1}/
                      </span>
                      <textarea
                        rows={2}
                        value={tweet}
                        onChange={(e) => {
                          const updated = { ...copy };
                          updated.twitter.thread[i] = e.target.value;
                          onUpdatePlatformCopy(updated);
                        }}
                        className="flex-1 bg-zinc-950 border border-zinc-800 rounded-lg p-2 text-xs text-zinc-200 focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* AI Refine Quick Triggers */}
          <div className="pt-2 flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-zinc-400 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>AI Refine:</span>
            </span>

            {[
              'More controversial & punchy',
              'Shorter & snappier',
              'Stronger Call-To-Action (CTA)',
              'Add humor / relatable hook',
            ].map((prompt, i) => (
              <button
                key={i}
                disabled={isRefining}
                onClick={() => handleRefineCopy(prompt)}
                className="px-2.5 py-1 rounded-lg bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 text-[11px] text-zinc-300 hover:text-white transition-all disabled:opacity-50"
              >
                {prompt}
              </button>
            ))}

            <button
              onClick={() => setShowRefineInput(!showRefineInput)}
              className="text-xs text-amber-400 hover:underline ml-1"
            >
              Custom Prompt
            </button>
          </div>

          {showRefineInput && (
            <div className="flex gap-2 pt-2">
              <input
                type="text"
                placeholder="e.g. Write in Alex Hormozi style, emphasize ROI..."
                value={refineInstruction}
                onChange={(e) => setRefineInstruction(e.target.value)}
                className="flex-1 bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-zinc-100 focus:outline-none focus:border-amber-500"
              />
              <button
                onClick={() => handleRefineCopy(refineInstruction)}
                disabled={isRefining || !refineInstruction}
                className="px-3 py-1.5 rounded-lg bg-amber-500 text-black text-xs font-bold hover:bg-amber-400 disabled:opacity-50 flex items-center gap-1"
              >
                {isRefining ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                <span>Apply</span>
              </button>
            </div>
          )}
        </div>

        {/* Right Col: Live Channel Preview Card & Action Bar */}
        <div className="bg-zinc-950/80 rounded-2xl border border-zinc-800 p-4.5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800 mb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-bold text-zinc-300 uppercase tracking-wider">
                  Live Feed Preview
                </span>
              </div>
              <span className="text-[11px] text-zinc-500 font-mono">
                {selectedPlatform.toUpperCase()}
              </span>
            </div>

            {/* Simulated Post Card */}
            <div className="bg-zinc-900 rounded-xl p-3 border border-zinc-800/80 space-y-2.5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 to-rose-500 p-[1px]">
                  <div className="w-full h-full bg-zinc-900 rounded-full flex items-center justify-center text-xs font-bold text-white">
                    OC
                  </div>
                </div>
                <div>
                  <div className="text-xs font-bold text-white">OmniClip Creator Hub</div>
                  <div className="text-[10px] text-zinc-500">Just now • Auto-Engine</div>
                </div>
              </div>

              <div className="text-xs text-zinc-200 line-clamp-4 leading-relaxed font-sans">
                {selectedPlatform === 'tiktok' && copy.tiktok.caption}
                {selectedPlatform === 'reels' && copy.reels.caption}
                {selectedPlatform === 'shorts' && `${copy.shorts.title}\n\n${copy.shorts.description}`}
                {selectedPlatform === 'linkedin' && `${copy.linkedin.headline}\n\n${copy.linkedin.postBody}`}
                {selectedPlatform === 'twitter' && copy.twitter.hookTweet}
              </div>

              <div className="text-[11px] text-sky-400 line-clamp-1 font-mono">
                {selectedPlatform === 'tiktok' && copy.tiktok.hashtags.join(' ')}
                {selectedPlatform === 'reels' && copy.reels.hashtags.join(' ')}
                {selectedPlatform === 'shorts' && copy.shorts.tags.join(' ')}
                {selectedPlatform === 'linkedin' && copy.linkedin.hashtags.join(' ')}
              </div>
            </div>
          </div>

          {/* Quick Copy & Publish Action Bar */}
          <div className="mt-5 space-y-2.5">
            <button
              type="button"
              onClick={() => {
                let fullText = '';
                if (selectedPlatform === 'tiktok') {
                  fullText = `${copy.tiktok.caption}\n\n${copy.tiktok.hashtags.join(' ')}`;
                } else if (selectedPlatform === 'reels') {
                  fullText = `${copy.reels.caption}\n\n${copy.reels.hashtags.join(' ')}`;
                } else if (selectedPlatform === 'shorts') {
                  fullText = `${copy.shorts.title}\n\n${copy.shorts.description}\n\n${copy.shorts.tags.join(' ')}`;
                } else if (selectedPlatform === 'linkedin') {
                  fullText = `${copy.linkedin.headline}\n\n${copy.linkedin.postBody}\n\n${copy.linkedin.hashtags.join(' ')}`;
                } else if (selectedPlatform === 'twitter') {
                  fullText = `${copy.twitter.hookTweet}\n\n${copy.twitter.thread.join('\n\n')}`;
                }
                handleCopyClipboard(fullText);
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-xs font-bold text-zinc-200 hover:text-white transition-all flex items-center justify-center gap-2"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400">Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-zinc-400" />
                  <span>Copy Platform Text &amp; Tags</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => onOpenScheduleModal(clip, selectedPlatform)}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 via-rose-500 to-violet-600 hover:from-amber-400 hover:via-rose-400 hover:to-violet-500 text-white text-xs font-black shadow-lg shadow-rose-500/20 transition-all flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Direct Auto-Publish / Schedule</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
