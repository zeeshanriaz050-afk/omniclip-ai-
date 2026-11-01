import React, { useState, useRef, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  Sliders, 
  Type, 
  Palette, 
  MoveVertical, 
  Smile, 
  Edit3, 
  Check, 
  Maximize2,
  Layers,
  Crop,
  Download
} from 'lucide-react';
import { ViralClip, SubtitleConfig, SubtitleWordTiming } from '../types';
import { SUBTITLE_PRESETS } from '../data/connectedAccounts';

interface VerticalVideoStudioProps {
  clip: ViralClip;
  subtitleConfig: SubtitleConfig;
  onUpdateSubtitleConfig: (config: SubtitleConfig) => void;
  onUpdateSubtitles: (subtitles: SubtitleWordTiming[]) => void;
  onOpenScheduleModal: (clip: ViralClip) => void;
}

export const VerticalVideoStudio: React.FC<VerticalVideoStudioProps> = ({
  clip,
  subtitleConfig,
  onUpdateSubtitleConfig,
  onUpdateSubtitles,
  onOpenScheduleModal,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(25);
  const [isMuted, setIsMuted] = useState(false);
  const [activeTab, setActiveTab] = useState<'style' | 'editor' | 'framing'>('style');
  const [editingSubtitles, setEditingSubtitles] = useState<SubtitleWordTiming[]>(clip.subtitles);
  const [currentLayout, setCurrentLayout] = useState<'face-tracking' | 'split-screen' | 'canvas-fit'>(
    clip.layout || 'face-tracking'
  );

  useEffect(() => {
    setEditingSubtitles(clip.subtitles);
    setCurrentTime(0);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  }, [clip.id]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const t = videoRef.current.currentTime;
    setCurrentTime(t);
    const d = videoRef.current.duration || 25;
    setDuration(d);

    // Auto-loop clip
    if (t >= d - 0.2) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setCurrentTime(val);
    if (videoRef.current) {
      videoRef.current.currentTime = val;
    }
  };

  const handleRestart = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  // Find active subtitle
  const activeSubtitle = editingSubtitles.find(
    (sub) => currentTime >= sub.startSeconds && currentTime <= sub.endSeconds
  );

  // Parse words for active highlighting
  const words = activeSubtitle ? activeSubtitle.text.split(' ') : [];
  const subtitleDuration = activeSubtitle ? activeSubtitle.endSeconds - activeSubtitle.startSeconds : 1;
  const elapsedInSubtitle = activeSubtitle ? Math.max(0, currentTime - activeSubtitle.startSeconds) : 0;
  const wordIndex = words.length > 0 ? Math.min(words.length - 1, Math.floor((elapsedInSubtitle / subtitleDuration) * words.length)) : 0;

  const handlePresetSelect = (presetId: any) => {
    const preset = SUBTITLE_PRESETS.find((p) => p.id === presetId);
    if (!preset) return;
    onUpdateSubtitleConfig({
      ...subtitleConfig,
      preset: presetId,
      activeColor: preset.activeColor,
      uppercase: preset.uppercase,
    });
  };

  const handleSubtitleTextChange = (index: number, newText: string) => {
    const updated = [...editingSubtitles];
    updated[index].text = newText;
    setEditingSubtitles(updated);
    onUpdateSubtitles(updated);
  };

  const handleSubtitleTimingChange = (index: number, field: 'startSeconds' | 'endSeconds', value: number) => {
    const updated = [...editingSubtitles];
    updated[index][field] = value;
    setEditingSubtitles(updated);
    onUpdateSubtitles(updated);
  };

  return (
    <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-5 md:p-6 shadow-xl flex flex-col lg:flex-row gap-6">
      {/* LEFT: 9:16 Vertical Smartphone Studio Preview */}
      <div className="flex flex-col items-center justify-center shrink-0">
        <div className="relative w-[280px] sm:w-[320px] h-[520px] sm:h-[580px] bg-black rounded-[42px] p-3 shadow-2xl border-4 border-zinc-700/80 ring-1 ring-zinc-500/20 overflow-hidden flex flex-col justify-between">
          {/* Dynamic Island / Speaker notch */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-5 bg-black rounded-full z-30 flex items-center justify-end px-2 border border-zinc-800">
            <div className="w-2.5 h-2.5 rounded-full bg-zinc-900 border border-zinc-700 mr-1" />
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/80 animate-pulse" />
          </div>

          {/* Social Platform UI Overlay (Watermark & badges) */}
          <div className="absolute top-12 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
            <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 text-[10px] font-bold text-white">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
              <span>9:16 VIRAL CUT</span>
            </div>
            <div className="flex items-center gap-1 bg-amber-500/20 border border-amber-500/40 px-2 py-0.5 rounded-full text-[10px] font-bold text-amber-300">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>Score: {clip.viralityScore}</span>
            </div>
          </div>

          {/* Video Container with Dynamic Framing */}
          <div className="relative w-full h-full rounded-[32px] overflow-hidden bg-zinc-950 flex items-center justify-center">
            {/* Background blur when in canvas-fit mode */}
            {currentLayout === 'canvas-fit' && (
              <video
                src={clip.videoUrl || 'https://assets.mixkit.co/videos/preview/mixkit-young-businessman-talking-to-camera-in-office-42861-large.mp4'}
                className="absolute inset-0 w-full h-full object-cover blur-xl opacity-50 scale-125"
                muted
                playsInline
                loop
              />
            )}

            {/* Split Screen simulated top/bottom video */}
            {currentLayout === 'split-screen' ? (
              <div className="w-full h-full flex flex-col">
                <div className="relative h-1/2 w-full overflow-hidden border-b-2 border-zinc-800">
                  <video
                    ref={videoRef}
                    src={clip.videoUrl || 'https://assets.mixkit.co/videos/preview/mixkit-young-businessman-talking-to-camera-in-office-42861-large.mp4'}
                    className="w-full h-full object-cover scale-110"
                    playsInline
                    muted={isMuted}
                    onTimeUpdate={handleTimeUpdate}
                    onClick={togglePlay}
                  />
                  <div className="absolute bottom-2 left-2 bg-black/70 px-2 py-0.5 rounded text-[9px] font-bold text-zinc-300 uppercase tracking-wider">
                    Speaker 1 (Active)
                  </div>
                </div>
                <div className="relative h-1/2 w-full overflow-hidden bg-zinc-900">
                  <video
                    src="https://assets.mixkit.co/videos/preview/mixkit-thoughtful-man-looking-at-a-laptop-42863-large.mp4"
                    className="w-full h-full object-cover scale-110"
                    playsInline
                    muted
                    loop
                    autoPlay
                  />
                  <div className="absolute bottom-2 left-2 bg-black/70 px-2 py-0.5 rounded text-[9px] font-bold text-zinc-300 uppercase tracking-wider">
                    Host (Reaction)
                  </div>
                </div>
              </div>
            ) : (
              /* Standard or Face-Tracking Video */
              <video
                ref={videoRef}
                src={clip.videoUrl || 'https://assets.mixkit.co/videos/preview/mixkit-young-businessman-talking-to-camera-in-office-42861-large.mp4'}
                className={`w-full h-full ${
                  currentLayout === 'face-tracking' ? 'object-cover scale-125' : 'object-contain'
                } transition-all`}
                playsInline
                muted={isMuted}
                onTimeUpdate={handleTimeUpdate}
                onClick={togglePlay}
              />
            )}

            {/* SUBTITLE OVERLAY (Rendered dynamically at exact % position) */}
            <div
              className="absolute left-3 right-3 z-30 pointer-events-none flex flex-col items-center text-center transition-all duration-75"
              style={{
                top: `${subtitleConfig.positionY}%`,
                transform: 'translateY(-50%)',
              }}
            >
              {activeSubtitle ? (
                <div
                  className={`inline-block px-3 py-1.5 rounded-xl transition-all ${
                    subtitleConfig.preset === 'minimal'
                      ? 'bg-black/70 backdrop-blur-md border border-white/20'
                      : subtitleConfig.preset === 'tiktok'
                      ? 'bg-black/85'
                      : 'bg-black/50 backdrop-blur-sm'
                  }`}
                  style={{
                    boxShadow:
                      subtitleConfig.preset === 'neon'
                        ? `0 0 20px ${subtitleConfig.activeColor}55`
                        : undefined,
                  }}
                >
                  {subtitleConfig.showEmojis && activeSubtitle.emoji && (
                    <div className="text-2xl mb-1 filter drop-shadow-md animate-bounce">
                      {activeSubtitle.emoji}
                    </div>
                  )}

                  <div
                    className={`font-black leading-tight tracking-tight ${
                      subtitleConfig.uppercase ? 'uppercase' : ''
                    }`}
                    style={{
                      fontSize: `${subtitleConfig.fontSize}px`,
                      textShadow:
                        subtitleConfig.preset === 'hormozi'
                          ? '2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 0 4px 8px rgba(0,0,0,0.9)'
                          : subtitleConfig.preset === 'mrbeast'
                          ? '0 0 10px rgba(0,0,0,0.9), 3px 3px 0 #000'
                          : undefined,
                    }}
                  >
                    {words.map((word, idx) => {
                      const isCurrent = idx === wordIndex;
                      return (
                        <span
                          key={idx}
                          className={`inline-block mx-1 transition-transform duration-100 ${
                            isCurrent
                              ? 'scale-115 font-extrabold'
                              : 'opacity-90'
                          }`}
                          style={{
                            color: isCurrent
                              ? subtitleConfig.activeColor
                              : subtitleConfig.textColor,
                            backgroundColor:
                              isCurrent && subtitleConfig.preset === 'hormozi'
                                ? 'rgba(0,0,0,0.4)'
                                : undefined,
                            borderRadius: '4px',
                            padding: isCurrent ? '0 3px' : undefined,
                          }}
                        >
                          {word}
                        </span>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="text-xs text-white/40 italic">
                  [Spoken audio captions sync]
                </div>
              )}
            </div>

            {/* TikTok/Reels Right Rail Icons Simulation */}
            <div className="absolute right-2 bottom-16 z-20 flex flex-col items-center gap-3 pointer-events-none opacity-80">
              <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white text-xs">
                ❤️
              </div>
              <span className="text-[9px] font-bold text-white drop-shadow">42.8K</span>
              <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white text-xs">
                💬
              </div>
              <span className="text-[9px] font-bold text-white drop-shadow">1,240</span>
              <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white text-xs">
                ↗️
              </div>
              <span className="text-[9px] font-bold text-white drop-shadow">8.9K</span>
            </div>
          </div>

          {/* Bottom Bar inside phone frame */}
          <div className="pt-2 z-20 flex items-center justify-between px-1">
            <span className="text-[10px] font-mono text-zinc-400">
              {currentTime.toFixed(1)}s / {duration.toFixed(1)}s
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="text-zinc-400 hover:text-white transition-colors"
              >
                {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Video Scrubber & Playback Controls Below Phone */}
        <div className="w-[280px] sm:w-[320px] mt-3 space-y-2">
          <input
            type="range"
            min={0}
            max={duration || 25}
            step={0.1}
            value={currentTime}
            onChange={handleSeek}
            className="w-full accent-amber-500 cursor-pointer h-1.5 bg-zinc-800 rounded-lg"
          />

          <div className="flex items-center justify-between">
            <button
              onClick={handleRestart}
              className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors"
              title="Restart clip"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={togglePlay}
              className="px-6 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-400 hover:to-rose-400 text-black font-extrabold text-xs flex items-center gap-1.5 shadow-md transition-all"
            >
              {isPlaying ? <Pause className="w-4 h-4 fill-black" /> : <Play className="w-4 h-4 fill-black" />}
              <span>{isPlaying ? 'PAUSE' : 'PLAY CLIP'}</span>
            </button>

            <button
              onClick={() => onOpenScheduleModal(clip)}
              className="px-3 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-amber-400 hover:text-amber-300 text-xs font-bold transition-colors flex items-center gap-1"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Schedule</span>
            </button>
          </div>
        </div>
      </div>

      {/* RIGHT: Studio Controls & Transcript/Subtitle Editor */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          {/* Header of Studio controls */}
          <div className="flex items-center justify-between pb-4 border-b border-zinc-800 mb-4">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-white">
                  {clip.title}
                </h3>
              </div>
              <p className="text-xs text-zinc-400 mt-0.5">
                Quote: <span className="text-amber-300 italic">"{clip.speakerQuote}"</span>
              </p>
            </div>

            {/* Tab switch between Style, Editor, Layout */}
            <div className="flex items-center gap-1 bg-zinc-950 p-1 rounded-xl border border-zinc-800">
              <button
                onClick={() => setActiveTab('style')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === 'style'
                    ? 'bg-zinc-800 text-amber-400 shadow'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <Sliders className="w-3.5 h-3.5 inline mr-1" />
                Styles
              </button>
              <button
                onClick={() => setActiveTab('editor')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === 'editor'
                    ? 'bg-zinc-800 text-amber-400 shadow'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <Edit3 className="w-3.5 h-3.5 inline mr-1" />
                Subtitles ({editingSubtitles.length})
              </button>
              <button
                onClick={() => setActiveTab('framing')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === 'framing'
                    ? 'bg-zinc-800 text-amber-400 shadow'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <Crop className="w-3.5 h-3.5 inline mr-1" />
                9:16 Framing
              </button>
            </div>
          </div>

          {/* TAB 1: SUBTITLE STYLING */}
          {activeTab === 'style' && (
            <div className="space-y-5">
              {/* Preset Cards */}
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400 block mb-2">
                  Viral Caption Style Presets
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {SUBTITLE_PRESETS.map((preset) => (
                    <button
                      key={preset.id}
                      onClick={() => handlePresetSelect(preset.id)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        subtitleConfig.preset === preset.id
                          ? 'bg-amber-500/10 border-amber-500 text-white shadow-lg shadow-amber-500/10'
                          : 'bg-zinc-950/60 border-zinc-800 hover:border-zinc-700 text-zinc-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold">{preset.name}</span>
                        {subtitleConfig.preset === preset.id && (
                          <Check className="w-3.5 h-3.5 text-amber-400" />
                        )}
                      </div>
                      <div
                        className="text-[11px] font-black truncate"
                        style={{ color: preset.activeColor }}
                      >
                        {preset.sample}
                      </div>
                      <p className="text-[10px] text-zinc-500 mt-1 line-clamp-1">
                        {preset.description}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Fine-Tuning Controls */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-zinc-950/70 p-4 rounded-xl border border-zinc-800">
                {/* Active Highlight Color */}
                <div>
                  <label className="text-xs font-semibold text-zinc-300 block mb-2 flex items-center gap-1.5">
                    <Palette className="w-3.5 h-3.5 text-amber-400" />
                    <span>Highlight Word Color</span>
                  </label>
                  <div className="flex items-center gap-2">
                    {['#FACC15', '#4ADE80', '#22D3EE', '#F43F5E', '#A855F7', '#FFFFFF'].map((color) => (
                      <button
                        key={color}
                        onClick={() => onUpdateSubtitleConfig({ ...subtitleConfig, activeColor: color })}
                        className={`w-7 h-7 rounded-full border-2 transition-transform ${
                          subtitleConfig.activeColor === color
                            ? 'scale-115 border-white shadow-md'
                            : 'border-transparent hover:scale-105'
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>

                {/* Font Size Slider */}
                <div>
                  <div className="flex items-center justify-between text-xs font-semibold text-zinc-300 mb-1">
                    <span className="flex items-center gap-1">
                      <Type className="w-3.5 h-3.5 text-amber-400" />
                      <span>Font Size</span>
                    </span>
                    <span className="text-amber-400 font-mono">{subtitleConfig.fontSize}px</span>
                  </div>
                  <input
                    type="range"
                    min={14}
                    max={34}
                    value={subtitleConfig.fontSize}
                    onChange={(e) =>
                      onUpdateSubtitleConfig({
                        ...subtitleConfig,
                        fontSize: parseInt(e.target.value),
                      })
                    }
                    className="w-full accent-amber-500 cursor-pointer h-1.5 bg-zinc-800 rounded-lg"
                  />
                </div>

                {/* Vertical Position Y */}
                <div>
                  <div className="flex items-center justify-between text-xs font-semibold text-zinc-300 mb-1">
                    <span className="flex items-center gap-1">
                      <MoveVertical className="w-3.5 h-3.5 text-amber-400" />
                      <span>Vertical Position (Safe Area)</span>
                    </span>
                    <span className="text-amber-400 font-mono">{subtitleConfig.positionY}%</span>
                  </div>
                  <input
                    type="range"
                    min={20}
                    max={85}
                    value={subtitleConfig.positionY}
                    onChange={(e) =>
                      onUpdateSubtitleConfig({
                        ...subtitleConfig,
                        positionY: parseInt(e.target.value),
                      })
                    }
                    className="w-full accent-amber-500 cursor-pointer h-1.5 bg-zinc-800 rounded-lg"
                  />
                </div>

                {/* Toggle Emojis and Uppercase */}
                <div className="flex items-center justify-between sm:justify-around gap-2 pt-2">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-zinc-300">
                    <input
                      type="checkbox"
                      checked={subtitleConfig.showEmojis}
                      onChange={(e) =>
                        onUpdateSubtitleConfig({
                          ...subtitleConfig,
                          showEmojis: e.target.checked,
                        })
                      }
                      className="rounded accent-amber-500 w-4 h-4 cursor-pointer"
                    />
                    <Smile className="w-3.5 h-3.5 text-amber-400" />
                    <span>Auto Emojis</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-zinc-300">
                    <input
                      type="checkbox"
                      checked={subtitleConfig.uppercase}
                      onChange={(e) =>
                        onUpdateSubtitleConfig({
                          ...subtitleConfig,
                          uppercase: e.target.checked,
                        })
                      }
                      className="rounded accent-amber-500 w-4 h-4 cursor-pointer"
                    />
                    <span className="text-amber-400 font-bold">ALL CAPS</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: SUBTITLE WORD-BY-WORD TIMING EDITOR */}
          {activeTab === 'editor' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-zinc-400">
                <span>Click any phrase to edit wording or adjust timing:</span>
                <span className="text-[11px] text-amber-400">Synced to video clock</span>
              </div>

              <div className="max-h-[300px] overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                {editingSubtitles.map((sub, idx) => {
                  const isCurrent =
                    currentTime >= sub.startSeconds && currentTime <= sub.endSeconds;
                  return (
                    <div
                      key={idx}
                      className={`p-3 rounded-xl border transition-all ${
                        isCurrent
                          ? 'bg-amber-500/10 border-amber-500/80 shadow-md'
                          : 'bg-zinc-950/60 border-zinc-800/80'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-lg">{sub.emoji || '💬'}</span>
                        <input
                          type="text"
                          value={sub.text}
                          onChange={(e) => handleSubtitleTextChange(idx, e.target.value)}
                          className="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1 text-xs text-white font-medium focus:outline-none focus:border-amber-500"
                        />
                      </div>
                      <div className="flex items-center gap-3 text-[11px] text-zinc-400 pl-7">
                        <div className="flex items-center gap-1">
                          <span>Start:</span>
                          <input
                            type="number"
                            step={0.1}
                            value={sub.startSeconds}
                            onChange={(e) =>
                              handleSubtitleTimingChange(idx, 'startSeconds', parseFloat(e.target.value))
                            }
                            className="w-14 bg-zinc-900 border border-zinc-800 rounded px-1.5 py-0.5 text-zinc-200 text-center font-mono"
                          />
                          <span>s</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span>End:</span>
                          <input
                            type="number"
                            step={0.1}
                            value={sub.endSeconds}
                            onChange={(e) =>
                              handleSubtitleTimingChange(idx, 'endSeconds', parseFloat(e.target.value))
                            }
                            className="w-14 bg-zinc-900 border border-zinc-800 rounded px-1.5 py-0.5 text-zinc-200 text-center font-mono"
                          />
                          <span>s</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            if (videoRef.current) {
                              videoRef.current.currentTime = sub.startSeconds;
                              videoRef.current.play().catch(() => {});
                              setIsPlaying(true);
                            }
                          }}
                          className="ml-auto text-[10px] text-amber-400 hover:underline flex items-center gap-1"
                        >
                          <Play className="w-2.5 h-2.5 fill-amber-400" />
                          <span>Jump to time</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: FRAMING & LAYOUT */}
          {activeTab === 'framing' && (
            <div className="space-y-4">
              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400 block mb-1">
                9:16 Vertical Video Re-Framing
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setCurrentLayout('face-tracking')}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    currentLayout === 'face-tracking'
                      ? 'bg-amber-500/10 border-amber-500 text-white'
                      : 'bg-zinc-950/60 border-zinc-800 hover:border-zinc-700 text-zinc-400'
                  }`}
                >
                  <Crop className="w-4 h-4 text-amber-400 mb-1" />
                  <div className="text-xs font-bold text-white">Smart Face Tracking</div>
                  <p className="text-[10px] text-zinc-400 mt-1">
                    AI tracks speaker face and auto-centers in 9:16 vertical view.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setCurrentLayout('split-screen')}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    currentLayout === 'split-screen'
                      ? 'bg-amber-500/10 border-amber-500 text-white'
                      : 'bg-zinc-950/60 border-zinc-800 hover:border-zinc-700 text-zinc-400'
                  }`}
                >
                  <Layers className="w-4 h-4 text-rose-400 mb-1" />
                  <div className="text-xs font-bold text-white">Podcast Split Screen</div>
                  <p className="text-[10px] text-zinc-400 mt-1">
                    Stacks host &amp; guest vertically for dynamic reaction conversations.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setCurrentLayout('canvas-fit')}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    currentLayout === 'canvas-fit'
                      ? 'bg-amber-500/10 border-amber-500 text-white'
                      : 'bg-zinc-950/60 border-zinc-800 hover:border-zinc-700 text-zinc-400'
                  }`}
                >
                  <Maximize2 className="w-4 h-4 text-violet-400 mb-1" />
                  <div className="text-xs font-bold text-white">Smart Canvas Blur</div>
                  <p className="text-[10px] text-zinc-400 mt-1">
                    Retains full 16:9 widescreen video with aesthetic blurred backdrop.
                  </p>
                </button>
              </div>

              <div className="p-3 bg-zinc-950/80 rounded-xl border border-zinc-800 text-xs text-zinc-400 flex items-center justify-between">
                <span>Output Resolution: 1080 x 1920 (TikTok / Reels / Shorts standard)</span>
                <span className="font-mono text-emerald-400">60 FPS HDR</span>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Action Footer */}
        <div className="mt-6 pt-4 border-t border-zinc-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs text-zinc-400">Virality Index:</span>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-black">
              <span>{clip.viralityScore} / 100</span>
            </div>
            <span className="text-[11px] text-zinc-500 hidden sm:inline">
              (Hook: {clip.hookStrength}% | Retention: {clip.retentionFactor}% | Share: {clip.shareabilityIndex}%)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                // Download .srt subtitle file
                const srtContent = editingSubtitles
                  .map((sub, i) => {
                    const start = new Date(sub.startSeconds * 1000).toISOString().substr(11, 12).replace('.', ',');
                    const end = new Date(sub.endSeconds * 1000).toISOString().substr(11, 12).replace('.', ',');
                    return `${i + 1}\n${start} --> ${end}\n${sub.text}\n`;
                  })
                  .join('\n');
                const blob = new Blob([srtContent], { type: 'text/plain' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `${clip.title.replace(/\s+/g, '_')}_subtitles.srt`;
                a.click();
              }}
              className="px-3 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white text-xs font-semibold transition-all flex items-center gap-1.5"
              title="Download SRT subtitle file"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export SRT</span>
            </button>

            <button
              onClick={() => onOpenScheduleModal(clip)}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 via-rose-500 to-violet-600 hover:from-amber-400 hover:via-rose-400 hover:to-violet-500 text-white text-xs font-extrabold shadow-lg shadow-rose-500/20 transition-all flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4 text-amber-200" />
              <span>Auto-Publish or Schedule</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
