import React, { useState } from 'react';
import { 
  Youtube, 
  Upload, 
  Sparkles, 
  SlidersHorizontal, 
  Clock, 
  Check, 
  Flame, 
  FileText, 
  Loader2,
  ChevronDown,
  Layers,
  ArrowRight
} from 'lucide-react';
import { SAMPLE_VIDEOS } from '../data/sampleVideos';
import { VideoProject, SubtitlePresetId } from '../types';

interface VideoInputSectionProps {
  onAnalyze: (options: {
    videoUrl: string;
    title: string;
    transcript?: string;
    durationSeconds: number;
    targetDuration: 'short' | 'standard' | 'deep';
    stylePreset: SubtitlePresetId;
    framing: 'face-tracking' | 'split-screen' | 'canvas-fit';
  }) => Promise<void>;
  onSelectSample: (sample: VideoProject) => void;
  isAnalyzing: boolean;
  analysisStep: string;
}

export const VideoInputSection: React.FC<VideoInputSectionProps> = ({
  onAnalyze,
  onSelectSample,
  isAnalyzing,
  analysisStep,
}) => {
  const [videoUrl, setVideoUrl] = useState('https://www.youtube.com/watch?v=0kH8K2p6qXs');
  const [videoTitle, setVideoTitle] = useState('Alex Hormozi: The $100M Offer Blueprint & Why Most Businesses Fail');
  const [customTranscript, setCustomTranscript] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  
  const [targetDuration, setTargetDuration] = useState<'short' | 'standard' | 'deep'>('standard');
  const [stylePreset, setStylePreset] = useState<SubtitlePresetId>('hormozi');
  const [framing, setFraming] = useState<'face-tracking' | 'split-screen' | 'canvas-fit'>('face-tracking');

  const handleQuickUrlSelect = (sample: VideoProject) => {
    setVideoUrl(sample.sourceUrl);
    setVideoTitle(sample.title);
    setCustomTranscript(sample.transcript || '');
    onSelectSample(sample);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideoTitle(file.name.replace(/\.[^/.]+$/, ''));
      setVideoUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoUrl && !customTranscript) return;
    onAnalyze({
      videoUrl,
      title: videoTitle || 'Long-form Video Masterclass',
      transcript: customTranscript,
      durationSeconds: targetDuration === 'short' ? 300 : targetDuration === 'standard' ? 900 : 1800,
      targetDuration,
      stylePreset,
      framing,
    });
  };

  return (
    <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-5 md:p-6 shadow-xl relative overflow-hidden">
      {/* Decorative ambient gradient */}
      <div className="absolute -top-24 -right-24 w-80 h-80 bg-gradient-to-br from-amber-500/10 via-rose-500/10 to-violet-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header text */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold mb-2">
            <Flame className="w-3.5 h-3.5 text-rose-400" />
            <span>Heavy Automation Engine</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            One-Click Video Repurposing
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-2xl">
            Drop any YouTube URL or podcast. AI automatically detects high-retention viral moments, cuts them into 9:16 vertical format, adds dynamic bouncing captions, and queues them for multi-platform auto-publishing.
          </p>
        </div>

        {/* Quick Sample Selector */}
        <div className="flex flex-col gap-1.5">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
            ⚡ Quick Viral Presets:
          </span>
          <div className="flex items-center gap-1.5 flex-wrap">
            {SAMPLE_VIDEOS.map((s) => (
              <button
                key={s.id}
                onClick={() => handleQuickUrlSelect(s)}
                type="button"
                className="px-2.5 py-1.5 rounded-lg bg-zinc-800/80 hover:bg-zinc-700/80 border border-zinc-700/60 text-zinc-300 hover:text-white text-xs font-medium transition-all flex items-center gap-1.5"
              >
                <span>{s.speakerName?.split(' ')[0]}</span>
                <span className="text-[10px] text-zinc-500">({s.clips.length} clips)</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Input Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col md:flex-row items-stretch gap-2.5">
          {/* URL Input */}
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
              <Youtube className="w-5 h-5 text-red-500" />
            </div>
            <input
              type="text"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder="Paste long YouTube video URL (e.g. https://www.youtube.com/watch?v=...)"
              className="w-full pl-11 pr-4 py-3 bg-zinc-950 border border-zinc-700/80 rounded-xl text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all"
            />
          </div>

          {/* Local Upload Button */}
          <label className="flex items-center justify-center gap-2 px-4 py-3 bg-zinc-800 hover:bg-zinc-700/80 border border-zinc-700 rounded-xl text-xs sm:text-sm font-semibold text-zinc-200 cursor-pointer transition-all shrink-0">
            <Upload className="w-4 h-4 text-zinc-400" />
            <span>Upload File</span>
            <input
              type="file"
              accept="video/*,audio/*"
              className="hidden"
              onChange={handleFileUpload}
            />
          </label>

          {/* Action Button */}
          <button
            type="submit"
            disabled={isAnalyzing}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 via-rose-500 to-violet-600 hover:from-amber-400 hover:via-rose-400 hover:to-violet-500 text-white text-sm font-bold shadow-lg shadow-rose-500/25 transition-all disabled:opacity-70 disabled:cursor-not-allowed shrink-0"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>AI Processing...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-amber-200" />
                <span>Repurpose Video</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>

        {/* Video Title display/edit */}
        <div className="flex items-center gap-2 text-xs text-zinc-400">
          <span className="font-semibold text-zinc-500">Title:</span>
          <input
            type="text"
            value={videoTitle}
            onChange={(e) => setVideoTitle(e.target.value)}
            className="flex-1 bg-transparent border-b border-zinc-800 hover:border-zinc-700 focus:border-amber-500 px-1 py-0.5 text-zinc-300 focus:outline-none transition-colors"
            placeholder="Video title or topic"
          />
        </div>

        {/* Advanced Settings Toggle */}
        <div className="pt-1">
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center gap-1.5 text-xs font-semibold text-zinc-400 hover:text-zinc-200 transition-colors"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-amber-400" />
            <span>Engine Configuration &amp; Transcript Options</span>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showAdvanced ? 'rotate-180' : ''}`} />
          </button>

          {showAdvanced && (
            <div className="mt-3 p-4 bg-zinc-950/70 rounded-xl border border-zinc-800/80 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Target Duration */}
                <div>
                  <label className="text-xs font-medium text-zinc-400 block mb-1.5">
                    Target Clip Length
                  </label>
                  <div className="grid grid-cols-3 gap-1 bg-zinc-900 p-1 rounded-lg border border-zinc-800">
                    <button
                      type="button"
                      onClick={() => setTargetDuration('short')}
                      className={`px-2 py-1 text-xs rounded-md font-medium transition-all ${
                        targetDuration === 'short'
                          ? 'bg-amber-500 text-black font-bold'
                          : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      15-30s
                    </button>
                    <button
                      type="button"
                      onClick={() => setTargetDuration('standard')}
                      className={`px-2 py-1 text-xs rounded-md font-medium transition-all ${
                        targetDuration === 'standard'
                          ? 'bg-amber-500 text-black font-bold'
                          : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      30-60s
                    </button>
                    <button
                      type="button"
                      onClick={() => setTargetDuration('deep')}
                      className={`px-2 py-1 text-xs rounded-md font-medium transition-all ${
                        targetDuration === 'deep'
                          ? 'bg-amber-500 text-black font-bold'
                          : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      60-90s
                    </button>
                  </div>
                </div>

                {/* Subtitle Style Preset */}
                <div>
                  <label className="text-xs font-medium text-zinc-400 block mb-1.5">
                    Default Subtitle Style
                  </label>
                  <select
                    value={stylePreset}
                    onChange={(e) => setStylePreset(e.target.value as SubtitlePresetId)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-zinc-200 focus:outline-none focus:border-amber-500"
                  >
                    <option value="hormozi">Hormozi Pop (Bold Yellow &amp; Green)</option>
                    <option value="mrbeast">MrBeast Impact (High Contrast Glow)</option>
                    <option value="neon">Cyber Neon (Cyan &amp; Magenta)</option>
                    <option value="minimal">Minimal Clean (White Helvetica)</option>
                    <option value="tiktok">TikTok Classic (Centered Box)</option>
                  </select>
                </div>

                {/* Framing Mode */}
                <div>
                  <label className="text-xs font-medium text-zinc-400 block mb-1.5">
                    Auto-Framing 9:16
                  </label>
                  <select
                    value={framing}
                    onChange={(e) => setFraming(e.target.value as any)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-zinc-200 focus:outline-none focus:border-amber-500"
                  >
                    <option value="face-tracking">Smart Face-Tracking (Center Speaker)</option>
                    <option value="split-screen">Podcast Split-Screen (Host + Guest)</option>
                    <option value="canvas-fit">Smart Canvas Blur Fill</option>
                  </select>
                </div>
              </div>

              {/* Optional Custom Transcript / Notes */}
              <div>
                <label className="text-xs font-medium text-zinc-400 block mb-1">
                  Optional Transcript or Video Notes (Leave empty for AI auto-transcription)
                </label>
                <textarea
                  rows={2}
                  value={customTranscript}
                  onChange={(e) => setCustomTranscript(e.target.value)}
                  placeholder="Paste video transcript, timestamps, or key talking points to guide Gemini AI clip detection..."
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2.5 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>
          )}
        </div>
      </form>

      {/* Progress / Analyzing Indicator Overlay */}
      {isAnalyzing && (
        <div className="mt-4 p-4 rounded-xl bg-zinc-950/90 border border-amber-500/30 flex items-center gap-3">
          <div className="w-6 h-6 rounded-full border-2 border-amber-500 border-t-transparent animate-spin shrink-0" />
          <div className="flex-1">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-semibold text-amber-400">{analysisStep}</span>
              <span className="text-zinc-500 font-mono">Gemini 3.8 Flash</span>
            </div>
            <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-amber-500 via-rose-500 to-violet-500 animate-[pulse_1.5s_infinite] w-3/4 rounded-full" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
